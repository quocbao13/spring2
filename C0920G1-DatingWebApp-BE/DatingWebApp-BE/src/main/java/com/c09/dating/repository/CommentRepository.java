package com.c09.dating.repository;

import com.c09.dating.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment,Long> {
    //Phúc
    //Lấy comment đầu tiên
    @Query(value = "select * from comment where comment_parent_id is null", nativeQuery = true)
    List<Comment> findListCommentFirst();

    //Phúc
    @Query(value = "select e from Comment e where e.comment = ?1")
    List<Comment> findParentComment();

}
