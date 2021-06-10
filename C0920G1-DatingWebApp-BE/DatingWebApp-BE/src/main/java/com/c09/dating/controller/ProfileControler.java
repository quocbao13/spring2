package com.c09.dating.controller;

import com.c09.dating.DTO.*;
import com.c09.dating.entity.Account;

import com.c09.dating.entity.Relationship;
import com.c09.dating.entity.User;
import com.c09.dating.repository.AccountRepository;
import com.c09.dating.security.jwt.JwtProvider;
import com.c09.dating.security.service.UserDetailsServiceImpl;
import com.c09.dating.service.ImgService;
import com.c09.dating.service.ProfileService;
import com.c09.dating.service.RelationshipService;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.security.Principal;
import java.util.List;
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/profile")
public class ProfileControler {


    @Autowired
    private ProfileService profileService;
    @Autowired
    private ImgService imgService;
    @Autowired
    private RelationshipService relationshipService;

    @Autowired
    private JwtProvider jwtProvider;
    @Autowired
    private UserDetailsServiceImpl userDetailsService;
    @Autowired
    private AccountRepository accountRepository;



    //    ***************hiep  *********************************************************//
//    get profile page of user , @param = userId

// funtion nhan nhận vào tham số là  chính người dùng đăng nhập , tự động trả về trang cá nhân cuẩ chính account đó
//    nếu tìm thấy đúng thông tin đăng nhập sẽ trả về trang cá nhân của user

    @RequestMapping(value = {"","/list-post"}, method = RequestMethod.GET,produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<UserProfile>> getPostsByAccount(HttpServletRequest req
                                                               ) {

        String token = req.getHeader("Authorization").replace("Bearer " , "");
        Account account = accountRepository.findAccountByEmail(jwtProvider.getEmailFromToken(token));
        Long idAccount = account.getId();
       List<UserProfile> uprofileDTOS = this.profileService.findProfileUser(idAccount);
        System.out.println(uprofileDTOS);
        if (uprofileDTOS.isEmpty()) {
            return new ResponseEntity<>(uprofileDTOS,HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(uprofileDTOS, HttpStatus.OK);
    }



//    funtion  nhận request  của người dùng khi ghé thăm trang cá nhân người khác , nhận vào tham số là id của người khác
//     kiểm tra đăng nhập , lấy thông tin đăng nhập , so sánh với danh sách bạn bè
//     nếu bạn bè thì hiển thị những bài đăng của bạn bè
//    nếu ko phải bạn bè hiển thi những bài đăng ở chế độ công khai

    @RequestMapping(value = "/list-post/{id}", method = RequestMethod.GET,produces = MediaType.APPLICATION_JSON_VALUE )
    public ResponseEntity<List<UserProfile>> getAnotherProfile(HttpServletRequest req,@PathVariable(value = "id") Long idTarget
                                                              ){

        Long idAccount;
        String token = req.getHeader("Authorization").replace("Bearer" , "");
        Account account = accountRepository.findAccountByEmail(jwtProvider.getEmailFromToken(token));
        idAccount = account.getId();
        System.out.println(idAccount);
//        List<FriendListCheck> friendListCheckList=this.relationshipService.getAccountFriendList(idAccount);
        List<UserProfile> userProfile = null;
        FriendListCheck friendListCheck=this.relationshipService.checkFriend(idAccount,idTarget);
        if (friendListCheck!=null ){
            userProfile = this.profileService.findPostByUserFriend(idTarget);

            System.out.println(userProfile);
            }else {
            userProfile = this.profileService.findPostByUserNoFriend(idTarget);
            System.out.println(userProfile);
             }

        if (userProfile.isEmpty()) {
            return new ResponseEntity<>(userProfile,HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(userProfile, HttpStatus.OK);
    }
//    *************** Hết *********************************************************//

// funtion nhận tham số id người dùng trả về list danh sách ảnh của người đó

    @RequestMapping(value = "/img/{id}" , method = RequestMethod.GET)
    public ResponseEntity<List<ImgDTO>> getImgProfile(HttpServletRequest req,@PathVariable(value = "id") Long idTarget
    ){
        Long idAccount;
        String token = req.getHeader("Authorization").replace("Bearer" , "");
        Account account = accountRepository.findAccountByEmail(jwtProvider.getEmailFromToken(token));
        idAccount = account.getId();
        System.out.println(idAccount);
//        List<FriendListCheck> friendListCheckList=this.relationshipService.getAccountFriendList(idAccount);
        List<UserProfile> userProfile = null;
        FriendListCheck friendListCheck=this.relationshipService.checkFriend(idAccount,idTarget);

        List<ImgDTO> imgDTOS = this.imgService.getAllImgByUserId(idTarget);

        if (imgDTOS.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(imgDTOS, HttpStatus.OK);
    }

    @RequestMapping(value = "/img" , method = RequestMethod.GET)
    public ResponseEntity<List<ImgDTO>> getImgUser(HttpServletRequest req
    ){
        Long idAccount;
        String token = req.getHeader("Authorization").replace("Bearer" , "");
        Account account = accountRepository.findAccountByEmail(jwtProvider.getEmailFromToken(token));
        idAccount = account.getId();
        System.out.println(idAccount);
//

        List<ImgDTO> imgDTOS = this.imgService.getAllImgByUserId(idAccount);

        if (imgDTOS.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(imgDTOS, HttpStatus.OK);
    }

    @RequestMapping(value = {"/comment"}, method = RequestMethod.GET,produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<IProfileDTO>> getCommentByAccount(HttpServletRequest req
    ) {

        String token = req.getHeader("Authorization").replace("Bearer " , "");
        Account account = accountRepository.findAccountByEmail(jwtProvider.getEmailFromToken(token));
        Long idAccount = account.getId();
        List<IProfileDTO> iprofileDTOS = this.profileService.findAllDataMapping(idAccount);
        System.out.println(iprofileDTOS);
        if (iprofileDTOS.isEmpty()) {
            return new ResponseEntity<>(iprofileDTOS,HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(iprofileDTOS, HttpStatus.OK);
    }


    @RequestMapping(value = {"/comment/{id}"}, method = RequestMethod.GET,produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<IProfileDTO>> getCommentByUser(HttpServletRequest req,@PathVariable(value = "id") Long idTarget
    ) {
        Long idAccount;
        String token = req.getHeader("Authorization").replace("Bearer" , "");
        Account account = accountRepository.findAccountByEmail(jwtProvider.getEmailFromToken(token));
        idAccount = account.getId();
        System.out.println(idAccount);
//        List<FriendListCheck> friendListCheckList=this.relationshipService.getAccountFriendList(idAccount);
        List<IProfileDTO> iprofileDTOS = null;
        FriendListCheck friendListCheck=this.relationshipService.checkFriend(idAccount,idTarget);
        if (friendListCheck!=null ){
            iprofileDTOS = this.profileService.findAllPostFriendId(idTarget);

            System.out.println(iprofileDTOS);
        }else {
            iprofileDTOS = this.profileService.findAllPostIdNoFriend(idTarget);
            System.out.println(iprofileDTOS);
        }

        if (iprofileDTOS.isEmpty()) {
            return new ResponseEntity<>(iprofileDTOS,HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(iprofileDTOS, HttpStatus.OK);
    }



}
