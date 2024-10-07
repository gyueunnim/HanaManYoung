package com.hana.manYoung.dto;

import com.hana.manYoung.model.ChallengeRecord;
import com.hana.manYoung.model.ChallengeSaving;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ChallengeResponseDTO {
    private List<ChallengeRecordDTO> todayChallenge;
    private List<ChallengeInfoDTO> challengeInfo;
    private List<ChallengeRecord> calendarData;
    private ChallengeSaving challengeSaving;
    private RelationDTO relation;
    private List<PocketMoneyDTO> pocketMoneyList;
}
