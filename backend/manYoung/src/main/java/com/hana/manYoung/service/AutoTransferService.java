package com.hana.manYoung.service;

import com.hana.manYoung.model.ChallengeSaving;
import com.hana.manYoung.repository.SavingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Component
@RequiredArgsConstructor
public class AutoTransferService {
    private final SavingRepository savingRepository;

    //    @Scheduled(cron = "*/60 * * * * *")
    @Scheduled(cron = "0 0 1 1 * ?")
    public void processAutoTransfers() {
        RestTemplate restTemplate = new RestTemplate();
        List<ChallengeSaving> challengeSavingList = savingRepository.getAllChallengeSaving();
        System.out.println("챌린지 적금 리스트 크기: "+challengeSavingList.size());
//        String url = "http://localhost:8081/bank/account/autoTransfer";
        String url = "http://34.64.150.163:8080/bank/account/autoTransfer";
// 요청 본문 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(org.springframework.http.MediaType.APPLICATION_JSON);
        HttpEntity<List<ChallengeSaving>> requestEntity = new HttpEntity<>(challengeSavingList, headers);

        // POST 요청 보내기
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, requestEntity, String.class);

        // 응답 상태 확인
        if (response.getStatusCode() == HttpStatus.OK) {
            System.out.println("요청 성공: " + response.getBody());
        } else {
            System.out.println("요청 실패: " + response.getStatusCode());
        }
    }
}
