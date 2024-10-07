package com.hana.bank.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ChallengeSaving {
    private int challenge_saving_id;
    private String challenge_saving_name;
    private int challenge_saving_monthly_amount;
    private int challenge_saving_target_amount;
    private String challenge_saving_start_date;
    private String challenge_saving_end_date;
    private int challenge_saving_duration;
    private String user_id;
    private String acc_num;
}
