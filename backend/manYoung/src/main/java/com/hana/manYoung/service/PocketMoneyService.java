package com.hana.manYoung.service;

import com.hana.manYoung.dto.PocketMoneyDTO;
import com.hana.manYoung.model.PocketMoney;
import com.hana.manYoung.repository.PocketMoneyRepository;
import com.hana.manYoung.util.DateInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PocketMoneyService {
    private final PocketMoneyRepository pocketMoneyRepository;

    public void registerPocket(PocketMoney pocketMoney) {
        pocketMoney.setPocket_money_date(DateInfo.getToday());
        pocketMoneyRepository.registerPocket(pocketMoney);
    }

    public PocketMoneyDTO getPocketChild(String userId) {
        return pocketMoneyRepository.getPocketChild(userId);
    }

    public PocketMoneyDTO getPocketParent(String userId) {
        return pocketMoneyRepository.getPocketParent(userId);
    }

    public List<PocketMoneyDTO> getPocketList(String user_id) {
        return pocketMoneyRepository.getPocketList(user_id);
    }

    public void acceptPocketMoney(String userId, String pocketTitle) {
        pocketMoneyRepository.acceptPocketMoney(userId, pocketTitle);
    }

    public void sendPocketMoney(int pocketMoneyId) {
        pocketMoneyRepository.sendPocketMoney(pocketMoneyId);
    }

    public List<PocketMoneyDTO> getPocketSuccess(String userId) {
        return pocketMoneyRepository.getPocketSuccess(userId);
    }

    public void savePointPocketMoney(int pocket_money_id) {
        pocketMoneyRepository.savePointPocketMoney(pocket_money_id);
    }

    public List<PocketMoneyDTO> getPocketStatus(String userId) {
        return pocketMoneyRepository.getPocketStatus(userId);
    }
}
