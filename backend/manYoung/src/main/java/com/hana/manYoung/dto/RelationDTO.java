package com.hana.manYoung.dto;

import com.hana.manYoung.model.Relation;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RelationDTO extends Relation {
    private String relation_status_name;
    private String relation_user_type_name;
    private String relation_user_name;
}
