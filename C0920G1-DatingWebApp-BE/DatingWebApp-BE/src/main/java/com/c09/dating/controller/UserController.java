package com.c09.dating.controller;

import com.c09.dating.DTO.UserNewInfoDto;

import com.c09.dating.entity.*;

import com.c09.dating.repository.UserRepository;

import com.c09.dating.DTO.UserNewInforDtoSave;
import com.c09.dating.entity.Hobby;
import com.c09.dating.entity.User;
import com.c09.dating.service.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.c09.dating.entity.District;
import com.c09.dating.entity.Province;

import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import java.util.ArrayList;

import java.util.HashMap;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/profile/")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProvinceService provinceService;
    @Autowired
    private DistrictService districtService;
    @Autowired
    private HobbyService hobbyService;
    @Autowired
    private PasswordEncoder encoder;
    @Autowired
    private AccountService accountService;
    @Autowired
    private UserHobbyService userHobbyService;


//   _-+-__-+-__-+-__-+-__-+-__-+-__-+-__-+-__-+-_
/*  Hieu lam controller khu vuc nay
    Create by: Hieu
    Effective: nhận id từ front end đưa tới và tìm, rồi trả lại UserNewInfoDto
    Date created: 2021-04-06
*/

    @GetMapping("{id}/new-info")
    public ResponseEntity<UserNewInfoDto> getUserByUserId(@PathVariable(value = "id") Long id) {
        System.out.println("id user = " + id);
        UserNewInfoDto userNewInfoDto = userService.findUserByIdUser(id);
        if (userNewInfoDto != null) {
            System.out.println("userDTO = " + userNewInfoDto.getFullName());
            return new ResponseEntity<>(userNewInfoDto, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    /*
        Create by: Hieu
        Effective: Nhận id, và dữ liệu UserNewInfoDto đã cập nhật từ front end đưa tới, rồi lưu vào database nếu hợp lệ
        Date created: 2021-04-06
    */
    @PutMapping("{id}/new-info")
    public ResponseEntity<Void> updateNewInforUser(@PathVariable(value = "id") Long id
            , @Valid @RequestBody UserNewInforDtoSave userNewInforDtoSave) {
        System.out.println("putmapping id = " + userNewInforDtoSave.getId());
        System.out.println("fullname = " + userNewInforDtoSave.getFullName());
        System.out.println("education = " + userNewInforDtoSave.getEducation());
        System.out.println("gender = " + userNewInforDtoSave.getGender());
        System.out.println("discription = " + userNewInforDtoSave.getDescriptionUser());
        System.out.println("phone = " + userNewInforDtoSave.getPhone());
        System.out.println("job = " + userNewInforDtoSave.getJob());
        System.out.println("married = " + userNewInforDtoSave.getMarried());
        System.out.println("date of birth = " + userNewInforDtoSave.getDayOfBirth());
        System.out.println("dating gender = " + userNewInforDtoSave.getDatingGender());
        System.out.println("district = " + userNewInforDtoSave.getDistrict().getName());
        System.out.println("province = " + userNewInforDtoSave.getDistrict().getProvince().getName());

        for (UserHobby userHobby : userNewInforDtoSave.getUserHobbySet()) {
            System.out.println("userHobby id = " + userHobby.getId() + ", hobby name = " + userHobby.getHobby().getName());
        }

        System.out.println("avatar = " + userNewInforDtoSave.getAvatar());
        System.out.println("avatar url length = " + userNewInforDtoSave.getAvatar().length());
        System.out.println("background = " + userNewInforDtoSave.getBackground());
        System.out.println("background url length = " + userNewInforDtoSave.getBackground().length());

        if(userService.updateUserNewInfor(id, userNewInforDtoSave)){
            System.out.println(1111111);
            return new ResponseEntity<>(HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

/*
        Create by: Hieu
        Effective: Khi validate dữ liệu không hợp lệ thì sẽ gửi lại error message lên trình duyệt
        Date created: 2021-04-07
*/
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

/*
    Create by: Hieu
    Effective: Lấy api hobby từ database truyền lên front end
    Date created: 2021-04-07
*/
    @GetMapping(value = "/hobby")
    public ResponseEntity<List<Hobby>> getHobbyList() {
        try {
            return new ResponseEntity<>(hobbyService.findAllHobby(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

/*
        Create by: Hieu
        Effective: Lấy api district từ database truyền lên front end
        Date created: 2021-04-07
*/
    @GetMapping(value = "/district")
    public ResponseEntity <List<District>> getAllDistrict() {
        try {
            return new ResponseEntity<>(districtService.getAll(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

//   _-+-__-+-__-+-__-+-__-+-__-+-__-+-__-+-__-+-_

    //Thịnh tạo 04/04 cấm  xóa,ai xóa nộp 50k
    @PutMapping(value = "/{id}/edit-info")

//    public ResponseEntity<Void> editUser(@Valid @RequestBody User user,@PathVariable(value = "id") Long id){
    public ResponseEntity<Void> editUser(@Valid @RequestBody UserNewInforDtoSave userNewInforDtoSave,@PathVariable(value = "id") Long id){
        try {
            if (!userNewInforDtoSave.getId().equals(id)){
                return  new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            } else if (userService.save(id,userNewInforDtoSave)){

                return new ResponseEntity<>(HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping(value = "/{id}/district")
    public ResponseEntity <List<District>> findDistrictByProvinceId(@PathVariable(value = "id") Long id) {
        try {
            return new ResponseEntity<>(districtService.findByProvinceId(id), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

    @GetMapping(value = "/province")
    public ResponseEntity<List<Province>> getProvinceList() {
        try {
            return new ResponseEntity<>(provinceService.getAll(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

    @GetMapping(value = "/{id}/edit-info")
    public ResponseEntity<User> findUserByIdTh(@PathVariable(value = "id") Long id) {
        try {
            return new ResponseEntity<>(userService.findUserByIDTr(id), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

    @GetMapping(value = "/get-account")
    public ResponseEntity<List<Account>> getAll() {
        try {
            return new ResponseEntity<>(accountService.getAll(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }


    //==============================================
    //trang
    @PutMapping("/setupStatusUserSetting/{id}")
    public void setupStatusUserSetting(@PathVariable("id") Long id, @RequestBody String status) {
        User user = userService.findUserByIDTr(id);
        user.setStatsUserSetting(status);
        System.out.println(user.getStatsUserSetting());
        userRepository.save(user);
    }

    //trang
    @PutMapping("/setupStatus/{id}")
    public void setupStatus(@PathVariable("id") Long id, @RequestBody String status) {
        User user = userService.findUserByIDTr(id);
        user.setStatusOnOff(status);
        System.out.println(user);
        userRepository.save(user);
        System.out.println(user.getStatusOnOff());
    }

    //trang
    @GetMapping("/getStatusUserSetting/{id}")
    public ResponseEntity<List<String>> getStatusUserSetting(@PathVariable("id") Long id) {
        try {
            User user = userService.findUserByIDTr(id);
            String status = user.getStatsUserSetting();
            List<String> status1 = new ArrayList<>();
            status1.add(status);
            return ResponseEntity.ok().body(status1);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //trang
    @PutMapping("/changePass/{id}")
    public ResponseEntity<Integer> changePass(@PathVariable("id") Long id, @RequestBody String password) {
        try {
            Account account = userService.findAccountById(id);
            String[] arr = password.split(",");
            String oldPass = arr[0];
            String newPass = arr[1];
            System.out.println(oldPass);
            System.out.println(newPass);
            boolean checkOldPass = userService.checkOldPass(id, oldPass);
            if (checkOldPass) {
                account.setPassword(encoder.encode(newPass));
                userService.saveAccount(account);
                System.out.println("ok");
                return ResponseEntity.ok().body(1);
            } else {
                System.out.println("notOk");
                return ResponseEntity.ok().body(2);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //trang
    @GetMapping("/getAvatar/{id}")
    public ResponseEntity<List<String>> getAvatar(@PathVariable("id") Long id){
        try {
            User user = userService.findUserByIDTr(id);
            String avatar = user.getAvatar();
            List<String> status1 = new ArrayList<>();
            status1.add(avatar);
            return ResponseEntity.ok().body(status1);
        } catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //trang
    @PutMapping("/updateAvatar/{id}")
    public void updateAvatar(@PathVariable("id") Long id,@RequestBody String img){
        User user = userService.findUserByIDTr(id);
        user.setAvatar(img.replace("undefined/", "undefined%2F"));
        userRepository.save(user);
    }

}





