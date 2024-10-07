package com.hana.manYoung.dto;

import com.hana.manYoung.model.Rank;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class RankDTO {
    private List<Rank> rankSchools;
    private List<Rank> rankRegions;
    private List<Rank> rankAges;
    private List<Rank> rankSchool;
    private List<Rank> rankRegion;
    private List<Rank> rankAge;
}
