package com.hana.manYoung.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@Setter
@Getter
public class DiaryDataDTO {
    private Map<String, Integer> plannerItems; // 소비계획
    private Map<String, Integer> categorySums; // 가계부
}
