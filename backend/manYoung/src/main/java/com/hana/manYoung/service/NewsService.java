package com.hana.manYoung.service;

import com.hana.manYoung.model.News;
import com.hana.manYoung.repository.NewsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NewsService {
    private final NewsRepository newsRepository;

    public List<News> selectNewsList(String news_type) {
        return newsRepository.selectNewsList(news_type);
    }
}
