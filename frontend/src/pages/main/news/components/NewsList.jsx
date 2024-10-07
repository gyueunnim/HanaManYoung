import NewsCard from "./NewsCard";

export default function NewsList({ newsList }) {
  return (
    <div className="w-full mt-4 my-3 font-basic flex flex-wrap gap-8 justify-center items-center">
      {newsList.map((news, index) => {
        return <NewsCard news={news} key={index} />;
      })}
    </div>
  );
}
