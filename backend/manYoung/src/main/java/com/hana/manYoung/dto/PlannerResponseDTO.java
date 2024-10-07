package com.hana.manYoung.dto;

import com.hana.manYoung.model.Planner;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class PlannerResponseDTO {
    private Planner planner;
    private List<PlannerItemsDTO> plannerItems;
}
