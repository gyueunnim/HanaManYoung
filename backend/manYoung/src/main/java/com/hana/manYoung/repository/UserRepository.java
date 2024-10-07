package com.hana.manYoung.repository;

import com.hana.manYoung.dto.UserDTO;
import com.hana.manYoung.model.User;
import lombok.RequiredArgsConstructor;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class UserRepository {
    private final SqlSessionTemplate sql;
    public List<User> getAllUsers() {
        return sql.selectList("User.getAllUsers");
    }

    public User getUserByUserId(String userId) {
        return (User) sql.selectList("User.getUserByUserId", userId).get(0);
    }

    public void registerUser(User user) {
        sql.insert("User.registerUser", user);
    }

    public User searchUser(String user_id) {
        return (User) sql.selectList("User.searchUser", user_id).get(0);
    }

    public List<UserDTO> getAllUsersWithCode() {
        return sql.selectList("User.getAllUsersWithCode");
    }

    public List<UserDTO> getUserById(String userId) {
        return sql.selectList("User.getUserById", "%"+ userId+"%");
    }

    public List<UserDTO> getUserBySchool(String school) {
        return sql.selectList("User.getUserBySchool","%"+ school+"%");
    }

    public List<UserDTO> getUserByName(String userName) {
        return sql.selectList("User.getUserByName","%"+userName+"%");
    }

    public List<UserDTO> getUserByAddr(String addr) {
        return sql.selectList("User.getUserByAddr", "%"+addr+"%");
    }
}
