package com.hana.bank.model;

import com.hana.bank.util.CreateNum;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Getter
@Setter
public class Account {
    private Long id;
    private String acc_num;
    private String  acc_user_id;
    private String acc_pw;
    private Integer acc_balance;
    private String acc_date;
    private String acc_type;

    public Account(String acc_user_id, String acc_type) {
        this.acc_num = CreateNum.getAccountNumber();
        this.acc_user_id = acc_user_id;
        this.acc_pw = "";
        this.acc_balance = 0;
        this.acc_date = CreateNum.createDate();
        this.acc_type = acc_type;
    }

}
