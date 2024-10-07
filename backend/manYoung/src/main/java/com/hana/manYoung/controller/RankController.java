package com.hana.manYoung.controller;

import com.hana.manYoung.dto.RankDTO;
import com.hana.manYoung.service.RankService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;


@RequestMapping("/rank")
@RestController
@RequiredArgsConstructor
public class RankController {
    private final RankService rankService;
    @GetMapping("/get/{user_id}")
    public RankDTO getRank(@PathVariable String user_id) {
        RankDTO rankDTO = new RankDTO();
        rankDTO.setRankSchools(rankService.selectSchools());
        rankDTO.setRankRegions(rankService.selectRankRegions());
        rankDTO.setRankAges(rankService.selectRankAges());
        rankDTO.setRankSchool(rankService.selectSchool(user_id));
        rankDTO.setRankRegion(rankService.selectRegion(user_id));
        rankDTO.setRankAge(rankService.selectRankAge(user_id));

        return rankDTO;
    }
}
