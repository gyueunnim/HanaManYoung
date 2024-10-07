package com.hana.manYoung.controller;

import com.hana.manYoung.dto.*;
import com.hana.manYoung.model.Relation;
import com.hana.manYoung.model.User;
import com.hana.manYoung.service.DiaryService;
import com.hana.manYoung.service.RelationService;
import com.hana.manYoung.service.UserService;
import lombok.RequiredArgsConstructor;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@RequestMapping("/user")
@RestController
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final DiaryService diaryService;
    private final RelationService relationService;

    @GetMapping("/all")
    public List<User> register() {
        return userService.getAllUsers();
    }

    @GetMapping("/{userId}")
    public User getUserByUserId(@PathVariable String userId) {
        return userService.getUserByUserId(userId);
    }

    @PostMapping("/register/young")
    public void registerUser(@RequestBody User user) {
        user.setUser_pw(BCrypt.hashpw(user.getUser_pw(), BCrypt.gensalt(10)));
        RestTemplate restTemplate = new RestTemplate();
//        String urlAccount = "http://localhost:8081/bank/account/register";
        String urlAccount = "http://34.64.150.163:8080/bank/account/register";

        ResponseEntity<String> response = restTemplate.postForEntity(urlAccount, user.getUser_login_id(), String.class);

        userService.registerUser(user);

//        System.out.println("Response from localhost:8081: " + response.getBody());
        System.out.println("Response from http://34.64.151.211:8080/bank/account/register: " + response.getBody());
    }

    @GetMapping("/getConsumeData/{user_id}")
    public List<ConsumeDTO> getConsumeData(@PathVariable String user_id) {
        return diaryService.getConsumeData(user_id);
    }

    @GetMapping("/getDiaryItemMax/{user_id}")
    public DiaryItemMaxDTO getDiaryItemMax(@PathVariable String user_id) {
        return diaryService.getDiaryItemMax(user_id);
    }

    @PostMapping("/search")
    public User searchUser(@RequestBody String user_id) {
        return userService.searchUser(user_id);
    }

    @PostMapping("/relation/register")
    public void registerRelation(@RequestBody Relation relation) {
        relationService.registerRelation(relation);
    }

    @GetMapping("/relation/get/{user_id}")
    public RelationResponseDTO getRelation(@PathVariable String user_id) {
        RelationResponseDTO relationResponseDTO = new RelationResponseDTO();
        List<RelationDTO> relationList = relationService.getRelation(user_id);
        List<RelationDTO> relationRequestList = relationService.getRelationRequest(user_id);
        relationResponseDTO.setRelationList(relationList);
        relationResponseDTO.setRelationRequestList(relationRequestList);
        return relationResponseDTO;
    }

    @GetMapping("/relation/getParent/{user_id}")
    public RelationDTO getParent(@PathVariable String user_id) {
        return relationService.getParent(user_id);
    }

    @PostMapping("/relation/accept/{relation_user_target}")
    public void acceptRelation(@RequestBody String relation_user_request, @PathVariable String relation_user_target) {
        relationService.acceptRelation(relation_user_request, relation_user_target);
    }

    @GetMapping("/get/all")
    public List<UserDTO> getAllUsers() {
        return userService.getAllUsersWithCode();
    }

    @GetMapping("/get/id/{user_id}")
    public List<UserDTO> getUserById(@PathVariable String user_id) {
        return userService.getUserById(user_id);
    }
    @GetMapping("/get/school/{school}")
    public List<UserDTO> getUserBySchool(@PathVariable String school) {
        return userService.getUserBySchool(school);
    }
    @GetMapping("/get/name/{user_name}")
    public List<UserDTO> getUserByName(@PathVariable String user_name) {
        return userService.getUserByName(user_name);
    }
    @GetMapping("/get/addr/{addr}")
    public List<UserDTO> getUserByAddr(@PathVariable String addr) {
        return userService.getUserByAddr(addr);
    }
}
