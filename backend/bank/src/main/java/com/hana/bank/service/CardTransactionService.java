package com.hana.bank.service;

import com.hana.bank.model.Card;
import com.hana.bank.model.CardTransaction;
import com.hana.bank.repository.CardRepository;
import com.hana.bank.repository.CardTransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CardTransactionService {
    private final CardTransactionRepository cardTransactionRepository;
    public List<CardTransaction> getAllCardTransactionsByCardNum (String cardNum) {
        return cardTransactionRepository.getAllCardTransactionsByCardNum(cardNum);
    }
}
