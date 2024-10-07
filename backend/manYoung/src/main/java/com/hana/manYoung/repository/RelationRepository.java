package com.hana.manYoung.repository;

import com.hana.manYoung.dto.RelationDTO;
import com.hana.manYoung.model.Relation;
import lombok.RequiredArgsConstructor;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
@RequiredArgsConstructor
public class RelationRepository {
    private final SqlSessionTemplate sql;

    public void registerRelation(Relation relation) {
        sql.insert("Relation.registerRequest", relation);
        sql.insert("Relation.registerTarget", relation);
    }

    public List<RelationDTO> getRelation(String user_id) {
        return sql.selectList("Relation.getRelationList", user_id);
    }

    public List<RelationDTO> getRelationRequest(String user_id) {
        return sql.selectList("Relation.getRelationRequestList", user_id);
    }

    public void acceptRelation(String relation_user_request, String relation_user_target) {
        Map<String, String> params = new HashMap<>();
        params.put("relation_user_request", relation_user_request);
        params.put("relation_user_target", relation_user_target);
        sql.update("Relation.acceptRelation", params);
    }

    public RelationDTO getParent(String user_id) {
        return (RelationDTO) sql.selectList("Relation.getRelationParent", user_id).get(0);
    }
}
