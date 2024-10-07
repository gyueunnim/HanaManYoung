package com.hana.manYoung.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChallengeRecordDTO {
    private String challenge_record_id;
    private String challenge_code;
    private String user_id;
    private String challenge_record_date;
    private String challenge_record_status;
    private String code_id;
    private String code_category;
    private String code_name;
    private String code_description;
}
