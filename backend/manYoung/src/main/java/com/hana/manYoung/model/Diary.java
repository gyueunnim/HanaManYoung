package com.hana.manYoung.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Diary {
    private String diary_id;
    private String user_login_id;
    private String diary_date;
    private int diary_income_amount;
    private int diary_expense_amount;
}
