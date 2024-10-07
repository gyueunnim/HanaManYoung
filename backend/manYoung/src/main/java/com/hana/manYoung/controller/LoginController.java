package com.hana.manYoung.controller;

import com.hana.manYoung.model.User;
import com.hana.manYoung.service.UserService;
import com.hana.manYoung.util.JwtUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/login")
@Controller
@RequiredArgsConstructor
public class LoginController {

    private final UserService userService;

    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    @GetMapping("/modal")
    public String login() {
        return "login";
    }

    @PostMapping("/try")
    public ResponseEntity<?> handleLogin(@RequestBody LoginRequest loginRequest, HttpServletResponse responseCookie) {
        String userId = loginRequest.getUserLoginId();
        String userPw = loginRequest.getUserPw();

        // 인증 토큰 생성
        var authToken = new UsernamePasswordAuthenticationToken(userId, userPw);

        // 인증 시도
        Authentication auth = authenticationManagerBuilder.getObject().authenticate(authToken);

        // 인증 성공 시 SecurityContext에 설정
        SecurityContextHolder.getContext().setAuthentication(auth);

        // JWT 생성
        var jwt = JwtUtil.createToken(SecurityContextHolder.getContext().getAuthentication());

        Cookie cookie = new Cookie("JWT", jwt);
        cookie.setMaxAge(60 * 60 * 24); // 24시간
        cookie.setPath("/"); // 전체 도메인에서 유효하도록 설정
        cookie.setHttpOnly(false);
        cookie.setSecure(false);

        responseCookie.addCookie(cookie);


        // 로그인 성공 응답
        LoginResponse loginResponse = new LoginResponse(true, userId, jwt);
        ApiResponse<LoginResponse> response = new ApiResponse<>(
                true, 200, "로그인 성공", loginResponse
        );
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/cookie")
    public ResponseEntity<?> getIdByCookie(@RequestBody String cookie) {
        String userId = JwtUtil.extractUserIdFromToken(cookie);
        User user = userService.getUserByUserId(userId);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @Setter
    @Getter
    static class LoginRequest {
        private String userLoginId;
        private String userPw;

    }

    @Setter
    @Getter
    static class LoginResponse {
        private boolean success;
        private String userId;
        private String jwt;

        public LoginResponse(boolean success, String userId, String jwt) {
            this.success = success;
            this.userId = userId;
            this.jwt = jwt;
        }
    }

    @Setter
    @Getter
    static class ApiResponse<T> {
        private boolean isSuccess;
        private int code;
        private String message;
        private T data;

        public ApiResponse(boolean isSuccess, int code, String message, T data) {
            this.isSuccess = isSuccess;
            this.code = code;
            this.message = message;
            this.data = data;
        }
    }
}