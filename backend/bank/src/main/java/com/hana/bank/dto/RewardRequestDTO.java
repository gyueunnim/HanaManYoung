package com.hana.bank.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RewardRequestDTO {
    private String user_id;
    private String acc_t_target;
    private int acc_t_amount;
    private String acc_t_date;
}
