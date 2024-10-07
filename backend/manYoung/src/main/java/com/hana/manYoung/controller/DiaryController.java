package com.hana.manYoung.controller;

import com.hana.manYoung.dto.DiaryDataDTO;
import com.hana.manYoung.dto.PlannerItemsDTO;
import com.hana.manYoung.dto.PlannerResponseDTO;
import com.hana.manYoung.model.Planner;
import com.hana.manYoung.service.ChallengeService;
import com.hana.manYoung.service.DiaryService;
import com.hana.manYoung.service.PlannerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/diary")
@RequiredArgsConstructor
public class DiaryController {

    private final PlannerService plannerService;
    private final DiaryService diaryService;
    private final ChallengeService challengeService;

    @GetMapping("/getPlanner/{user_id}")
    public ResponseEntity<?> getPlannerItems(@PathVariable String user_id) {
        List<PlannerItemsDTO> plannerItems = plannerService.getPlannerItems(user_id);
        Planner planner = plannerService.getPlanner(user_id);
        PlannerResponseDTO response = new PlannerResponseDTO();
        response.setPlannerItems(plannerItems);
        response.setPlanner(planner);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/registerPlanner/{user_id}")
    public ResponseEntity<?> registerPlanner(@PathVariable String user_id, @RequestBody DiaryDataDTO diaryDataDTO) {
        Map<String, Integer> plannerItems = diaryDataDTO.getPlannerItems();
        Map<String, Integer> categorySums = diaryDataDTO.getCategorySums();

        diaryService.registerDiary(categorySums, user_id);
        plannerService.registerPlanner(plannerItems, user_id);

        challengeService.registerChallengeRecordPlanner(user_id);

        return new ResponseEntity<>("Planner registered successfully", HttpStatus.OK);
    }

}
