package com.hana.manYoung.dto;

import com.hana.manYoung.model.Relation;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class RelationResponseDTO {
    private List<RelationDTO> relationList;
    private List<RelationDTO> relationRequestList;
}
