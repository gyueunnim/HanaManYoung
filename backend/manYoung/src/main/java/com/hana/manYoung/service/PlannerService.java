package com.hana.manYoung.service;

import com.hana.manYoung.dto.PlannerItemsDTO;
import com.hana.manYoung.model.Planner;
import com.hana.manYoung.repository.PlannerRepository;
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
public class PlannerService {
    private final PlannerRepository repository;

    public List<PlannerItemsDTO> getPlannerItems(String userId) {
        return repository.getPlannerItems(userId, DateInfo.getYesterday());
    }

    public Planner getPlanner(String userId) {
        return repository.getPlanner(userId, DateInfo.getYesterday());
    }

    public void registerPlanner(Map<String, Integer> plannerItems, String user_id) {
        String plannerId = repository.registerPlanner(user_id, DateInfo.getToday(), -getAmount(plannerItems));
        repository.registerPlannerItems(plannerItems, plannerId);
    }

    private int getAmount(Map<String, Integer> plannerItems) {
        int amount = 0;
        Set<String> keys = plannerItems.keySet();
        for (String key : keys) {
            Integer value = plannerItems.get(key); // 키를 사용하여 값을 얻기
            amount += value;
        }
        return amount;
    }
}
