package com.hana.bank.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class SendMoneyDTO {
    private int amount;
    private String sendId;
    private String sendName;
    private String targetId;
    private String targetName;
    private String date;
}
