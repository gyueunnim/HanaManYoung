package com.hana.manYoung.repository;

import com.hana.manYoung.model.ChallengeSaving;
import com.hana.manYoung.util.DateInfo;
import lombok.RequiredArgsConstructor;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
@RequiredArgsConstructor
public class SavingRepository {
    private final SqlSessionTemplate sql;

    public void registerSaving(ChallengeSaving challengeSaving) {
        sql.insert("Saving.registerSaving", challengeSaving);
    }

    public ChallengeSaving getSaving(String user_id) {
        Map<String, String> params = new HashMap<>();
        params.put("user_id", user_id);
        params.put("date", DateInfo.getToday());

        List<ChallengeSaving> savingList = sql.selectList("Saving.getSaving", params);

        if (savingList.isEmpty()) {
            // 데이터가 없으면 빈 ChallengeSaving 객체를 리턴
            return new ChallengeSaving();
        }

        return savingList.get(0);
    }

    public List<ChallengeSaving> getAllChallengeSaving() {
        return sql.selectList("Saving.getAllChallengeSaving", DateInfo.getToday());
    }
}
