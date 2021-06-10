package com.c09.dating.repository;

import com.c09.dating.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public interface DatingRepository extends JpaRepository<User, Long> {

    @Query(value = "select * from user " +
            " join district on user.district_id = district.id" +
            " join province on district.province_id = province.id" +
            " join user_hobby on user.id = user_hobby.user_id" +
            " join hobby on hobby.id = user_hobby.hobby_id" +
            " where user.gender = ? and province.name = ?", nativeQuery = true)
    List<User> getAllUserByGenderAndProvince(String gender, String idProvince);

    @Query(value = "select * from user " +
            " join district on user.district_id = district.id" +
            " join province on district.province_id = province.id" +
            " join user_hobby on user.id = user_hobby.user_id" +
            " join hobby on hobby.id = user_hobby.hobby_id" +
            " where user.gender = ?", nativeQuery = true)
    List<User> getAllUserByGender(String gender);

    @Query(value = "select * from user u " +
            " join district on u.district_id = district.id" +
            " join province on district.province_id = province.id" +
            " where u.id = ?1", nativeQuery = true)
    User getUserById(Long id);
}
