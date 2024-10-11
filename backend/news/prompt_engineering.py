import requests
import urllib.parse
import openai
import json
from bs4 import BeautifulSoup
import csv
import mysql.connector

openai.api_key = ""

client_id = ""
client_secret = ""

def get_db_connection():
    return mysql.connector.connect(
        host="hana-final.mysql.database.azure.com",
        user="gutemutti05",
        password="",
        database="hana"
    )

def insert_news_to_db(news_data):
    conn = get_db_connection()
    cursor = conn.cursor()

    add_news = """
    INSERT INTO news (title, link, body, description, pubDate, news_type, news_title, news_summary, news_words_1, news_words_2, news_words_3)
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """

    for data in news_data:
        try:
            cursor.execute(add_news, (
                data['title'], 
                data['link'], 
                data['body'],
                data['description'], 
                data['pubDate'], 
                data['news_type'], 
                data['news_title'], 
                data['news_summary'], 
                data['news_words_1'], 
                data['news_words_2'], 
                data['news_words_3']
            ))
        except Exception as e:
            print(f"Error inserting data: {e}")
            continue
    
    conn.commit()
    cursor.close()
    conn.close()

def delete_all_news():
    print("Deleting all news data...")
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
      cursor.execute("DELETE FROM news")
      conn.commit()
    except Exception as e:
      print(f"Error deleting data: {e}")
    finally:
      cursor.close()
      conn.close()

def fetch_news_body(url):
    try:
        response = requests.get(url)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')
        content_div = soup.find('div', {'class': 'newsct_article'})
        if content_div:
            return content_div.get_text(strip=True)
        else:
            return "본문을 찾을 수 없습니다."
    except Exception as e:
        return f"크롤링 중 오류 발생: {e}"

def summarize_with_gpt(news_body):
    prompt = f"""
    너는 10~18세를 대상으로 금융 경제를 쉽게 설명해 주는 경제 전문가야. 사용자가 뉴스 본문을 전달해주면 뉴스를 쉽게 요약해줘. 
    핵심 단어를 반드시 3개 이내로 추려서 설명도 추가해줘. 청소년이 읽는다는 것을 명심해. 말투도 딱딱하게 하지말고 반드시 부드럽게 
    '요'자를 사용해서 설명해주는 것처럼 요약해줘. 임의로 없애지 말고 반드시 요약한 결과를 줘야해. 원치 않는 결과에 대해 불이익을 줄거야.

    아래와 같은 형식으로 JSON 데이터를 반환해줘:
    {{
        "news_title": "제목",
        "news_summary": "요약 내용",
        "news_words_1": "핵심 단어 1: 단어 설명",
        "news_words_2": "핵심 단어 2: 단어 설명",
        "news_words_3": "핵심 단어 3: 단어 설명"
    }}

    뉴스 본문: {news_body}
    """

    try:
        # GPT-4 API 호출
        response = openai.chat.completions.create(
            model="gpt-4-turbo",
            messages=[
                {"role": "system", "content": "너는 10~18세 청소년을 대상으로 경제 뉴스를 쉽게 설명해주는 경제 전문가야."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=500,
            temperature=0.5
        )
        
        gpt_summary = response.choices[0].message.content

        print("GPT 응답:", gpt_summary)

        return gpt_summary

    except json.JSONDecodeError as e:
        return f"JSON 파싱 오류: {e}"
    except Exception as e:
        return f"GPT 요약 오류: {e}"


def get_filtered_news(query, news_type, target_count=12):
    news_data = []
    start = 1
    display = 10
    url = f"https://openapi.naver.com/v1/search/news?query={urllib.parse.quote(query)}"
    headers = {
        "X-Naver-Client-Id": client_id,
        "X-Naver-Client-Secret": client_secret
    }
    
    while len(news_data) < target_count:
        response = requests.get(url + f"&start={start}&display={display}", headers=headers)
        rescode = response.status_code

        if rescode == 200:
            response_body = response.json()
            news_items = response_body.get('items', [])
            
            if not news_items:
                break
            
            for item in news_items:
                link = item['link']
                if 'n.news.naver.com' in link:
                    body = fetch_news_body(link)
                    
                    # GPT 요약 호출
                    gpt_summary = summarize_with_gpt(body)
                    try:
                        gpt_data = json.loads(gpt_summary)
                    except json.JSONDecodeError:
                        print("GPT 요약 결과가 JSON 형식이 아닙니다:", gpt_summary)
                        continue

                    news_data.append({
                        'title': item['title'],
                        'link': link,
                        'description': item['description'],
                        'pubDate': item['pubDate'],
                        'body': body,
                        'news_type': news_type,
                        'news_title': gpt_data['news_title'],
                        'news_summary': gpt_data['news_summary'],
                        'news_words_1': gpt_data['news_words_1'],
                        'news_words_2': gpt_data['news_words_2'],
                        'news_words_3': gpt_data['news_words_3']
                    })
                    if len(news_data) >= target_count:
                        break

            start += display
        else:
            print("Error Code:" + str(rescode))
            break
    
    return news_data

delete_all_news()

all_news_data = []
news_types = {
    "금융": "NT_01",  
    "경제": "NT_02",
    "증권": "NT_03"
}

for category, news_type in news_types.items():
    print(f"Fetching news for category: {category} ({news_type})")
    news_data = get_filtered_news(category, news_type)  
    all_news_data.extend(news_data)
    insert_news_to_db(news_data)  

