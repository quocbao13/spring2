package com.c09.dating.repository;

import com.c09.dating.DTO.ListGroupDTO;
import com.c09.dating.DTO.UserAndGroupDTO;
import com.c09.dating.entity.Group;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public interface GroupRepository extends JpaRepository<Group,Long> {
//Thế Anh lấy ra danh sách nhóm
//    @Query(value = "select group_user.id,\n" +
//            "    `name` as 'name',\n" +
//            "    background_group as backgroundGroup,\n" +
//            "    count(*) as countUser\n" +
//            "from group_user\n" +
//            " join group_detail on group_user.id = group_detail.group_id\n" +
//            "    join `user` on group_detail.user_id = `user`.id where group_user.delete_flag =b'1'\n " +
//        "group by `group_user`.id \n",countQuery= "SELECT count(*) " +
//            "from group_user\n", nativeQuery = true)
    @Query(value = "select * from group_user where group_user.delete_flag= b'1' order by id ASC ", nativeQuery = true)
    Page<Group> findAllGroup(Pageable pageable);

//    Thế Anh Tìm kiếm theo tên nhóm
    @Query(value = "select group_user.id,\n" +
            "    `name` as 'name',\n" +
            "    background_group as backgroundGroup,\n" +
            "    count(*) as countUser\n" +
            "from group_user\n" +
            " join group_detail on group_user.id = group_detail.group_id\n" +
            "    join `user` on group_detail.user_id = `user`.id where group_user.name LIKE %:inputSearch% AND group_user.delete_flag =b'1'\n " +
            "group by `group_user`.id \n",countQuery= "SELECT count(*) " +
            "from group_user ", nativeQuery = true)
    Page<ListGroupDTO> findAllGroupByName(Pageable pageable, @Param("inputSearch") String inputSearch);


    //khoa tìm kiếm group theo tên
    @Query(value = " select group_user.id as 'id', group_user.`name` as 'name', group_user.background_group as 'imgAvatar', 1 'status' from group_user" +
            " where group_user.`name` like %?1%" +
            " order by RAND()" +
            " limit ?2",nativeQuery = true)
    List<UserAndGroupDTO> findAllGroupUserByNameContain(String name,Integer page);

//    Thế anh tìm kiếm nhóm theo id
    @Query(value = "SELECT g FROM Group g WHERE g.id = ?1")
    Group findById(long id);


}
