package com.hana.bank.service;

import com.hana.bank.dto.AccountTransactionWithCode;
import com.hana.bank.dto.RewardRequestDTO;
import com.hana.bank.dto.SendMoneyDTO;
import com.hana.bank.model.AccountTransaction;
import com.hana.bank.repository.AccountTransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AccountTransactionService {
    private final AccountTransactionRepository accountTransactionRepository;
    public List<AccountTransaction> getAllAccountTransactionsByAccNum (String accNum) {
        return accountTransactionRepository.getAllAccountTransactionsByAccNum(accNum);
    }

    public List<AccountTransactionWithCode> getAllAccountTransactionByAccNumWithCode(String accNum) {
        return accountTransactionRepository.getAllAccountTransactionByAccNumWithCode(accNum);
    }

    public List<AccountTransactionWithCode> getAllChallengeTransactionByAccNumWithCode(String accNum) {
        return accountTransactionRepository.getAllChallengeTransactionByAccNumWithCode(accNum);
    }

    public void saveReward(RewardRequestDTO rewardRequestDTO) {
        accountTransactionRepository.saveReward(rewardRequestDTO);
    }

    public void startSavingAT_01(String user_id, int amount) {
        accountTransactionRepository.startSavingAT_01(user_id, amount);
    }

    public void startSavingAT_02(String user_id, int amount) {
        accountTransactionRepository.startSavingAT_02(user_id, amount);
    }

    public void sendMoney(SendMoneyDTO sendMoneyDTO) {
        accountTransactionRepository.sendMoney(sendMoneyDTO);
    }
}
