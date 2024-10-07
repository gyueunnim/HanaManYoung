package com.hana.bank.util;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class CreateNum {
    public static String createDate() {
        LocalDate currentDate = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        return currentDate.format(formatter);
    }


    public static String getAccountNumber() {
        StringBuilder accountNumber = new StringBuilder();

        for (int i = 0; i < 14; i++) {
            int randomDigit = (int) (Math.random() * 10);
            accountNumber.append(randomDigit);
        }

        return accountNumber.toString();
    }

    public static String getCardNumber() {
        StringBuilder cardNumber = new StringBuilder();

        for (int i = 0; i < 4; i++) { // 4개의 그룹
            for (int j = 0; j < 4; j++) { // 각 그룹은 4자리 숫자
                int randomDigit = (int) (Math.random() * 10);
                cardNumber.append(randomDigit);
            }
            if (i < 3) { // 마지막 그룹 뒤에는 '-'를 붙이지 않음
                cardNumber.append("-");
            }
        }

        return cardNumber.toString();
    }
}
