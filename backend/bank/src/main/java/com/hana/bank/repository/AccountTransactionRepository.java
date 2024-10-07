package com.hana.bank.repository;

import com.hana.bank.dto.AccountTransactionWithCode;
import com.hana.bank.dto.RewardRequestDTO;
import com.hana.bank.dto.SendMoneyDTO;
import com.hana.bank.model.AccountTransaction;
import com.hana.bank.model.ChallengeSaving;
import com.hana.bank.util.DateInfo;
import lombok.RequiredArgsConstructor;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
@RequiredArgsConstructor
public class AccountTransactionRepository {
    private final SqlSessionTemplate sql;
    public List<AccountTransaction> getAllAccountTransactionsByAccNum(String accNum) {
        return sql.selectList("AccountTransaction.getAllAccountTransactionsByAccNum", accNum);
    }

    public List<AccountTransactionWithCode> getAllAccountTransactionByAccNumWithCode(String accNum) {
        LocalDate currentDate = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String date = currentDate.format(formatter);
        Map<String, Object> params = new HashMap<>();
        params.put("accNum", accNum);
        params.put("date", date+"%");
        return sql.selectList("AccountTransaction.getAllAccountTransactionByAccNumWithCode", params);
    }

    public List<AccountTransactionWithCode> getAllChallengeTransactionByAccNumWithCode(String accNum) {
        return sql.selectList("AccountTransaction.getAllChallengeTransactionByAccNumWithCode", accNum);
    }

    public void saveReward(RewardRequestDTO rewardRequestDTO) {
        sql.insert("AccountTransaction.saveReward", rewardRequestDTO);
    }

    public void startSavingAT_01(String user_id, int amount) {
        Map<String, Object> params = new HashMap<>();
        params.put("user_id", user_id);
        params.put("amount", -amount);
        params.put("date", DateInfo.getTodayWithSecond());
        sql.insert("AccountTransaction.startSavingAT_01", params);
    }

    public void startSavingAT_02(String user_id, int amount) {
        Map<String, Object> params = new HashMap<>();
        params.put("user_id", user_id);
        params.put("amount", amount);
        params.put("date", DateInfo.getTodayWithSecond());
        sql.insert("AccountTransaction.startSavingAT_02", params);
    }

    public void autoTransfer(ChallengeSaving challengeSaving) {
        sql.insert("AccountTransaction.autoTransferAT_01", challengeSaving);
        sql.insert("AccountTransaction.autoTransferAT_02", challengeSaving);
    }

    public void sendMoney(SendMoneyDTO sendMoneyDTO) {
        System.out.println(sendMoneyDTO.toString());
        sql.insert("AccountTransaction.sendMoney", sendMoneyDTO);
        sql.insert("AccountTransaction.receiveMoney", sendMoneyDTO);
    }
}
