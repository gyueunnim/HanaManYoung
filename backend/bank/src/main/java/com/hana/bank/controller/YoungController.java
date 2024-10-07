package com.hana.bank.controller;

import com.hana.bank.dto.*;
import com.hana.bank.model.Account;
import com.hana.bank.model.Card;
import com.hana.bank.model.CardTransaction;
import com.hana.bank.service.AccountService;
import com.hana.bank.service.AccountTransactionService;
import com.hana.bank.service.CardService;
import com.hana.bank.service.CardTransactionService;
import com.hana.bank.util.DateInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class YoungController {
    private final AccountService accountService;
    private final AccountTransactionService accountTransactionService;
    private final CardService cardService;
    private final CardTransactionService cardTransactionService;

    @GetMapping("/profile/{user_id}")
    public AccountCardDTO getProfile(@PathVariable String user_id) {
        List<Account> accountList = accountService.getAccountByUserID(user_id);
        Card card = cardService.getCardByAccNum(accountList.get(0).getAcc_num());
        List<AccountTransactionWithCode> accountTransactions = accountTransactionService.getAllAccountTransactionByAccNumWithCode(accountList.get(0).getAcc_num());
        List<AccountTransactionWithCode> accountChallengeTransactions = accountTransactionService.getAllChallengeTransactionByAccNumWithCode(accountList.get(2).getAcc_num());
        List<CardTransaction> cardTransactions = cardTransactionService.getAllCardTransactionsByCardNum(card.getCard_num());
        AccountTotalDTO accountTotalIncome = accountService.getTotalIncome(accountList.get(0).getAcc_num());
        AccountTotalDTO accountTotalExpense = accountService.getTotalExpense(accountList.get(0).getAcc_num());
        return new AccountCardDTO(accountTransactions, accountChallengeTransactions, accountList, cardTransactions, card, accountTotalIncome, accountTotalExpense);
    }

    @GetMapping("/challenge/account/{user_id}")
    public AccountDTO getChallengeAccount(@PathVariable String user_id) {
       return accountService.getChallengeAccount(user_id);
    }

    @PostMapping("/challenge/reward/{user_id}")
    public void saveReward(@PathVariable String user_id, @RequestBody RewardRequestDTO rewardRequestDTO) {
        rewardRequestDTO.setUser_id(user_id);
        rewardRequestDTO.setAcc_t_date(DateInfo.getTodayWithSecond());
        accountService.updateReward(rewardRequestDTO);
        accountTransactionService.saveReward(rewardRequestDTO);
    }

    @PostMapping("/challenge/saving/start/{user_id}")
    public void startSaving(@PathVariable String user_id, @RequestBody Map<String, Object> requestBody) {
        int amount = (int) requestBody.get("amount");
        accountService.startSavingAT_01(user_id, amount);
        accountService.startSavingAT_02(user_id, amount);
        accountTransactionService.startSavingAT_01(user_id, amount);
        accountTransactionService.startSavingAT_02(user_id, amount);
    }

    @PostMapping("/parent/getChildInfo")
    public List<AccountDTO> getChildInfo(@RequestBody List<RelationDTO> relations){
        return accountService.getChildInfo(relations);
    }

    @PostMapping("/send/pocketMoney")
    public void sendPocketMoney(@RequestBody RequestPocketMoneyDTO requestPocketMoneyDTO) {
        requestPocketMoneyDTO.setDate(DateInfo.getTodayWithSecond());
        accountService.sendPocketMoney(requestPocketMoneyDTO);
    }
}
