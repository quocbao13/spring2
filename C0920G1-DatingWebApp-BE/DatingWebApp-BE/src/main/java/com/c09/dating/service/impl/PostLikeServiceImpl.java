package com.c09.dating.service.impl;

import com.c09.dating.entity.PostLike;
import com.c09.dating.repository.PostLikeRepository;
import com.c09.dating.service.PostLikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PostLikeServiceImpl implements PostLikeService {
    @Autowired
    PostLikeRepository postLikeRepository;

    @Override
    public void save(Long user_id, Long post_id) {
        if (findById(user_id, post_id) != null) {
            deletePostLikeUserId(findById(user_id,post_id).getId());
        } else {
            this.postLikeRepository.createPostLike(user_id , post_id);
        }
    }

    @Override
    public void deletePostLikeUserId(Long id) {
        this.postLikeRepository.deletePostLikeUserId(id);
    }

    @Override
    public PostLike findById(Long user_id, Long post_id) {
        PostLike postLike = this.postLikeRepository.findbyId(user_id, post_id);
        if (postLike != null) {
            return postLike;
        } else {
            return null;
        }
    }
}
