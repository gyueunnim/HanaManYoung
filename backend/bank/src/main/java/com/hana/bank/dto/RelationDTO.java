package com.hana.bank.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RelationDTO {
    private int relation_id;
    private String relation_user_request;
    private String relation_user_target;
    private String relation_user_type;
    private String relation_status;
    private String relation_date;
    private String relation_status_name;
    private String relation_user_type_name;
    private String relation_user_name;
}
