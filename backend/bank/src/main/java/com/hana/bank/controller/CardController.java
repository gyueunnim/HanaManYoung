package com.hana.bank.controller;

import com.hana.bank.model.Card;
import com.hana.bank.model.CardTransaction;
import com.hana.bank.service.CardService;
import com.hana.bank.service.CardTransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("/card")
@RestController
@RequiredArgsConstructor
public class CardController {
    private final CardService cardService;
    private final CardTransactionService cardTransactionService;

    @GetMapping("/all")
    public List<Card> getAllCards() {
        return cardService.getAllCards();
    }

//    @GetMapping("/transaction/all")
//    public List<CardTransaction> getAllCardTransactions() {
//        return cardTransactionService.getAllCardTransactions();
//    }

    @GetMapping("/cardNum/{acc_num}")
    public Card getCardByAccNum(@PathVariable String acc_num) {
        return cardService.getCardByAccNum(acc_num);
    }

}
