package com.hana.bank.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CardTransaction {
    private Long card_t_id;
    private String card_num;
    private String card_t_amount;
    private String card_t_target;
    private String card_t_date;
}
