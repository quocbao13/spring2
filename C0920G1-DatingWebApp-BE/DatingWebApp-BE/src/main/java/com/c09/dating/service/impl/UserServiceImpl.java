package com.c09.dating.service.impl;

import com.c09.dating.DTO.*;

import com.c09.dating.entity.Account;

import com.c09.dating.entity.District;
import com.c09.dating.entity.User;
import com.c09.dating.entity.UserHobby;
import com.c09.dating.repository.AccountRepository;
import com.c09.dating.repository.HobbyRepository;
import com.c09.dating.repository.UserRepository;
import com.c09.dating.service.UserService;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.Set;


@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    HobbyRepository hobbyRepository;

    //trang
    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private PasswordEncoder encoder;



    @Override
    public List<MemberDTO> getAllMembersByUserName(String userName,Integer size) {
        return this.userRepository.getAllMembersByUserName(userName, size);
    }

    @Override
    public MemberDTO getMembersByUserId(Long userId) {
        return this.userRepository.getMembersByUserId(userId);
    }

    @Override
    public BanDTO findBanByAccountId(Long accountId) {
        return this.userRepository.findBanByAccountId(accountId);
    }


    //    Thịnh tạo 02/04


    @Autowired
    private ModelMapper modelMapper;

    //   _-+-__-+-__-+-__-+-__-+-__-+-__-+-__-+-__-+-_
/*  Hieu lam service khu vuc nay
    Create by: Hieu
    Effective: Tìm User theo id user nhập vào và return lại UserNewInfoDto
    Date created: 2021-04-06
*/
    public UserNewInfoDto findUserByIdUser(Long id) {
        Optional<User> userOptional = userRepository.findUserByIdQR(id);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return setValueFromUser(user);
        } else {
            return null;
        }
    }

    /*
        Create by: Hieu
        Effective: Truyền giá trị từ User qua cho UserNewInfoDto
        Date created: 2021-04-06
    */
    public UserNewInfoDto setValueFromUser(User user) {
        UserNewInfoDto userNewInfoDto = new UserNewInfoDto();
        userNewInfoDto.setId(user.getId());
        userNewInfoDto.setFullName(user.getFullName());
        userNewInfoDto.setEducation(user.getEducation());
        userNewInfoDto.setGender(user.getGender());
        userNewInfoDto.setDescriptionUser(user.getDescriptionUser());
        userNewInfoDto.setPhone(user.getPhone());
        userNewInfoDto.setAvatar(user.getAvatar());
        userNewInfoDto.setStatusConfirm(user.getStatusConfirm());
        userNewInfoDto.setBackground(user.getBackground());
        userNewInfoDto.setJob(user.getJob());
        userNewInfoDto.setMarried(user.getMarried());
        userNewInfoDto.setDayOfBirth(user.getDayOfBirth());
        userNewInfoDto.setDatingGender(user.getDatingGender());
        userNewInfoDto.setDistrict(user.getDistrict());
        userNewInfoDto.setUserHobbySet(user.getUserHobbySet());
        return userNewInfoDto;
    }

    /*
            Create by: Hieu
            Effective:
                + Set lại giá trị cho User lấy theo id
                + Lưu các giá trị trong table UserHobby xuống trước
                + Lưu user xuống sau
            Date created: 2021-04-06
    */
    public boolean updateUserNewInfor(Long id, UserNewInforDtoSave userNewInfoDtoSave) {
        Optional<User> userOptional = userRepository.findById(id);
        boolean isChange = false;
        if (!id.equals(userNewInfoDtoSave.getId())) {
            return false;
        } else if (!userOptional.isPresent()) {
            return false;
        } else {
            User user = userOptional.get();

            isChange = user.getFullName() == null;
            if (isChange) {
                // lưu user hobby xuống database
                Set<UserHobby> userHobbySetDto = userNewInfoDtoSave.getUserHobbySet();
                for (UserHobby userHobby : userHobbySetDto) {
//                    /*
                    System.out.println("chua bi them moi hobby id = " + userHobby.getHobby().getId());
                    System.out.println("chua bi them moi user id = " + user.getId());
//                    */
                    this.userRepository.addNewHobby(userHobby.getHobby().getId(), user.getId());
                }
                // lưu user infor first time xuống database
                user = updateValueFromUserNewInfoDto(user, userNewInfoDtoSave);

                System.out.println(" Trong user service impl \n" +
                        "putmapping id = " + user.getId());
                System.out.println("fullname = " + user.getFullName());
                System.out.println("education = " + user.getEducation());
                System.out.println("gender = " + user.getGender());
                System.out.println("discription = " + user.getDescriptionUser());
                System.out.println("phone = " + user.getPhone());
                System.out.println("job = " + user.getJob());
                System.out.println("married = " + user.getMarried());
                System.out.println("date of birth = " + user.getDayOfBirth());
                System.out.println("dating gender = " + user.getDatingGender());
                System.out.println("district = " + user.getDistrict().getName());
                System.out.println("province = " + user.getDistrict().getProvince().getName());

                for (UserHobby userHobby : user.getUserHobbySet()) {
                    System.out.println("userHobby id = " + userHobby.getId() + ", hobby name = " + userHobby.getHobby().getName());
                }

                System.out.println("avatar = " + user.getAvatar());
                System.out.println("avatar url length = " + user.getAvatar().length());
                System.out.println("background = " + user.getBackground());
                System.out.println("background url length = " + user.getBackground().length());

                this.userRepository.updateUserInforFirsTime(user.getFullName(), user.getEducation(), user.getGender(), user.getDescriptionUser(), user.getPhone()
                        , user.getAvatar(), user.getStatusConfirm(), user.getBackground(), user.getJob(), user.getMarried()
                        , user.getDayOfBirth(), user.getDatingGender(), user.getDistrict()
                        , user.getId());

                return true;
            }else {
                isChange = !user.getFullName().equals(userNewInfoDtoSave.getFullName());
                if (isChange) {
                    // lưu user hobby xuống database
                    Set<UserHobby> userHobbySetDto = userNewInfoDtoSave.getUserHobbySet();
                    for (UserHobby userHobby : userHobbySetDto) {
                        System.out.println("chua bi them moi hobby id = " + userHobby.getHobby().getId());
                        System.out.println("chua bi them moi user id = " + user.getId());

                        this.userRepository.addNewHobby(userHobby.getHobby().getId(), user.getId());
                    }
                    // lưu user infor first time xuống database
                    user = updateValueFromUserNewInfoDto(user, userNewInfoDtoSave);
                    this.userRepository.updateUserInforFirsTime(user.getFullName(), user.getEducation(), user.getGender(), user.getDescriptionUser(), user.getPhone()
                            , user.getAvatar(), user.getStatusConfirm(), user.getBackground(), user.getJob(), user.getMarried()
                            , user.getDayOfBirth(), user.getDatingGender(), user.getDistrict()
                            , user.getId());

                    return true;
                } else {
                    return false;
                }
            }

        }
    }

    /*
            Create by: Hieu
            Effective:
                + Set lại user avatar url first time
            Date created: 2021-04-06
    */
    public User updateValueFromUserNewInfoDto(User user, UserNewInforDtoSave userNewInforDtoSave) {
        user.setFullName(userNewInforDtoSave.getFullName());
        user.setEducation(userNewInforDtoSave.getEducation());
        user.setGender(userNewInforDtoSave.getGender());
        user.setDescriptionUser(userNewInforDtoSave.getDescriptionUser());
        user.setPhone(userNewInforDtoSave.getPhone());
        user.setStatusConfirm(true);
        user.setAvatar(userNewInforDtoSave.getAvatar());
        user.setBackground(userNewInforDtoSave.getBackground());
        user.setJob(userNewInforDtoSave.getJob());
        user.setMarried(userNewInforDtoSave.getMarried());
        user.setDayOfBirth(userNewInforDtoSave.getDayOfBirth());
        user.setDatingGender(userNewInforDtoSave.getDatingGender());
        user.setDistrict(userNewInforDtoSave.getDistrict());
        return user;
    }

//   _-+-__-+-__-+-__-+-__-+-__-+-__-+-__-+-__-+-_

    //    cường
    @Override
    public List<MemberDTO> getALLMembers(Integer size) {
        return this.userRepository.getAllMember(size);
    }

    //    Thịnh tạo 02/04
    public List<User> getListUser() {
        return this.userRepository.findAll();
    }


//    public boolean save(User user) {
    public boolean save(Long id,UserNewInforDtoSave userNewInforDtoSave) {
        Optional<User> existingUser = userRepository.findById(userNewInforDtoSave.getId());

        if (existingUser.isPresent()) {
            User user = existingUser.get();
            Set<UserHobby> userHobbySet = userNewInforDtoSave.getUserHobbySet() ;
            for (UserHobby userHobby: userHobbySet) {
                this.userRepository.addNewHobby(userHobby.getHobby().getId(), userNewInforDtoSave.getId());
            }
            user = updateValueFromUserNewInfoDto(user
                    , userNewInforDtoSave);
            this.userRepository.editUserInfo(user.getFullName(), user.getEducation(), user.getGender(), user.getDescriptionUser(), user.getPhone()
                    , user.getAvatar(), user.getStatusConfirm(), user.getBackground(), user.getJob(), user.getMarried()
                    , user.getDayOfBirth(), user.getDatingGender(), user.getDistrict()
                    , user.getId());
            return true;
        } else {
            return false;
        }
    }

    @Override
    public User findById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    //    ------------------------------
    //khoa
    @Override
    public List<UserAndGroupDTO> findAllUserAndGroupByNameContain(String name, Integer page) {
        return userRepository.findAllUserAndGroupByNameContain(name, page);
    }

    @Override
    public List<UserAndGroupDTO> findAllUserByNameContain(String name, Integer page) {
        return userRepository.findAllUserByNameContain(name, page);
    }

    @Override
    public List<UserAndGroupDTO> findAllUserAdvanced(String name, String gender, String address, String job, String startAge, String endAge, String hobby, Integer page) {
        return userRepository.findAllUserAdvanced(name, gender, address, job, startAge, endAge, hobby, page);
    }

    //trang
    @Override
    public Account findAccountById(Long id) {
        return accountRepository.findById(id).orElse(null);
    }

    //trang
    public boolean checkOldPass(Long id, String oldPass) {
        Account account = this.findAccountById(id);
        return encoder.matches(oldPass, account.getPassword());
    }

    //trang
    @Override
    public Account saveAccount(Account account) {
        return accountRepository.save(account);
    }

    @Override
    public User findUserByIDTr(Long id) {
        return userRepository.findById(id).orElse(null);
    }


}
