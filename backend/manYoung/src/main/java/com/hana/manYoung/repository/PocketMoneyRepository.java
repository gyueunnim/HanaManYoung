package com.hana.manYoung.repository;

import com.hana.manYoung.dto.PocketMoneyDTO;
import com.hana.manYoung.model.PocketMoney;
import lombok.RequiredArgsConstructor;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
@RequiredArgsConstructor
public class PocketMoneyRepository {
    private final SqlSessionTemplate sql;

    public void registerPocket(PocketMoney pocketMoney) {
        sql.insert("Pocket.registerPocket", pocketMoney);
    }

    public PocketMoneyDTO getPocketChild(String user_id) {
        List<PocketMoneyDTO> pocketMoneyDTOs = sql.selectList("Pocket.getPocketChild", user_id);
        if (pocketMoneyDTOs.isEmpty()) {
            return null;
        }
        return (PocketMoneyDTO) sql.selectList("Pocket.getPocketChild", user_id).get(0);
    }

    public PocketMoneyDTO getPocketParent(String user_id) {
        List<PocketMoneyDTO> pocketMoneyDTOS = sql.selectList("Pocket.getPocketParent", user_id);
        if(pocketMoneyDTOS.isEmpty()) {
            return null;
        }
        return (PocketMoneyDTO) sql.selectList("Pocket.getPocketParent", user_id).get(0);
    }

    public List<PocketMoneyDTO> getPocketList(String user_id) {
        return sql.selectList("Pocket.getPocketList", user_id);
    }

    public void acceptPocketMoney(String userId, String pocketTitle) {
        Map<String, String> params = new HashMap<>();
        params.put("user_id", userId);
        params.put("pocket_money_title", pocketTitle);
        sql.update("Pocket.acceptPocketMoney", params);
    }

    public void sendPocketMoney(int pocketMoneyId) {
        sql.update("Pocket.sendPocketMoney", pocketMoneyId);
    }

    public List<PocketMoneyDTO> getPocketSuccess(String user_id) {
        return sql.selectList("Pocket.getPocketSuccess", user_id);
    }

    public void savePointPocketMoney(int pocket_money_id) {
        sql.update("Pocket.savePointPocketMoney", pocket_money_id);
    }

    public List<PocketMoneyDTO> getPocketStatus(String user_id) {
       return sql.selectList("Pocket.getPocketStatus", user_id);
    }
}
