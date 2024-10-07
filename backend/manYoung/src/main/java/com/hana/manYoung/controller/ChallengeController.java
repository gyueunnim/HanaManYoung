package com.hana.manYoung.controller;

import com.hana.manYoung.dto.ChallengeRecordDTO;
import com.hana.manYoung.dto.ChallengeResponseDTO;
import com.hana.manYoung.dto.PocketMoneyDTO;
import com.hana.manYoung.model.ChallengeSaving;
import com.hana.manYoung.model.PocketMoney;
import com.hana.manYoung.model.Quiz;
import com.hana.manYoung.service.ChallengeService;
import com.hana.manYoung.service.PocketMoneyService;
import com.hana.manYoung.service.QuizService;
import com.hana.manYoung.service.SavingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/challenge")
@RestController
@RequiredArgsConstructor
public class ChallengeController {
    private final ChallengeService challengeService;
    private final QuizService quizService;
    private final SavingService savingService;
    private final PocketMoneyService pocketMoneyService;

    @GetMapping("/get/today/{user_id}")
    public List<ChallengeRecordDTO> getChallengeToday(@PathVariable String user_id) {
        return challengeService.getChallengeToday(user_id);
    }

    @GetMapping("/get/total/{user_id}")
    public ResponseEntity<?> getChallengeTotal(@PathVariable String user_id) {
        ChallengeResponseDTO challengeResponseDTO = new ChallengeResponseDTO();
        challengeResponseDTO.setTodayChallenge(challengeService.getChallengeToday(user_id));
        challengeResponseDTO.setCalendarData(challengeService.getChallengeAll(user_id));
        challengeResponseDTO.setChallengeInfo(challengeService.getChallengeInfo());
        challengeResponseDTO.setChallengeSaving(savingService.getSaving(user_id));
        challengeResponseDTO.setRelation(challengeService.getRelation(user_id));
        challengeResponseDTO.setPocketMoneyList(pocketMoneyService.getPocketStatus(user_id));
        return ResponseEntity.ok(challengeResponseDTO);
    }

    @PostMapping("/register/tarot/{user_id}")
    public void registerChallengeRecordTarot(@PathVariable String user_id) {
        challengeService.registerChallengeRecordTarot(user_id);
    }

    @PostMapping("/register/quiz/{user_id}")
    public void registerChallengeRecordQuiz(@PathVariable String user_id) {
        challengeService.registerChallengeRecordQuiz(user_id);
    }

    @GetMapping("/get/quiz")
    public Quiz getRandomQuiz() {
        return quizService.getRandomQuiz();
    }

    @GetMapping("/get/quiz/all")
    public List<Quiz> getAllQuiz() {
        return quizService.getAllQuiz();
    }

    @PostMapping("/register/saving")
    public void registerSaving(@RequestBody ChallengeSaving challengeSaving) {
        System.out.println(challengeSaving.toString());
        savingService.registerSaving(challengeSaving);
    }

    @PostMapping("/register/pocket")
    public void registerPocket(@RequestBody PocketMoney pocketMoney) {
        pocketMoneyService.registerPocket(pocketMoney);
    }

    @GetMapping("/get/pocketChild/{user_id}")
    public PocketMoneyDTO getPocketChild(@PathVariable String user_id) {
        return pocketMoneyService.getPocketChild(user_id);
    }

    @GetMapping("/get/pocketParent/{user_id}")
    public PocketMoneyDTO getPocketParent(@PathVariable String user_id) {
        return pocketMoneyService.getPocketParent(user_id);
    }

    @GetMapping("/get/pocketList/{user_id}")
    public List<PocketMoneyDTO> getPocketList(@PathVariable String user_id) {
        return pocketMoneyService.getPocketList(user_id);
    }

    @GetMapping("/get/pocketSuccess/{user_id}")
    public List<PocketMoneyDTO> getPocketSuccess(@PathVariable String user_id) {
        return pocketMoneyService.getPocketSuccess(user_id);
    }

    @PostMapping("/accept/pocketMoney/{user_id}")
    public void acceptPocketMoney(@PathVariable String user_id, @RequestBody String pocketTitle) {
        pocketMoneyService.acceptPocketMoney(user_id, pocketTitle);
    }

    @GetMapping("/send/pocketMoney/{pocket_money_id}")
    public void sendPocketMoney(@PathVariable int pocket_money_id) {
        pocketMoneyService.sendPocketMoney(pocket_money_id);
    }

    @GetMapping("/savePoint/pocketMoney/{pocket_money_id}")
    public void savePointPocketMoney(@PathVariable int pocket_money_id) {
        pocketMoneyService.savePointPocketMoney(pocket_money_id);
    }

    @GetMapping("/get/all")
    public List<ChallengeRecordDTO> getAllChallenges() {
        return challengeService.getAllChallenges();
    }

    @GetMapping("/get/id/{user_id}")
    public List<ChallengeRecordDTO> getChallengeById(@PathVariable String user_id) {
        return challengeService.getChallengeById(user_id);
    }
    @GetMapping("/get/name/{challenge_name}")
    public List<ChallengeRecordDTO> getChallengeByName(@PathVariable String challenge_name) {
        return challengeService.getChallengeByName(challenge_name);
    }

    @GetMapping("/get/totalChallenge/{user_id}")
    public int getTotalChallenge(@PathVariable String user_id) {
        return challengeService.getTotalChallenge(user_id);
    }
}
