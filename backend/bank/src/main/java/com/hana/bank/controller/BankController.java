package com.hana.bank.controller;

import com.hana.bank.dto.SendMoneyDTO;
import com.hana.bank.model.*;
import com.hana.bank.service.AccountService;
import com.hana.bank.service.AccountTransactionService;
import com.hana.bank.service.AutoTransferService;
import com.hana.bank.util.DateInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/bank")
@RestController
@RequiredArgsConstructor
public class BankController {
    private final AccountService accountService;
    private final AccountTransactionService accountTransactionService;
    private final AutoTransferService autoTransferService;

    @GetMapping("/account/all")
    public List<Account> getAllAccounts() {
        return accountService.getAllAccounts();
    }

    @GetMapping("/account/{accNum}")
    public Account getAccountByAccNum(@PathVariable String accNum) {
        return accountService.getAccountByAccNum(accNum);
    }

    @GetMapping("/transaction/{accNum}")
    public List<AccountTransaction> getAllAccountTransactionsByAccNum(@PathVariable String accNum) {
        return accountTransactionService.getAllAccountTransactionsByAccNum(accNum);
    }

    @PostMapping("/account/register")
    public ResponseEntity<String> registerAccount(@RequestBody String userID) {
        accountService.registerAccount(userID);
        return new ResponseEntity<>("User registered successfully", HttpStatus.OK);
    }

    @GetMapping("/accountNum/{user_id}")
    public List<Account> getAccountByID(@PathVariable String user_id) {
        return accountService.getAccountByUserID(user_id);
    }

    @PostMapping("/account/autoTransfer")
    public ResponseEntity<String> handleAutoTransfer(@RequestBody List<ChallengeSaving> challengeSavingList) {
        autoTransferService.handleAutoTransfer(challengeSavingList);

        // 적절한 응답을 반환합니다.
        return ResponseEntity.ok("적금 처리 완료");
    }

    @PostMapping("/sendMoney")
    public void sendMoney(@RequestBody SendMoneyDTO sendMoneyDTO) {
        sendMoneyDTO.setDate(DateInfo.getTodayWithSecond());
        accountService.sendMoney(sendMoneyDTO);
        accountTransactionService.sendMoney(sendMoneyDTO);
    }
}
