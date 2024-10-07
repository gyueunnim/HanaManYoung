package com.hana.manYoung.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChallengeInfoDTO {
    private String challenge_id;
    private String challenge_code;
    private int challenge_reword;
    private String code_id;
    private String code_category;
    private String code_name;
    private String code_description;
}
