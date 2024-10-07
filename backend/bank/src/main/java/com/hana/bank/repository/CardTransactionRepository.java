package com.hana.bank.repository;

import com.hana.bank.model.CardTransaction;
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
public class CardTransactionRepository {
    private final SqlSessionTemplate sql;
    public List<CardTransaction> getAllCardTransactionsByCardNum(String cardNum) {
        String date = DateInfo.getToday();
        Map<String, Object> params = new HashMap<>();
        params.put("cardNum", cardNum);
        params.put("date", date+"%");
        return sql.selectList("CardTransaction.getAllCardTransactionsByCardNum", params);
    }
}
