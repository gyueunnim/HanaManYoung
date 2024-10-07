package com.hana.manYoung.repository;

import com.hana.manYoung.dto.PlannerItemsDTO;
import com.hana.manYoung.model.Planner;
import com.hana.manYoung.model.PlannerItem;
import lombok.RequiredArgsConstructor;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Repository
@RequiredArgsConstructor
public class PlannerRepository {
    private final SqlSessionTemplate sql;
    public List<PlannerItemsDTO> getPlannerItems(String userId, String date) {
        Map<String, Object> params = new HashMap<>();
        params.put("userId", userId);
        params.put("date", date);
        return sql.selectList("PlannerItemsDTO.getPlannerItems", params);
    }

    public Planner getPlanner(String userId, String date) {
        Map<String, Object> params = new HashMap<>();
        params.put("userId", userId);
        params.put("date", date);
        return (Planner) sql.selectList("Planner.getPlanner", params).get(0);
    }

    public String registerPlanner(String user_id, String date, int amount) {
        Planner planner = new Planner();
        planner.setUser_login_id(user_id);
        planner.setPlanner_amount(amount);
        planner.setPlanner_date(date);

        sql.insert("Planner.registerPlanner", planner);
        return planner.getPlanner_id();
    }
    public void registerPlannerItems(Map<String, Integer> plannerItems, String plannerId) {
        List<PlannerItem> plannerItemList = new ArrayList<>();
        // 모든 키를 Set 형태로 가져오기
        Set<String> keys = plannerItems.keySet();
        // 각 키와 해당 값을 출력
        for (String key : keys) {
            PlannerItem plannerItem = new PlannerItem();
            plannerItem.setPlanner_id(plannerId);
            plannerItem.setPlanner_item_amount(plannerItems.get(key));
            plannerItem.setPlanner_item_category(key);
            plannerItemList.add(plannerItem);
        }

        sql.insert("PlannerItemsDTO.registerPlannerItems", plannerItemList);
    }
}
