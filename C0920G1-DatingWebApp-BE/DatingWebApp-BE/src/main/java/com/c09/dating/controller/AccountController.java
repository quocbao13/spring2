package com.c09.dating.controller;
import com.c09.dating.DTO.*;
import com.c09.dating.entity.*;
import com.c09.dating.repository.*;
import com.c09.dating.security.jwt.JwtProvider;
import com.c09.dating.security.jwt.JwtResponse;
import com.c09.dating.security.service.EmailService;
import com.c09.dating.security.service.UserDetailsImpl;
import com.c09.dating.security.service.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.*;
import java.util.stream.Collectors;
@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/auth")
public class AccountController {
    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private PasswordEncoder encoder;
    @Autowired
    private JwtProvider jwtProvider;
    @Autowired
    private UserDetailsServiceImpl userDetailsService;
    @Autowired
    private ConfirmTokenRepository confirmTokenRepository;
    @Autowired
    private EmailService emailService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BanRepository banRepository;
    //Tuấn : xác thực login
    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequestDTO loginRequestDTO) {
        //UsernamePasswordAuthenticationToken lấy {username, password} từ LoginRequest.
        // AuthenticationManager sẽ dùng nó để xác thực đăng nhập
        // AuthenticationManager có DaoAuthenticationProvider với sự trợ giúp của {UserDetailsService và PasswordEncoder}
        // để xác thực đối tượng UsernamePasswordAuthenticationToken. Nếu thành công nó trả về 1 đối tượng Authentication
        // đầy đủ thông tin (bao gồm cả  granted authorities)

        if (!accountRepository.existsByEmail(loginRequestDTO.getEmail())) {
            return ResponseEntity.badRequest().body(new MessageResponse("notExistEmail", "Mail này chưa được đăng ký, vui lòng đăng ký!"));
        }
        Account account = accountRepository.findAccountByEmail(loginRequestDTO.getEmail());
        if (!account.getEnable()){
            return ResponseEntity.badRequest().body(new MessageResponse("notEnable", "Mail này chưa được xác nhận, vui lòng xác nhận mail!"));
        }
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequestDTO.getEmail(),
                        loginRequestDTO.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtProvider.generateToken(authentication);
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());
        User user = userRepository.findByAccounts_Id(account.getId());
        List<Ban> banList = banRepository.findAll();
        for (Ban ban: banList) {
            if (ban.getAccount().getEmail().equals(loginRequestDTO.getEmail())) {
                return ResponseEntity.badRequest().body(new MessageResponse("bannedAccount", "Tài khoản đã bị khóa vì vi phạm quy định của diễn đàn!"));
            }
        }
        return ResponseEntity.ok(new JwtResponse(account.getId(), jwt, user, roles));
    }
    //check đăng ký tài khoản mới
    @PostMapping("/signup")
    public ResponseEntity<?> registerAccount(@Valid @RequestBody RegisterRequestDTO registerRequestDTO) {
        Map<String, String> listError = new HashMap<>();
        if (accountRepository.existsByEmail(registerRequestDTO.getEmail())) {
            listError.put("existEmail", "Email đăng ký đã tồn tại!");
        }
        if (!registerRequestDTO.getPassword().equals(registerRequestDTO.getCheckPassword())) {
            listError.put("checkPass", "Xác nhận mật khẩu không đúng!");
        }
        if (!registerRequestDTO.isCheckPolicy()) {
            listError.put("checkPolicy", "Bạn chưa xác nhận điều kiện và điều khoản tham gia!");
        }
        if (!listError.isEmpty()) {
            return ResponseEntity
                    .badRequest()
                    .body(listError);
        }
        System.out.println(registerRequestDTO.getEmail());
        Account account = new Account();
        account.setPassword(encoder.encode(registerRequestDTO.getPassword()));
        account.setEmail(registerRequestDTO.getEmail());
        account.setPolicy(true);
        account.setEnable(false);
        Set<Role> roles = new HashSet<>();
        Role role = roleRepository.findByName(AccountRole.ROLE_CUSTOMER)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        roles.add(role);
        account.setRoles(roles);
        User user = new User();
        user.setDistrict(null);
        user.setAccounts(account);
        accountRepository.save(account);
        userRepository.save(user);
        sendEmailVerifyAccount(account);
        return ResponseEntity.ok(new MessageResponse("verify", "Vui lòng vào email đã đăng ký để xác nhận đăng ký!"));
    }
    //xác nhận token gửi về mail để xác nhận mail đăng ký
    @RequestMapping(value = "/confirm-account", method = {RequestMethod.GET, RequestMethod.POST})
    public ResponseEntity<?> confirmUserAccount(@RequestParam("token") String token) {
        ConfirmToken confirmToken = confirmTokenRepository.findByConfirmationToken(token);
        if (confirmToken != null) {
            Account account = accountRepository.findAccountByEmail(confirmToken.getAccount().getEmail());
            account.setEnable(true);
            accountRepository.save(account);
            return ResponseEntity.ok().body(new MessageResponse("verified", "Đăng ký tài khoản hoàn tất, hãy đăng nhập để trải nghiệm ^^~"));
        }
        return ResponseEntity.badRequest().body(new MessageResponse("notVerified", "Đường link không đúng hoặc hết hạn sử dụng, vui lòng đăng ký lại!"));
    }
    //gửi mail xác nhận khi đăng ký tài khoản
    private void sendEmailVerifyAccount(Account account) {
        ConfirmToken confirmToken = new ConfirmToken(account);
        confirmTokenRepository.save(confirmToken);
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(account.getEmail());
        mailMessage.setSubject("Hoàn thành quá trình đăng ký!");
        mailMessage.setFrom("c0920g1kingofcode@gmail.com");
        mailMessage.setText("Đề hoàn thành đăng ký, vui lòng ấn vào đường link này : "
                + "http://localhost:4200/verify-account?token=" + confirmToken.getConfirmationToken());
        emailService.sendEmail(mailMessage);
    }
    //handle exception Tuan
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleValidationExceptions(
            MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return errors;
    }
}
