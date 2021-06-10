package com.c09.dating.controller;

import com.c09.dating.entity.Comment;
import com.c09.dating.entity.Post;
import com.c09.dating.entity.User;
import com.c09.dating.repository.CommentRepository;
import com.c09.dating.repository.PostRepository;
import com.c09.dating.repository.UserRepository;
import com.c09.dating.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/comments")
@CrossOrigin(origins = "http://localhost:4200")
public class CommentController {
    @Autowired
    private CommentService commentService;
    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private UserRepository userRepository;


//   Phuc
//    Tao comment
    @PostMapping("/create")
    public ResponseEntity<?> createComment(@RequestBody Comment comment,@RequestParam(value = "idPost") long idPost,
    @RequestParam(value = "idUser") long idUser){
        try {
            User user = userRepository.findById(idUser).orElse(null);
            Post post = postRepository.findPostId(idPost);
            comment.setPost(post);
            comment.setUser(user);
            commentService.save(comment);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

//    Phuc
//    Tao comment con
    @PostMapping("/create_parent")
    public ResponseEntity<?> createCommentParent(@RequestBody Comment comment,
                                                 @RequestParam(value = "idPost") long idPost,
                                                 @RequestParam(value = "idUser") long idUser,
                                                 @RequestParam(value = "idComment") long idCommemt){
        try {
            User user = userRepository.findById(idUser).orElse(null);
            Post post = postRepository.findPostId(idPost);
            Comment comment1 = commentRepository.findById(idCommemt).orElse(null);
            comment.setPost(post);
            comment.setUser(user);
            comment.setComment(comment1);
            commentService.save(comment);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

//    Phuc
//    Xoa comment
    @DeleteMapping("/delete/{id}")
    public void deleteComment(@PathVariable("id") long id){
        commentService.delete(id);
    }

//    Phuc
//    Sua comment
    @PutMapping("/edit/{id}")
    public ResponseEntity<?> editComment(@RequestBody Comment comment,@RequestParam(value = "idPost") long idPost,
    @RequestParam(value = "idUser") long idUser){
        try {
            User user = userRepository.findById(idUser).orElse(null);
            Post post = postRepository.findPostId(idPost);
            comment.setPost(post);
            comment.setUser(user);
            commentService.save(comment);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

//    Phuc
//    Sua comment con
    @PutMapping("/edit_parent/{id}")
    public ResponseEntity<?> editCommentParent(@RequestBody Comment comment,@RequestParam(value = "idPost") long idPost,
                                         @RequestParam(value = "idUser") long idUser,
                                               @RequestParam(value = "idComment") long idComment){
        try {
            User user = userRepository.findById(idUser).orElse(null);
            Post post = postRepository.findPostId(idPost);
            Comment comment1 = commentRepository.findById(idComment).orElse(null);
            comment.setPost(post);
            comment.setUser(user);
            comment.setComment(comment1);
            commentService.save(comment);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

//    Phuc
//    Lay idcomment
    @GetMapping("/{id}")
    public ResponseEntity<Comment> getQuestionById(@PathVariable(value = "id") long id){
        Comment comment = commentService.findById(id);
        return ResponseEntity.ok().body(comment);
    }


}
