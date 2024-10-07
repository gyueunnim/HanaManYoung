package com.hana.bank.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RequestPocketMoneyDTO {
    private String send_user;
    private String receive_user;
    private int amount;
    private String date;
    private String send_user_name;
    private String receive_user_name;
}
