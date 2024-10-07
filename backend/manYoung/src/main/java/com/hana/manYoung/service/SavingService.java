package com.hana.manYoung.service;

import com.hana.manYoung.model.ChallengeSaving;
import com.hana.manYoung.repository.SavingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SavingService {
    private final SavingRepository repository;
    public void registerSaving(ChallengeSaving challengeSaving) {
        repository.registerSaving(challengeSaving);
    }

    public ChallengeSaving getSaving(String user_id) {
        return repository.getSaving(user_id);
    }
}
