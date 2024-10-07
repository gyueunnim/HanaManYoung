package com.hana.bank.model;

import com.hana.bank.util.CreateNum;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Getter
@Setter
public class Card {
    private Long card_id;
    private String card_num;
    private String card_pw;
    private String card_date;
    private String acc_num;

    public Card(String acc_num) {
        this.card_num = CreateNum.getCardNumber();
        this.card_pw = "";
        this.card_date = CreateNum.createDate();
        this.acc_num = acc_num;
    }
}
