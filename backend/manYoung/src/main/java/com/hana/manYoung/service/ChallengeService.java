package com.hana.manYoung.service;

import com.hana.manYoung.dto.ChallengeInfoDTO;
import com.hana.manYoung.dto.ChallengeRecordDTO;
import com.hana.manYoung.dto.RelationDTO;
import com.hana.manYoung.model.ChallengeRecord;
import com.hana.manYoung.model.PocketMoney;
import com.hana.manYoung.repository.ChallengeRepository;
import com.hana.manYoung.util.DateInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChallengeService {
    private final ChallengeRepository challengeRepository;
    public List<ChallengeRecordDTO> getChallengeToday(String userId) {
        return challengeRepository.getChallengeToday(userId, DateInfo.getToday());
    }

    public List<ChallengeInfoDTO> getChallengeInfo() {
        return challengeRepository.getChallengeInfo();
    }

    public List<ChallengeRecord> getChallengeAll(String userId) {
        return challengeRepository.getChallengeAll(userId);
    }

    public void registerChallengeRecordPlanner(String user_id) {
        challengeRepository.registerChallengeRecordPlanner(user_id);
    }

    public void registerChallengeRecordTarot(String user_id) {
        challengeRepository.registerChallengeRecordTarot(user_id);
    }

    public void registerChallengeRecordQuiz(String user_id) {
        challengeRepository.registerChallengeRecordQuiz(user_id);
    }

    public RelationDTO getRelation(String user_id) {
        return challengeRepository.getRelation(user_id);
    }

    public void registerPocket(PocketMoney pocketMoney) {
        challengeRepository.registerPocket(pocketMoney);
    }

    public List<ChallengeRecordDTO> getAllChallenges() {
        return challengeRepository.getAllChallenges();
    }

    public List<ChallengeRecordDTO> getChallengeById(String userId) {
        return challengeRepository.getChallengeById(userId);
    }

    public List<ChallengeRecordDTO> getChallengeByName(String challengeName) {
        return challengeRepository.getChallengeByName(challengeName);
    }

    public int getTotalChallenge(String userId) {
        return challengeRepository.getTotalChallenge(userId);
    }
}
