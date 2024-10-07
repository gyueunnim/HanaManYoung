package com.hana.bank.dto;

import com.hana.bank.model.Account;
import com.hana.bank.model.AccountTransaction;
import com.hana.bank.model.Card;
import com.hana.bank.model.CardTransaction;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@RequiredArgsConstructor
public class AccountCardDTO {
    List<AccountTransactionWithCode> accountTransactions;
    List<AccountTransactionWithCode> accountChallengeTransactions;
    List<Account> accountList;
    List<CardTransaction> cardTransactions;
    Card card;
    AccountTotalDTO accountTotalIncome;
    AccountTotalDTO accountTotalExpense;

    public AccountCardDTO(List<AccountTransactionWithCode> accountTransactions, List<AccountTransactionWithCode> accountChallengeTransactions, List<Account> accountList, List<CardTransaction> cardTransactions, Card card, AccountTotalDTO accountTotalIncome, AccountTotalDTO accountTotalExpense) {
        this.accountTransactions = accountTransactions;
        this.accountChallengeTransactions = accountChallengeTransactions;
        this.accountList = accountList;
        this.cardTransactions = cardTransactions;
        this.card = card;
        this.accountTotalIncome = accountTotalIncome;
        this.accountTotalExpense = accountTotalExpense;
    }
}
