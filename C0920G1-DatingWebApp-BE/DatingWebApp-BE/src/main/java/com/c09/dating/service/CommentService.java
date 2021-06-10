package com.c09.dating.service;

import com.c09.dating.entity.Comment;
//Phuc
public interface CommentService {
    void save(Comment comment);
    void delete(long id);
    Comment findById(long id);
}
