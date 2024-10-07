package com.hana.manYoung.service;

import com.hana.manYoung.dto.UserDTO;
import com.hana.manYoung.model.User;
import com.hana.manYoung.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    public List<User> getAllUsers() {
        return userRepository.getAllUsers();
    }

    public User getUserByUserId(String userId) {
        return userRepository.getUserByUserId(userId);
    }

    public void registerUser(User user) {
        userRepository.registerUser(user);
    }

    public User searchUser(String user_id) {
        return userRepository.searchUser(user_id);
    }

    public List<UserDTO> getAllUsersWithCode() {
        return userRepository.getAllUsersWithCode();
    }

    public List<UserDTO> getUserById(String userId) {
        return userRepository.getUserById(userId);
    }

    public List<UserDTO> getUserBySchool(String school) {
        return userRepository.getUserBySchool(school);
    }

    public List<UserDTO> getUserByName(String userName) {
        return userRepository.getUserByName(userName);
    }

    public List<UserDTO> getUserByAddr(String addr) {
        return userRepository.getUserByAddr(addr);
    }
}
