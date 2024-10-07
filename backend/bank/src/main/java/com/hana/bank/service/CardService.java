package com.hana.bank.service;

import com.hana.bank.model.AccountTransaction;
import com.hana.bank.model.Card;
//import com.hana.bank.repository.CardRepository;
import com.hana.bank.repository.CardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CardService {
    private final CardRepository cardRepository;
    public List<Card> getAllCards () {
        return cardRepository.getAllCards();
    }


    public Card getCardByAccNum(String accNum) {
        return cardRepository.getCardByAccNum(accNum);
    }
}
