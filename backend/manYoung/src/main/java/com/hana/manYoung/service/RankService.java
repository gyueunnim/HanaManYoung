package com.hana.manYoung.service;

import com.hana.manYoung.dto.RankDTO;
import com.hana.manYoung.model.Rank;
import com.hana.manYoung.repository.RankRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RankService {
    private final RankRepository rankRepository;

    public List<Rank> selectSchools() {
        return rankRepository.selectRankSchools();
    }

    public List<Rank> selectRankRegions() {
        return rankRepository.selectRankRegions();
    }

    public List<Rank> selectRankAges() {
        return rankRepository.selectRankAges();
    }

    public List<Rank> selectSchool(String userId) {
        return rankRepository.selectSchool(userId);
    }

    public List<Rank> selectRegion(String userId) {
        return rankRepository.selectRegion(userId);
    }

    public List<Rank> selectRankAge(String userId) {
        return rankRepository.selectAge(userId);
    }
}
