package com.hana.bank.repository;

import com.hana.bank.dto.*;
import com.hana.bank.model.Account;
import com.hana.bank.model.Card;
import com.hana.bank.model.ChallengeSaving;
import com.hana.bank.util.DateInfo;
import lombok.RequiredArgsConstructor;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Repository
@RequiredArgsConstructor
public class AccountRepository {
    private final SqlSessionTemplate sql;
    public List<Account> getAllAccounts() {
        return sql.selectList("Account.getAllAccounts");
    }

    public Account getAccountByAccNum(String accNum) {
        return (Account) sql.selectList("Account.getAccountByAccNum", accNum).get(0);
    }

    public void registerAccount(String userID) {
        Account account = new Account(userID, "AT_01");
        sql.insert("Account.registerAccount", account);
        sql.insert("Account.registerAccount", new Account(userID, "AT_02"));
        sql.insert("Account.registerAccount", new Account(userID, "AT_03"));
        Card card = new Card(account.getAcc_num());
        sql.insert("Card.registerCard", card);
    }

    public List<Account> getAccountByID(String userId) {
        return sql.selectList("Account.getAccountByID", userId);
    }

    public AccountDTO getChallengeAccount(String user_id) {
        return (AccountDTO) sql.selectList("Account.getChallengeAccount", user_id).get(0);
    }

    public void updateReward(RewardRequestDTO rewardRequestDTO) {
        sql.update("Account.updateReward", rewardRequestDTO);
    }

    public AccountTotalDTO getTotalIncome(String acc_num) {
        Map<String, String> params = new HashMap<>();
        params.put("acc_num", acc_num);
        params.put("date", DateInfo.getMonth()+"%");

        List<AccountTotalDTO> accountDTOS = sql.selectList("Account.getTotalIncome", params);

        if(accountDTOS == null | accountDTOS.isEmpty()) {
            return null;
        }

        return accountDTOS.get(0);
    }

    public AccountTotalDTO getTotalExpense(String acc_num) {
        Map<String, String> params = new HashMap<>();
        params.put("acc_num", acc_num);
        params.put("date", DateInfo.getMonth()+"%");
        List<AccountTotalDTO> accountDTOS = sql.selectList("Account.getTotalExpense", params);
        if (accountDTOS == null | accountDTOS.isEmpty()) {
            return null;
        }
        return accountDTOS.get(0);
    }

    public void startSavingAT_01(String user_id, int amount) {
        Map<String, Object> params = new HashMap<>();
        params.put("user_id", user_id);
        params.put("amount", amount);
        sql.insert("Account.startSavingAT_01", params);
    }

    public void startSavingAT_02(String user_id, int amount) {
        Map<String, Object> params = new HashMap<>();
        params.put("user_id", user_id);
        params.put("amount", amount);
        sql.insert("Account.startSavingAT_02", params);
    }

    public void autoTransfer(ChallengeSaving challengeSaving) {
        sql.update("Account.autoTransferAT_01", challengeSaving);
        sql.update("Account.autoTransferAT_02", challengeSaving);
    }

    public AccountDTO getAccountByUserID(String user_id) {
        return (AccountDTO) sql.selectList("Account.getAccountByUserID", user_id).get(0);
    }

    public void sendPocketMoney(RequestPocketMoneyDTO requestPocketMoneyDTO) {
        requestPocketMoneyDTO.setDate(DateInfo.getTodayWithSecond());
        sql.update("Account.sendPocketMoney", requestPocketMoneyDTO);
        sql.update("Account.receivePocketMoney", requestPocketMoneyDTO);
        sql.insert("AccountTransaction.sendPocketMoney", requestPocketMoneyDTO);
        sql.insert("AccountTransaction.receivePocketMoney", requestPocketMoneyDTO);
    }

    public void sendMoney(SendMoneyDTO sendMoneyDTO) {
        sql.update("Account.sendMoney", sendMoneyDTO);
        sql.update("Account.receiveMoney", sendMoneyDTO);
    }
}