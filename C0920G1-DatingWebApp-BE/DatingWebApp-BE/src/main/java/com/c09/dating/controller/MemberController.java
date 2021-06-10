package com.c09.dating.controller;
import com.c09.dating.DTO.MemberDTO;
import com.c09.dating.DTO.ReportDTO;
import com.c09.dating.entity.*;
import com.c09.dating.security.service.EmailService;
import com.c09.dating.service.AccountService;
import com.c09.dating.service.BanService;
import com.c09.dating.service.ReportService;
import com.c09.dating.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "*",allowedHeaders = "*")
@RequestMapping(value = "/api/member-management")
public class MemberController {
    @Autowired
    private UserService userService;

    @Autowired
    private ReportService reportService;

    @Autowired
    private BanService banService;

    @Autowired
    private AccountService accountService;

    @Autowired
    private EmailService emailService;

    @RequestMapping(value = "/list-member", method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE, params = "size")
    public ResponseEntity<List<MemberDTO>> getAllMembers(@RequestParam Integer size) {
        List<MemberDTO> memberList;

        memberList = this.userService.getALLMembers(size);

        if (memberList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(memberList, HttpStatus.OK);
    }

    @GetMapping(value = "/list-member-find", produces = MediaType.APPLICATION_JSON_VALUE, params = {"userNameSearch", "size"})
    public ResponseEntity<List<MemberDTO>> getMemberByName(@RequestParam("userNameSearch") String userNameSearch,
                                                           @RequestParam("size") Integer size) {

        List<MemberDTO> memberList = this.userService.getAllMembersByUserName(userNameSearch, size);

        if (memberList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(memberList, HttpStatus.OK);
    }

    @GetMapping(value = "/reports/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<ReportDTO>> getAllReport(@PathVariable Long id) {

        List<ReportDTO> reports = this.reportService.findAllReportByUserId(id);
        if (reports.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(reports, HttpStatus.OK);
        }
    }

    @GetMapping(value = "/member/{userId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<MemberDTO> getMemberByUserId(@PathVariable Long userId) {
        MemberDTO member = this.userService.getMembersByUserId(userId);
        if (member == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(member, HttpStatus.OK);
    }

    @GetMapping(value = "/ban-1-week/{accountId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> ban1Week(@PathVariable Long accountId) {
        Account account=this.accountService.findById(accountId);
        this.sendEmailLockOneWeek(account);
        this.banService.banAccountForOneWeek(accountId);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping(value = "/ban-1-month/{accountId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> ban1Month(@PathVariable Long accountId) {
        Account account = null;
        account =   this.accountService.findById(accountId);
        this.sendEmailLockOneMonth(account);
        this.banService.banAccountForOneMonth(accountId);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping(value = "/ban-forever/{accountId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> banForever(@PathVariable Long accountId) {
        Account account = null;
        account =   this.accountService.findById(accountId);
        this.sendEmailLockForever(account);
        this.banService.banAccountForever(accountId);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    private void sendEmailLockOneWeek(Account account) {
        User user = this.userService.findById(account.getId());
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(account.getEmail());
        mailMessage.setSubject("Cảnh báo vi phạm từ C0920G1 Dating website");
        String content="";
        content="Xin chào"+" "+user.getFullName()+
                "Thông báo xử phạt người dùng"+
                "Chúng tôi nhận thấy bạn đả vi phạm điều khoản của website rất nhiều lần"+
                "Tài khoản của bạn sẽ bị khoá trong 1 tháng"+
                "Thông báo này có hiệu lực ngay lập tức";
        mailMessage.setText(content);
        emailService.sendEmail(mailMessage);
    }
    private void sendEmailLockOneMonth(Account account) {
        User user = this.userService.findById(account.getId());
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(account.getEmail());
        mailMessage.setSubject("Cảnh báo vi phạm từ C0920G1 Dating website");
        String content="";
        content="Xin chào"+" "+user.getFullName()+
                "Thông báo xử phạt người dùng"+
                "Chúng tôi nhận thấy bạn đả vi phạm điều khoản của website rất nhiều lần"+
                "Tài khoản của bạn sẽ bị khoá trong 1 tháng"+
                "Thông báo này có hiệu lực ngay lập tức";
        mailMessage.setFrom("c0920g1kingofcode@gmail.com");
        mailMessage.setText(content);
        emailService.sendEmail(mailMessage);

    }

    private void sendEmailLockForever(Account account) {
        User user = this.userService.findById(account.getId());
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(account.getEmail());
        mailMessage.setSubject("Cảnh báo vi phạm từ C0920G1 Dating website");
        String content="";
        content="Xin chào"+" "+user.getFullName()+
                "Thông báo xử phạt người dùng"+
                "Chúng tôi nhận thấy bạn đả vi phạm điều khoản của website rất nhiều lần"+
                "Tài khoản của bạn sẽ bị khoá vĩnh viễn khỏi hệ thống"+
                "Thông báo này có hiệu lực ngay lập tức";
        mailMessage.setFrom("c0920g1kingofcode@gmail.com");
        mailMessage.setText(content);
        emailService.sendEmail(mailMessage);
    }
    @GetMapping("/warning/{accountId}")
    public ResponseEntity<?> sendEmailWarning(@PathVariable Long accountId) {
        Account account = this.accountService.findById(accountId);
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(account.getEmail());
        mailMessage.setSubject("Cảnh báo vi phạm từ C0920G1 Dating website");
        String content="";
        content="Xin chào"+" "+account.getUsers().getFullName()+"."+
                "Chúng tôi nhận thấy bạn đả vi phạm điều khoản của website."+
                "Nếu tiếp tục vi phạm bạn sẽ bị xử phạt.";
        mailMessage.setFrom("c0920g1kingofcode@gmail.com");
        mailMessage.setText(content);
        emailService.sendEmail(mailMessage);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
