package com.c09.dating.repository;

import com.c09.dating.DTO.IdDtoOfKhanh;
import com.c09.dating.DTO.PostDTOInterfaceOfKhanh;
import com.c09.dating.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post,Long> {

    //khanh
    @Query(value = "select max(post.id) as id from Post post")
    IdDtoOfKhanh getMaxId();

    //khanh
    @Query(value = "select post from Post post where post.id = ?1")
    Post getContent(Long id);

    //khanh
    @Query(value = "select content.id as id, content.content as content1, content.status as status, " +
            "content.createDate as createDate, img.url as img1, user.avatar as userAvatar," +
            " user.fullName as userName " +
            "from Post content " +
            "join Img img on img.post.id = content.id " +
            "join User user on user.id = content.user.id " + "order by id DESC")
    List<PostDTOInterfaceOfKhanh> getALL();

    //khanh
    @Query(value = "select content.id as id, content.content as content1, content.status as status, " +
            "content.createDate as createDate, img.url as img1, user.avatar as userAvatar, user.fullName as userName " +
            "from Post content join Img img on img.post.id = content.id " +
            "join User user on user.id = content.user.id " +
            "where content.id = ?1")
    PostDTOInterfaceOfKhanh getById(Long id);

    //Phúc
    //Lấy tất cả các post
    @Query(value = "select * from post order by id DESC limit ?1", nativeQuery = true)
    List<Post> getAllPost(long size);

    //Phúc
    //Lấy id post
    @Query(value = "select e from Post e where e.id = ?1")
    Post findPostId(long id);

    //Phúc
    //Lay post phan trang
    @Query(value = "select * from post order by id DESC", nativeQuery = true)
    Page<Post> getAllPostPage(Pageable pageable);
}
