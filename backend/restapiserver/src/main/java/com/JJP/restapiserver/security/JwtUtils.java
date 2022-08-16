package com.JJP.restapiserver.security;

import com.JJP.restapiserver.domain.entity.member.ERole;
import com.JJP.restapiserver.domain.entity.member.Member;
import com.JJP.restapiserver.repository.member.MemberRepository;
import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.Optional;

@Component
public class JwtUtils {
    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);
    @Value("${jwt.secret}")
    private String jwtSecret;
    @Value("${jwt.accessExpirationInMs}")
    private int jwtExpirationMs;

    @Value("${jwt.refreshExpirationInMs}")
    private int jwtRefreshMs;

    @Autowired
    MemberRepository memberRepository;

    @Value("${jwt.cookieName}")
    private String jwtCookie;

    // 유효한 토큰인지 확인하기
    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken).getBody().getSubject();
            return true;
        } catch (SignatureException e) {
            logger.error("Invalid JWT signature: {}", e.getMessage());
        } catch (MalformedJwtException e) {
            logger.error("Invalid JWT token: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            logger.error("JWT token is expired: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            logger.error("JWT token is unsupported: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            logger.error("JWT claims string is empty: {}", e.getMessage());
        }
        return false;
    }

    // Username을 이용하여 토큰 생성
    public String generateTokenFromUsername(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
    }

    // User의 정보를 이용하여 토큰 만들기
    public String generateJwtToken(UserDetails userPrincipal) {
      return generateTokenFromUsername(userPrincipal.getUsername());
    }

    public String generateOAuthJwtToken(OAuth2User userPrincipal) {
        return generateTokenFromUsername(userPrincipal.getName());
    }

    // 토큰으로부터 사용자 이름 얻기
    public String getUserNameFromJwtToken(String token) {
        return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();
    }

    public Long getUserIdFromJwtToken(String token) {
        try{
            token = token.substring(7);
            String username = getUserNameFromJwtToken(token);
            Optional<Member> member = memberRepository.findByUsername(username);

            /** 해당 토큰을 가진 사용자가 없거나, 사용자가 휴면처리된 사용자의 경우 null 값을 반환하여,
            접근하려는 API나 사용하려고 하는 Method를 사용할 수 없도록 합니다. */

            if(member.get().getRole().getName().toString().equals("ROLE_INVALIDATED_USER"))
                throw new Exception();
            else
                return member.get().getId();
        } catch (Exception e) {
            return null;
        }
    }

    public String getRoleFromJwtToken(String token) {
        token = token.substring(7);
        String username = getUserNameFromJwtToken(token);
        try {
            Optional<Member> member = memberRepository.findByUsername(username);

            /** 해당 토큰을 가진 사용자가 없거나, 사용자가 휴면처리된 사용자의 경우 null 값을 반환하여,
             접근하려는 API나 사용하려고 하는 Method를 사용할 수 없도록 합니다. */

            if(member.get().getRole().getName().equals(ERole.ROLE_INVALIDATED_USER))
                throw new Exception();
            else
                return member.get().getRole().getName().toString();
        } catch (Exception e) {
            return null;
        }
    }
}
