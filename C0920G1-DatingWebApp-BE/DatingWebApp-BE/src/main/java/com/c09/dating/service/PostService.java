package com.c09.dating.service;

import com.c09.dating.entity.Post;

import java.util.List;

public interface PostService {
    //Phúc
    //Lấy list post
    List<Post> getListPost(long size);
    //Phúc
    //Lấy post theo id
    Post findPostId(long id);
}
