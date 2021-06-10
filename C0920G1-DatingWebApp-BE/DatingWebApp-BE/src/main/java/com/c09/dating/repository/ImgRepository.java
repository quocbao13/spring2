package com.c09.dating.repository;

import com.c09.dating.DTO.ImgDTO;
import com.c09.dating.entity.Img;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImgRepository extends JpaRepository<Img,Long> {
    //Khanh
    @Query(value = "SELECT coalesce(max(id), 0) FROM Img ")
    public Long getMaxId();

    //khanh
    @Query(value = "select img from Img img where img.post.id = ?1")
    Img getImg(Long id);

//    Img findByContentId(Long id);


// cua hiep lay tat ca anh theo user id
    @Query(value ="SELECT  img.id AS idImg,\n" +
            "              img.url AS urlImg,\n" +
            "              img.message_id AS imgMess,\n" +
            "               img.post_id AS imdIdPost,\n" +
            "             user.id AS userID,\n" +
            "             account.id AS accountID,\n" +
            "             user.avatar as userAvatar,\n" +
            "             user.background as userBackground,user.full_name as userFullname\n" +
            "          FROM\n" +
            "             img\n" +
            "                  JOIN\n" +
            "            post ON post.id = img.post_id\n" +
            "                 JOIN\n" +
            "             user ON user.id = post.user_id\n" +
            "                JOIN\n" +
            "             account ON account.id = user.account_id\n" +
            "         WHERE\n" +
            "           user.id = ?1\n" +
            "        ORDER BY post.create_date", nativeQuery = true)
    List<ImgDTO> findAllImgByUserId(Long UserId);
}
