package com.hana.manYoung.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtUtil {
    static final SecretKey key = Keys.hmacShaKeyFor(Decoders.BASE64.decode("dHJhdmVsSG9tZVNlY3JldHRyYXZlbEhvbWVTZWNyZXQ="));

    public static String createToken(Authentication auth) {
        UserDetails userDetails = (UserDetails) auth.getPrincipal();
        String name = userDetails.getUsername();
        String jwt = Jwts.builder().claim("userId", name).issuedAt(new Date(System.currentTimeMillis())).expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24)).signWith(key).compact();
        return jwt;
    }

    public static Claims extractToken(String token) {
//        Claims claims = Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload();
        Claims claims = Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getBody();
        return claims;
    }

    // 토큰에서 사용자 ID 추출
    public static String extractUserIdFromToken(String token) {
        Claims claims = extractToken(token);
        return claims.get("userId", String.class); // "userId" 클레임에서 값을 추출
    }
}
