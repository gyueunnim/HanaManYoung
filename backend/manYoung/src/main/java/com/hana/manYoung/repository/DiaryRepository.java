package com.hana.manYoung.repository;

import com.hana.manYoung.dto.ConsumeDTO;
import com.hana.manYoung.dto.DiaryItemMaxDTO;
import com.hana.manYoung.model.Diary;
import com.hana.manYoung.model.DiaryItem;
import com.hana.manYoung.util.DateInfo;
import lombok.RequiredArgsConstructor;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
@RequiredArgsConstructor
public class DiaryRepository {
    private final SqlSessionTemplate sql;
    public String registerDiary(String user_id, String date, int income, int expense) {
        Diary diary = new Diary();
        diary.setUser_login_id(user_id);
        diary.setDiary_date(date);
        diary.setDiary_income_amount(income);
        diary.setDiary_expense_amount(expense);
        sql.insert("Diary.registerDiary", diary);
        return diary.getDiary_id();
    }

    public void registerDiaryItems(Map<String, Integer> diaryItems, String diaryId) {
        List<DiaryItem> diaryItemList = new ArrayList<>();

        Set<String> keys = diaryItems.keySet();

        for(String key : keys) {
            DiaryItem diaryItem = new DiaryItem();
            diaryItem.setDiary_id(diaryId);
            diaryItem.setDiary_item_amount(diaryItems.get(key));
            diaryItem.setDiary_item_category(key);
            diaryItemList.add(diaryItem);
        }

        sql.insert("DiaryItems.registerDiaryItems", diaryItemList);
    }

    public List<ConsumeDTO> getConsumeData(String user_id) {
        return sql.selectList("DiaryItems.getConsumeData", user_id);
    }

    public DiaryItemMaxDTO getDiaryItemMax(String user_id) {
        Map<String, String> params = new HashMap<>();
        params.put("user_id", user_id);
        params.put("date", DateInfo.getMonth()+"%");

        List<DiaryItemMaxDTO> diaryItemMaxDTOList = sql.selectList("Diary.getMaxDiaryItemCategory", params);

        if (diaryItemMaxDTOList.isEmpty()) {
            return new DiaryItemMaxDTO();
        }

        return diaryItemMaxDTOList.get(0);
    }
}
