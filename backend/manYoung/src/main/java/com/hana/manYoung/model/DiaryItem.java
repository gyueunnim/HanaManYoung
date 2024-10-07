package com.hana.manYoung.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DiaryItem {
    private String diary_item_id;
    private String diary_item_category;
    private int diary_item_amount;
    private String diary_id;
}
