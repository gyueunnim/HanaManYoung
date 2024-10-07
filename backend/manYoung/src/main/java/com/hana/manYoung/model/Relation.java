package com.hana.manYoung.model;

import lombok.Data;

@Data
public class Relation {
    private int relation_id;
    private String relation_user_request;
    private String relation_user_target;
    private String relation_user_type;
    private String relation_status;
    private String relation_date;
}
