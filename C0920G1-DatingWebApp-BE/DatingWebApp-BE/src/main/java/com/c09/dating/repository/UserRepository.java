package com.c09.dating.repository;

import com.c09.dating.DTO.BanDTO;
import com.c09.dating.DTO.MemberDTO;
import com.c09.dating.DTO.UserAndGroupDTO;
import com.c09.dating.entity.District;

import com.c09.dating.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;


@Repository
@Transactional
public interface UserRepository extends JpaRepository<User, Long> {
    User findByAccounts_Id(Long id);

    /*cường
   -phương thức lấy danh sách thành viên*/
    @Query(value = "select account.email as email,\n" +
            "            user.id as userId,\n" +
            "            user.avatar as avatar, \n" +
            "            user.full_name as fullName,\n" +
            "            user.phone as phone, \n" +
            "            count(report.id) as numOfViolations,\n" +
            "            ban.status_lock as statusLock,ban.date_un_ban as dateUnBan from account\n" +
            "\t\t\tleft join user on account.id= user.account_id\n" +
            "            left join report on report.user_id=user.id\n" +
            "            left join ban on ban.account_id=account.id\n" +
            "            group by user.account_id order by user.full_name limit ? \n", nativeQuery = true)
    List<MemberDTO> getAllMember(Integer size);

    //    find member by full name containing
    @Query(value =  "select account.email as email,\n" +
            "            user.id as userId,\n" +
            "            user.avatar as avatar, \n" +
            "            user.full_name as fullName,\n" +
            "            user.phone as phone, \n" +
            "            count(report.id) as numOfViolations,\n" +
            "            ban.status_lock as statusLock,ban.date_un_ban as dateUnBan from account\n" +
            "\t\t\tleft join user on account.id= user.account_id\n" +
            "            left join report on report.user_id=user.id\n" +
            "            left join ban on ban.account_id=account.id\n" +
            "            group by user.account_id having user.full_name like %?1% order by user.full_name limit ?2 \n", nativeQuery = true)
    List<MemberDTO> getAllMembersByUserName(String userName, Integer size);

    //    find By ID
    @Query(value = "select account.email as email,\n" +
            "            user.id as userId, user.avatar as avatar,\n" +
            "            user.full_name as fullName, user.phone as phone,\n" +
            "         count(report.id) as numOfViolations from account\n" +
            "            left join user on account.id= user.account_id\n" +
            "            left join report on report.user_id=user.id\n" +
            "            where user .id=?", nativeQuery = true)
    MemberDTO getMembersByUserId(Long userId);

    @Query(value = "select ban.account_id as accountId, ban.status_lock as statusLock from ban where ban.account_id=?", nativeQuery = true)
    BanDTO findBanByAccountId(Long accountId);
//--------------------------------------------------------------------------------------------------------------------//

    //khoa tìm kiếm user và group theo tên
    @Query(value = "(select user.id as 'id', user.full_name as 'name', user.avatar as 'imgAvatar'," +
            " 0 'status',(year(localtime())-year(user.date_of_birth)) as 'age' from user" +
            " where user.full_name like %?1% " +
            " union " +
            " select group_user.id as 'id', group_user.`name` as 'name', group_user.background_group as 'imgAvatar'," +
            " 1 'status',group_user.`name` as 'age' from group_user" +
            " where group_user.`name` like %?1%)" +
            " order by RAND()" +
            " limit ?2 ", nativeQuery = true)
    List<UserAndGroupDTO> findAllUserAndGroupByNameContain(String name, Integer page);
    //khoa tìm kiếm user theo tên
    @Query(value = "select user.id as 'id', user.`full_name` as 'name',user.avatar as 'imgAvatar'," +
            " 0 'status',(year(localtime())-year(user.date_of_birth)) as 'age' from user" +
            " where user.`full_name` like %?1%" +
            " order by RAND()" +
            " limit ?2 ", nativeQuery = true)
    List<UserAndGroupDTO> findAllUserByNameContain(String name, Integer page);
    // khoa tìm kiếm nâng cao
    @Query(value = "select distinct user.id as 'id', user.`full_name` as 'name', user.avatar as 'imgAvatar'," +
            " 0 'status',(year(localtime())-year(user.date_of_birth)) as 'age' from user" +
            " left join user_hobby on user.id = user_hobby.user_id" +
            " left join hobby on user_hobby.hobby_id = hobby.id" +
            " left join district on user.district_id = district.id" +
            " left join province on district.province_id = province.id" +
            " where ifnull(user.full_name,'') like %?1%" +
            " and ifnull(user.gender,'') like ?2%" +
            " and ifnull(province.name,'') like %?3%" +
            " and ifnull(user.job,'') like %?4%" +
            " and (ifnull(YEAR (user.date_of_birth),'1950') >= ?5 and ifnull(YEAR (user.date_of_birth),'2021') <=?6)" +
            " and ifnull(hobby.name,'') like %?7%" +
            " order by RAND()" +
            " limit ?8", nativeQuery = true)
    List<UserAndGroupDTO> findAllUserAdvanced(String name, String gender, String address, String job, String startAge, String endAge, String hobby,Integer page);


/*_-+-__-+-__-+-__-+-__-+-__-+-__-+-_
    Phần làm query của Hieu, làm ơn không chỉnh sửa
*/
    /*  hieu tim kiem user theo id user
     */

/*
    Create by: Hieu
    Effective:
        + Lấy user theo id trong database
        + Nhận lại từ database đối tượng là Optional<User>
    Date created: 2021-04-11
*/

    @Query("SELECT user FROM User user WHERE user.id = ?1")
    Optional<User> findUserByIdQR(Long id);

/*
    Create by: Hieu
    Effective:
        + Thêm mới 2 giá trị hobby id và user id vào table user_hobby trong database
    Date created: 2021-04-11
*/
    @Modifying
    @Query(value = "INSERT INTO user_hobby (hobby_id, user_id) values (:hobbyId, :userId)", nativeQuery = true)
    void addNewHobby(@Param("hobbyId") Long hobbyId, @Param("userId") Long userId);

/*
    Create by: Hieu
    Effective:
        + Thêm các thông tin lần đầu user vào bảng user, ngoài 2 giá trị đã có là user id và account id
    Date created: 2021-04-11
*/

    @Modifying
    @Query("UPDATE User user " +
            "SET user.fullName = ?1, user.education = ?2, user.gender = ?3, user.descriptionUser = ?4, user.phone = ?5," +
            "   user.avatar= ?6, user.statusConfirm = ?7, user.background = ?8, user.job = ?9, user.married = ?10, " +
            "   user.dayOfBirth = ?11, user.datingGender = ?12, user.district = ?13 " +
            "WHERE user.id = ?14")
    void updateUserInforFirsTime(String fullName, String education, String gender, String descriptionUser, String phone
            , String avatar, Boolean statusConfirm, String background, String job, String married
            , LocalDate dayOfBirth, String datingGender, District district
            , Long id);

    /*
        Create by: Hieu
        Effective:
            + Thêm avatar url vào database
        Date created: 2021-04-11
    */
    @Modifying
    @Query("UPDATE User user " +
            "SET user.avatar = ?1" +
            "WHERE user.id = ?2")
    void updateUserAvatarFirsTime(String avatar, Long id);

    /*
    Create by: Hieu
    Effective:
        + Thêm background url vào database
    Date created: 2021-04-11
*/


    @Modifying
    @Query("UPDATE User user " +
            "SET user.fullName = ?1, user.education = ?2, user.gender = ?3, user.descriptionUser = ?4, user.phone = ?5," +
            "   user.avatar= ?6, user.statusConfirm = ?7, user.background = ?8, user.job = ?9, user.married = ?10, " +
            "   user.dayOfBirth = ?11, user.datingGender = ?12, user.district = ?13 " +
            "WHERE user.id = ?14")
    void editUserInfo(String fullName, String education, String gender, String descriptionUser, String phone
            , String avatar, Boolean statusConfirm, String background, String job, String married
            , LocalDate dayOfBirth, String datingGender, District district
            , Long id);

    @Modifying
    @Query("UPDATE User user " +
            "SET user.background = ?1" +
            "WHERE user.id = ?2")
    void updateUserBackgroundFirsTime(String background, Long id);


}
