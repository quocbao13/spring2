package com.c09.dating.service;

import com.c09.dating.entity.PostLike;

public interface PostLikeService {
    void save(Long user_id, Long post_id);
    void deletePostLikeUserId(Long id);
    PostLike findById(Long user_id , Long post_id);
}
