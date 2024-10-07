package com.hana.manYoung.dto;

import com.hana.manYoung.model.User;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDTO extends User {
    private String code_id;
    private String code_category;
    private String code_name;
    private String code_description;
}
