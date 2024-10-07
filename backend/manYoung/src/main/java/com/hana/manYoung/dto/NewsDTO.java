package com.hana.manYoung.dto;

import com.hana.manYoung.model.News;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class NewsDTO {
    private List<News> financeList;
    private List<News> economyList;
    private List<News> stockList;
}
