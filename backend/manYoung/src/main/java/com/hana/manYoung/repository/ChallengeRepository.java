package com.hana.manYoung.repository;

import com.hana.manYoung.dto.ChallengeInfoDTO;
import com.hana.manYoung.dto.ChallengeRecordDTO;
import com.hana.manYoung.dto.RelationDTO;
import com.hana.manYoung.model.ChallengeRecord;
import com.hana.manYoung.model.PocketMoney;
import com.hana.manYoung.util.DateInfo;
import lombok.RequiredArgsConstructor;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
@RequiredArgsConstructor
public class ChallengeRepository {
    private final SqlSessionTemplate sql;
    public List<ChallengeRecordDTO> getChallengeToday(String userId, String date) {
        Map<String, Object> params = new HashMap<>();
        params.put("user_id", userId);
        params.put("date", date);
        List<ChallengeRecordDTO> challengeRecordDTOList = null;
        challengeRecordDTOList = sql.selectList("Challenge.getChallengeToday", params);
        return challengeRecordDTOList;
    }

    public List<ChallengeInfoDTO> getChallengeInfo() {
        return sql.selectList("Challenge.getChallengeInfo");
    }

    public List<ChallengeRecord> getChallengeAll(String userId) {
        return sql.selectList("Challenge.getChallengeAll", userId);
    }

    public void registerChallengeRecordPlanner(String user_id) {
        Map<String, String> params = new HashMap<>();
        params.put("user_id", user_id);
        params.put("date", DateInfo.getToday());
        sql.insert("Challenge.registerChallengeRecordPlanner", params);
    }

    public void registerChallengeRecordTarot(String user_id) {
        Map<String, String> params = new HashMap<>();
        params.put("user_id", user_id);
        params.put("date", DateInfo.getToday());
        sql.insert("Challenge.registerChallengeRecordTarot", params);
    }

    public void registerChallengeRecordQuiz(String user_id) {
        Map<String, String> params = new HashMap<>();
        params.put("user_id", user_id);
        params.put("date", DateInfo.getToday());
        sql.insert("Challenge.registerChallengeRecordQuiz", params);
    }

    public RelationDTO getRelation(String user_id) {
        List<RelationDTO> relations = sql.selectList("Relation.getRelationList", user_id);

        if (relations == null || relations.isEmpty()) {
            return null;
        }

        return relations.get(0);
    }

    public void registerPocket(PocketMoney pocketMoney) {
        sql.insert("Challenge.registerPocket", pocketMoney);
    }

    public List<ChallengeRecordDTO> getAllChallenges() {
        return sql.selectList("Challenge.getAllChallenges");
    }

    public List<ChallengeRecordDTO> getChallengeById(String userId) {
        return sql.selectList("Challenge.getChallengeById", userId);
    }

    public List<ChallengeRecordDTO> getChallengeByName(String challengeName) {
        return sql.selectList("Challenge.getChallengeByName", challengeName);
    }

    public int getTotalChallenge(String userId) {
        if(sql.selectList("Challenge.getTotalChallenge", userId).isEmpty())
            return 0;
        return (int) sql.selectList("Challenge.getTotalChallenge", userId).get(0);
    }
}
