package com.c09.dating.security.service;

import com.c09.dating.entity.Account;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.List;
import java.util.stream.Collectors;

public class UserDetailsFactory {
    public static UserDetailsImpl build(Account account) {
        List<GrantedAuthority> authorities =
                account.getRoles().stream().map(role -> new SimpleGrantedAuthority(role.getName().name())).collect(Collectors.toList());
        return new UserDetailsImpl(account.getEmail(),account.getPassword(),authorities);
    }
}
