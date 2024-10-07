package com.hana.bank.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AccountTransaction {
    private Long id;
    private String acc_t_target;
    private Integer acc_t_amount;
    private String acc_t_date;
    private String acc_t_type;
    private Integer acc_t_balance;
    private String acc_num;
}
