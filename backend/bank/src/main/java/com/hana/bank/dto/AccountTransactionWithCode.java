package com.hana.bank.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@RequiredArgsConstructor
public class AccountTransactionWithCode {
    private String acc_t_id;
    private String acc_num;
    private String acc_t_amount;
    private String acc_t_balance;
    private String acc_t_date;
    private String acc_t_target;
    private String acc_t_type;
    private String code_id;
    private String code_category;
    private String code_name;
    private String code_description;
}
