package com.c09.dating.service;

import com.c09.dating.DTO.*;

import com.c09.dating.entity.Account;
import com.c09.dating.entity.User;

import java.util.List;


public interface UserService {
    //    cường
    List<MemberDTO> getALLMembers(Integer size);
    List<MemberDTO> getAllMembersByUserName(String userName,Integer size);
    MemberDTO getMembersByUserId(Long userId);
    BanDTO findBanByAccountId(Long accountId);
//--------------------------------------------------------------------------------------------------------------------//

    //    Thinh tạo 02/04
    boolean save(Long id,UserNewInforDtoSave userNewInforDtoSave);

    User findById(Long id);
//    ----------------------- ----------A
    /*  Hieu
     */

    //   _-+-__-+-__-+-__-+-__-+-__-+-__-+-__-+-__-+-_
/*  Hieu lam query khu vuc nay
    Create by: Hieu
    Effective: Tìm User theo id user nhập vào và return lại UserNewInfoDto
    Date created: 2021-04-06
*/
    UserNewInfoDto findUserByIdUser(Long id);

    /*
        Create by: Hieu
        Effective: Trả lại list user
        Date created: 2021-04-06
    */
    List<User> getListUser();

    /*
        Create by: Hieu
        Effective: Update user vào database
        Date created: 2021-04-06
    */
    boolean updateUserNewInfor(Long id, UserNewInforDtoSave userNewInforDtoSave);


//   _-+-__-+-__-+-__-+-__-+-__-+-__-+-__-+-__-+-_

//    ----------------------- ----------



    //    ----------------------- ----------


    //khoa
    List<UserAndGroupDTO> findAllUserAndGroupByNameContain(String name,Integer page);

    List<UserAndGroupDTO> findAllUserByNameContain(String name, Integer page);

    List<UserAndGroupDTO> findAllUserAdvanced(String name,String gender,String address, String job, String startAge,String endAge, String hobby,Integer page);

//---------------------


    //trang
    public Account findAccountById(Long id);
    public boolean checkOldPass(Long id, String oldPass);
    public Account saveAccount(Account account);
    public User findUserByIDTr(Long id);


}