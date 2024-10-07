package com.hana.bank.service;

import com.hana.bank.model.ChallengeSaving;
import com.hana.bank.repository.AccountRepository;
import com.hana.bank.repository.AccountTransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AutoTransferService {
    private final AccountRepository accountRepository;
    private final AccountTransactionRepository accountTransactionRepository;

    public void handleAutoTransfer(List<ChallengeSaving> challengeSavingList) {
        for (ChallengeSaving challengeSaving : challengeSavingList) {
            accountRepository.autoTransfer(challengeSaving);
            accountTransactionRepository.autoTransfer(challengeSaving);
        }
    }
}
