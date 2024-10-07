package com.hana.manYoung.service;

import com.hana.manYoung.dto.ConsumeDTO;
import com.hana.manYoung.dto.DiaryItemMaxDTO;
import com.hana.manYoung.repository.DiaryRepository;
import com.hana.manYoung.util.DateInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class DiaryService {
    private final DiaryRepository repository;

    public void registerDiary(Map<String, Integer> diaryItems, String user_id) {
        String diaryId = repository.registerDiary(user_id, DateInfo.getToday(), getIncome(diaryItems), getExpense(diaryItems));
        repository.registerDiaryItems(diaryItems, diaryId);
    }

    private int getIncome(Map<String, Integer> diaryItems) {
        int income = 0;
        Set<String> keys = diaryItems.keySet();
        for (String key : keys) {
            Integer value = diaryItems.get(key); // 키를 사용하여 값을 얻기
            if(value > 0)
                income += value;
        }
        return income;
    }

    private int getExpense(Map<String, Integer> diaryItems) {
        int expense = 0;
        Set<String> keys = diaryItems.keySet();
        for(String key : keys) {
            Integer value = diaryItems.get(key);
            if(value < 0)
                expense += value;
        }
        return expense;
    }

    public List<ConsumeDTO> getConsumeData(String user_id) {
        return repository.getConsumeData(user_id);
    }

    public DiaryItemMaxDTO getDiaryItemMax(String user_id) {
        return repository.getDiaryItemMax(user_id);
    }
}

