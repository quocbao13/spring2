package com.c09.dating.service.impl;

import com.c09.dating.entity.Comment;
import com.c09.dating.repository.CommentRepository;
import com.c09.dating.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
//Phuc
@Service
public class CommentServiceImpl implements CommentService {
    @Autowired
    CommentRepository commentRepository;
    @Override
    public void save(Comment comment) {
        commentRepository.save(comment);
    }

    @Override
    public void delete(long id) {
        commentRepository.deleteById(id);
    }

    @Override
    public Comment findById(long id) {
        return commentRepository.findById(id).get();
    }
}
