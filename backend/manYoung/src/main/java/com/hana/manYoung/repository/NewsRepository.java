package com.hana.manYoung.repository;

import com.hana.manYoung.model.News;
import lombok.RequiredArgsConstructor;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class NewsRepository {
    private final SqlSessionTemplate sql;

    public List<News> selectNewsList(String news_type) {
        return sql.selectList("News.selectNewsList", news_type);
    }
}
