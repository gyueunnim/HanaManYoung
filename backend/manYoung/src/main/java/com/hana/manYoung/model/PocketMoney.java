package com.hana.manYoung.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class PocketMoney {
    private int pocket_money_id;
    private String pocket_money_title;
    private int pocket_money_amount;
    private String pocket_money_status;
    private String pocket_money_date;
    private String pocket_money_child;
    private String pocket_money_parent;
}
