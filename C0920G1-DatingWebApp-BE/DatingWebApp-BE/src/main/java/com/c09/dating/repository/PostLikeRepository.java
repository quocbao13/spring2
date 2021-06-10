package com.c09.dating.repository;

import com.c09.dating.entity.Post;
import com.c09.dating.entity.PostLike;
import com.c09.dating.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public interface PostLikeRepository extends JpaRepository<PostLike, Long> {

    @Modifying
    @Transactional
    @Query(value = "insert into post_like (post_id , user_id) values(:post_id,:user_id)", nativeQuery = true)
    void createPostLike(@Param("post_id") Long post_id,
                        @Param("user_id") Long user_id);


    @Modifying
    @Transactional
    @Query(value = "delete from post_like where post_like.user_id = ?1" , nativeQuery = true)
    void deletePostLikeUserId(Long id);

    @Query(value = "select * from post_like where post_like.user_id = ?1 and post_id = ?2" , nativeQuery = true)
    PostLike findbyId(Long user_id , Long post_id);
}
