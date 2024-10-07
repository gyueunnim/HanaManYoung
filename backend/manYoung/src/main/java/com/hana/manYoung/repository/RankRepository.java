package com.hana.manYoung.repository;

import com.hana.manYoung.dto.ConsumeDTO;
import com.hana.manYoung.dto.DiaryItemMaxDTO;
import com.hana.manYoung.dto.RankDTO;
import com.hana.manYoung.model.Diary;
import com.hana.manYoung.model.DiaryItem;
import com.hana.manYoung.model.Rank;
import com.hana.manYoung.util.DateInfo;
import lombok.RequiredArgsConstructor;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
@RequiredArgsConstructor
public class RankRepository {
    private final SqlSessionTemplate sql;

    public List<Rank> selectRankSchools() {
        return sql.selectList("Rank.selectRankSchools");
    }

    public List<Rank> selectRankRegions() {
        return sql.selectList("Rank.selectRankRegions");
    }

    public List<Rank> selectRankAges() {
        return sql.selectList("Rank.selectRankAges");
    }

    public List<Rank> selectSchool(String user_id) {
        return sql.selectList("Rank.selectRankMySchool", user_id);
    }

    public List<Rank> selectRegion(String user_id) {
        return sql.selectList("Rank.selectRankMyRegion", user_id);
    }

    public List<Rank> selectAge(String user_id) {
        return sql.selectList("Rank.selectRankMyAge", user_id);
    }
}
