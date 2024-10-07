package com.hana.manYoung.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class User {
    private Long user_id;
    private String user_login_id;
    private String user_pw;
    private String user_name;
    private String user_rrn;
    private String user_email;
    private String user_phone;
    private String user_school;
    private String user_date;
    private String user_st;
    private String user_type;
    private String user_address;
}
