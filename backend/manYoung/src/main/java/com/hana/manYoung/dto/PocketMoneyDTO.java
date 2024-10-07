package com.hana.manYoung.dto;

import com.hana.manYoung.model.PocketMoney;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PocketMoneyDTO extends PocketMoney {
    private String code_id;
    private String code_category;
    private String code_name;
    private String code_description;
}
