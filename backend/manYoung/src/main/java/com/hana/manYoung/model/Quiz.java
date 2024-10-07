package com.hana.manYoung.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Quiz {
    private int quiz_id;
    private String quiz_title;
    private String quiz_answer_1;
    private String quiz_answer_2;
    private String quiz_answer_3;
    private String quiz_answer_4;
    private int quiz_answer;
}
