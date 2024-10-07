package com.hana.bank.service;

import com.hana.bank.dto.*;
import com.hana.bank.model.Account;
import com.hana.bank.repository.AccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.management.relation.Relation;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AccountService {
    private final AccountRepository accountRepository;
    public List<Account> getAllAccounts() {
        return accountRepository.getAllAccounts();
    }

    public Account getAccountByAccNum(String accNum) {
        return accountRepository.getAccountByAccNum(accNum);
    }

    public void registerAccount(String userID) {
        accountRepository.registerAccount(userID);
    }

    public List<Account> getAccountByUserID(String userId) {
        return accountRepository.getAccountByID(userId);
    }

    public AccountDTO getChallengeAccount(String user_id) {
        return accountRepository.getChallengeAccount(user_id);
    }

    public void updateReward(RewardRequestDTO rewardRequestDTO) {
        accountRepository.updateReward(rewardRequestDTO);
    }

    public AccountTotalDTO getTotalIncome(String acc_num) {
        return accountRepository.getTotalIncome(acc_num);
    }

    public AccountTotalDTO getTotalExpense(String acc_num) {
        return accountRepository.getTotalExpense(acc_num);
    }

    public void startSavingAT_01(String user_id, int amount) {
        accountRepository.startSavingAT_01(user_id, amount);
    }

    public void startSavingAT_02(String user_id, int amount) {
        accountRepository.startSavingAT_02(user_id, amount);
    }

    public List<AccountDTO> getChildInfo(List<RelationDTO> relations) {
        List<AccountDTO> accountList = new ArrayList<>();
        for (RelationDTO relationDTO : relations) {
            accountList.add(accountRepository.getAccountByUserID(relationDTO.getRelation_user_target()));
        }
        return accountList;
    }

    public void sendPocketMoney(RequestPocketMoneyDTO requestPocketMoneyDTO) {
        accountRepository.sendPocketMoney(requestPocketMoneyDTO);
    }

    public void sendMoney(SendMoneyDTO sendMoneyDTO) {
        accountRepository.sendMoney(sendMoneyDTO);
    }
}
