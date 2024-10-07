package com.hana.bank.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AccountDTO {
    private String acc_id;
    private int acc_balance;
    private String acc_date;
    private String acc_num;
    private String acc_pw;
    private String acc_type;
    private String user_id;
}
