package com.c09.dating.controller;

import com.c09.dating.entity.Post;
import com.c09.dating.entity.PostLike;
import com.c09.dating.entity.User;
import com.c09.dating.repository.PostLikeRepository;
import com.c09.dating.repository.PostRepository;
import com.c09.dating.repository.UserRepository;
import com.c09.dating.service.PostLikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/like")
@CrossOrigin(origins = "http://localhost:4200")
public class PostLikeController {

    @Autowired
    PostLikeService postLikeService;
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PostLikeRepository postLikeRepository;


    @GetMapping("post/findById")
    public ResponseEntity<PostLike> finByIdPost(@RequestParam Long user_id, @RequestParam Long post_id) {
        this.postLikeService.save(user_id, post_id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/create")
    public ResponseEntity<?> createLike(@RequestParam long idUser, @RequestParam long idPost){
        try {
            PostLike postLike = new PostLike();
            User user = userRepository.findById(idUser).orElse(null);
            Post post = postRepository.findPostId(idPost);
            postLike.setPost(post);
            postLike.setUser(user);
            System.out.println(idUser);
            System.out.println(idPost);
            System.out.println(postLike);
            postLikeRepository.save(postLike);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/delete/{id}")
    public void deleteLike(@PathVariable(value = "id") long id){
        System.out.println(id);
        postLikeRepository.deleteById(id);
    }
}
