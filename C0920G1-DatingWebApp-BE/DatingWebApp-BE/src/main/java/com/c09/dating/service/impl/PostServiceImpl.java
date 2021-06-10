package com.c09.dating.service.impl;

import com.c09.dating.entity.Post;
import com.c09.dating.repository.PostRepository;
import com.c09.dating.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostServiceImpl implements PostService {
    @Autowired
    PostRepository postRepository;


    @Override
    public List<Post> getListPost(long size) {
        return postRepository.getAllPost(size);
    }

    //Phúc
    @Override
    public Post findPostId(long id) {
        return postRepository.findPostId(id);
    }
}
