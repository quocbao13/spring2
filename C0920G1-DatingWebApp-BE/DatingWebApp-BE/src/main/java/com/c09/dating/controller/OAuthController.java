package com.c09.dating.controller;

import com.c09.dating.DTO.TokenDTO;
import com.c09.dating.entity.Account;
import com.c09.dating.entity.AccountRole;
import com.c09.dating.entity.Role;
import com.c09.dating.repository.AccountRepository;
import com.c09.dating.repository.RoleRepository;
import com.c09.dating.repository.UserRepository;
import com.c09.dating.security.jwt.JwtProvider;
import com.c09.dating.security.jwt.JwtResponse;
import com.c09.dating.security.service.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.social.facebook.api.Facebook;
import org.springframework.social.facebook.api.User;
import org.springframework.social.facebook.api.impl.FacebookTemplate;
import org.springframework.web.bind.annotation.*;
import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
@RestController
@RequestMapping("/oauth")
@CrossOrigin(origins = "http://localhost:4200")
public class OAuthController {
    @Value("${secretPsw}")
    private String secretPsw;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtProvider jwtProvider;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRepository userRepository;

    //Tuấn : xác thực login facebook
    @PostMapping("/facebook")
    public ResponseEntity<?> facebook(@RequestBody TokenDTO tokenDTO) throws IOException {
        Facebook facebook = new FacebookTemplate(tokenDTO.getValue());
        final String [] fields = {"email","picture","name"};
        // Lớp User của facebook để nhận đối tượng do facebook trả về
        User user = facebook.fetchObject("me", User.class, fields);
        Account account;
        if (accountRepository.existsByEmail(user.getEmail())){
            account = accountRepository.findAccountByEmail(user.getEmail());
        } else {
            com.c09.dating.entity.User user1 = new com.c09.dating.entity.User();
            user1.setFullName(user.getName());
            user1.setDistrict(null);
            account = saveAccount(user.getEmail(), user1);
        }
        JwtResponse jwtResponse = loginExistAccount(account);
        return ResponseEntity.ok(jwtResponse);
    }
    //check tài khoản facebook đã login hay chưa, nếu đã đăng nhập thì dùng tài khoản cũ để thao tác
    private JwtResponse loginExistAccount(Account account){
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(account.getEmail(), secretPsw)
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtProvider.generateToken(authentication);
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());
        com.c09.dating.entity.User user = userRepository.findByAccounts_Id(account.getId());
        return new JwtResponse(account.getId(),jwt, user, roles);
    }
    //tạo tài khoản vào DB mới dựa vào tài khoản facebook đăng nhập vào hệ thống
    private Account saveAccount(String email, com.c09.dating.entity.User user) {
        Account account = new Account();
        account.setEmail(email);
        account.setPassword(passwordEncoder.encode(secretPsw));
        account.setEnable(true);
        account.setPolicy(true);
        Role roleAccount = roleRepository.findByName(AccountRole.ROLE_CUSTOMER).get();
        Set<Role> roles = new HashSet<>();
        roles.add(roleAccount);
        account.setRoles(roles);
        user.setAccounts(account);
        accountRepository.save(account);
        userRepository.save(user);
        return account;
    }
}
