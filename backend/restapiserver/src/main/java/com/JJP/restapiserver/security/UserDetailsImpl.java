package com.JJP.restapiserver.security;


import com.JJP.restapiserver.domain.entity.member.Member;
import com.JJP.restapiserver.domain.entity.member.Role;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Objects;

// username을 이용하여 userDetails object 리턴
// userDetails에 포함시킬 내용을 정의
public class UserDetailsImpl implements UserDetails {

    private static final long serialVersionUID = 1L;
    private Long id;
    private String username;
    private String nickname;
    @JsonIgnore
    private String password;

    // AuthenticationManager가 사용자 인증과, 권한을 확인 후, Authentication object를 만들 때 사용됨
    private GrantedAuthority authority;

    public UserDetailsImpl(Long id, String username, String nickname
            , String password, GrantedAuthority authority) {
        this.id = id;
        this.nickname = nickname;
        this.username = username;
        this.password = password;
        this.authority = authority;
    }

    public static UserDetailsImpl build(Member member) {
        Role role = member.getRole();
        GrantedAuthority authority = new SimpleGrantedAuthority(role.getName().name());
        return new UserDetailsImpl(member.getId(), member.getUsername(), member.getNickname(), member.getPassword(), authority);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    public String getNickname() {
        return nickname;
    }

    public long getAuthority() {
        switch(authority.getAuthority()) {
            case "ROLE_USER":
                return 1;
            case "ROLE_INVALIDATED_USER":
                return 2;
            case "ROLE_ADMIN":
                return 3;
        }
        return -1;
    }

    public Long getId() {
        return id;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;

        UserDetailsImpl user = (UserDetailsImpl) o;
        return Objects.equals(id, user.id);
    }
}
