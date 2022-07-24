package com.JJP.restapiserver.security;

import com.JJP.restapiserver.domain.entity.member.Member;
import com.JJP.restapiserver.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    // MemberRepository를 통해 db에 존재하는 사용자인지를 확인하기 위함이다.
    @Autowired
    MemberRepository memberRepository;

    // Dto 변경대상 X - 네트워크 상으로 전달되는 객체가 아니기 때문
    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Member user = memberRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));

        // Member db에서 찾은 내용을 바탕으로 UserDetails 객체 만들어 반환하기
        return UserDetailsImpl.build(user);
    }


}
