package com.hana.manYoung.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PlannerItem {
    private String planner_id;
    private String planner_item_id;
    private String planner_item_category;
    private int planner_item_amount;
}
