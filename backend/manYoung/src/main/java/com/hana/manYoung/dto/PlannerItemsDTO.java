package com.hana.manYoung.dto;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PlannerItemsDTO {
    private int planner_item_id;
    private int planner_id;
    private String planner_item_category;
    private int planner_item_amount;
    private String code_id;
    private String code_category;
    private String code_name;
    private String code_description;
}
