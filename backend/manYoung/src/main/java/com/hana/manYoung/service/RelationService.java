package com.hana.manYoung.service;

import com.hana.manYoung.dto.RelationDTO;
import com.hana.manYoung.model.Relation;
import com.hana.manYoung.repository.RelationRepository;
import com.hana.manYoung.util.DateInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class RelationService {
    private final RelationRepository relationRepository;
    public void registerRelation(Relation relation) {
        relation.setRelation_date(DateInfo.getToday());
        relationRepository.registerRelation(relation);
    }

    public List<RelationDTO> getRelation(String user_id) {
        return relationRepository.getRelation(user_id);
    }

    public List<RelationDTO> getRelationRequest(String user_id) {
        return relationRepository.getRelationRequest(user_id);
    }

    public void acceptRelation(String relation_user_request, String relation_user_target) {
        relationRepository.acceptRelation(relation_user_request, relation_user_target);
    }

    public RelationDTO getParent(String user_id) {
        return relationRepository.getParent(user_id);
    }
}
