package com.hana.manYoung.controller;

import com.hana.manYoung.dto.NewsDTO;
import com.hana.manYoung.service.NewsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RequestMapping("/news")
@RestController
@RequiredArgsConstructor
public class NewsController {
    private final NewsService newsService;
    @GetMapping("/get")
    public NewsDTO getNews() {
        NewsDTO newsDTO = new NewsDTO();
        newsDTO.setFinanceList(newsService.selectNewsList("NT_01"));
        newsDTO.setEconomyList(newsService.selectNewsList("NT_02"));
        newsDTO.setStockList(newsService.selectNewsList("NT_03"));
        return newsDTO;
    }
}
