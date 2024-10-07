package com.hana.bank.repository;

import com.hana.bank.model.Card;
import lombok.RequiredArgsConstructor;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class CardRepository {
    private final SqlSessionTemplate sql;
    public List<Card> getAllCards() {
        return sql.selectList("Card.getAllCards");
    }

    public Card getCardByAccNum(String accNum) {
        return (Card) sql.selectList("Card.getCardByAccNum", accNum).get(0);
    }
}
