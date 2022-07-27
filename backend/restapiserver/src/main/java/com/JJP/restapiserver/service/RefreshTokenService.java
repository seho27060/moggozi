package com.JJP.restapiserver.service;

import com.JJP.restapiserver.domain.entity.member.Member;
import com.JJP.restapiserver.domain.entity.member.RefreshToken;
import com.JJP.restapiserver.exception.TokenRefreshException;
import com.JJP.restapiserver.repository.MemberRepository;
import com.JJP.restapiserver.repository.RefreshTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@Service
public class RefreshTokenService {

    @Value("${jwt.refreshExpirationInMs}")
    private Long refreshTokenDurationMs;

    @Autowired
    private RefreshTokenRepository refreshTokenRepository;

    @Autowired
    private MemberRepository memberRepository;

    public Optional<RefreshToken> findByToken(String token) {
        return refreshTokenRepository.findByToken(token);
    }

    // Refresh token 생성
    public RefreshToken createRefreshToken(Long memberId) {

        Member member = memberRepository.findById(memberId).get();
        Instant date = Instant.now().plusMillis(refreshTokenDurationMs);
        String token = UUID.randomUUID().toString();

        RefreshToken refreshToken = RefreshToken.builder().id(memberId).member(member).token(token).expiryDate(date).build();
        refreshToken = refreshTokenRepository.save(refreshToken);

        return refreshToken;
    }

    // Refresh token 유효기간 검증
    public RefreshToken verifyExpiration(RefreshToken token) {
        if (token.getExpiryDate().compareTo(Instant.now()) < 0) { // token이 만료된 경우, 리프레시 토큰 db에서 삭제
            refreshTokenRepository.delete(token);
            throw new TokenRefreshException(token.getToken(), "Refresh Token was expired. " +
                    "please make a new login request.");
        }
        return token;
    }

    // 토큰 삭제 - 멤버에 해당하는 토큰 제거
    @Transactional
    public int deleteByMemberId(Long memberId) {
        return refreshTokenRepository.deleteByMember(memberRepository.findById(memberId).get());
    }

}
