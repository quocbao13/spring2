package com.c09.dating.repository;

import com.c09.dating.entity.GroupDetail;
import com.c09.dating.entity.Post;
import com.c09.dating.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public interface GroupDetailRepository extends JpaRepository<GroupDetail, Long> {
    @Query(value = "select u from User u inner join GroupDetail g on u.id = g.user.id where g.group.id = ?1")
    List<User> getAllUserInGroup(Long id);

    //@Query(value = "select count(g.user.id) from User u inner join GroupDetail g on u.id = g.user.id where g.group.id = ?1 group by g.group.id)
    @Query(value = "select u from User u inner join Group g on u.id = g.user.id where g.id = ?1")
    User getAdminOfGroup(Long id);

    @Modifying
    @Query(value = "delete from GroupDetail g WHERE g.user.id = ?1 and g.group.id = ?2")
    void outGroup(Long idUser, Long idGroup);

    @Query(value = "INSERT INTO GroupDetail (group_id, user_id) values (:idGroup,:idUser)", nativeQuery = true)
    void joinGroup(@Param("idUser") Long idUser, @Param("idGroup") Long idGroup);

    @Query(value = "select p from Post p where p.group.id = ?1 order by p.group.id DESC")
    List<Post> getAllPostInGroup(Long id);
}

