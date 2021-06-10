package com.c09.dating.controller;


import com.c09.dating.DTO.PostDTOInterfaceOfKhanh;
import com.c09.dating.DTO.PostDtoOfKhanh;
import com.c09.dating.entity.Img;
import com.c09.dating.entity.Post;
import com.c09.dating.repository.ImgRepository;
import com.c09.dating.repository.PostRepository;

import com.c09.dating.entity.Post;
import com.c09.dating.service.PostService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(value = "/api/posts")
public class PostController {
    //khanh
    @Autowired
    PostRepository postRepository;
    //khanh
    @Autowired
    ImgRepository imgRepository;
    //Phúc
    @Autowired
    private PostService postService;

    //khanh
    @GetMapping(value = "/list")
    public ResponseEntity<List<PostDTOInterfaceOfKhanh>> showList(){
        List<PostDTOInterfaceOfKhanh> contents = postRepository.getALL();
        return new ResponseEntity<>(contents, HttpStatus.OK);
    }

    //khanh
    @PostMapping(value = "/savePost")
    public ResponseEntity savePost(@RequestBody PostDtoOfKhanh postDTO){
        System.out.println(postDTO.getImg());
        Post content = new Post();
        content.setUser(postDTO.getUser());
        content.setGroup(postDTO.getGroup());
        content.setContent(postDTO.getContent());
        content.setCreateDate(postDTO.getCreateDate());
        content.setStatus(postDTO.getStatus());
        postRepository.save(content);
        Long id = postRepository.getMaxId().getId();
        Post content1 = postRepository.getContent(id);
        Img img = new Img();
        img.setUrl(postDTO.getImg());
        img.setPost(content1);
        imgRepository.save(img);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //khanh
    @GetMapping(value = "/findById/{id}")
    public ResponseEntity<PostDTOInterfaceOfKhanh> showList(@PathVariable Long id){
        PostDTOInterfaceOfKhanh contents = postRepository.getById(id);
        return new ResponseEntity<>(contents, HttpStatus.OK);
    }
    //khanh
    @PutMapping(value = "/editPost/{idPost}")
    public ResponseEntity editPost(@RequestBody PostDtoOfKhanh postDTO, @PathVariable Long idPost){
        System.out.println(postDTO.getImg());
        Post content = new Post();
        content.setId(idPost);
        content.setUser(postDTO.getUser());
        content.setContent(postDTO.getContent());
        content.setCreateDate(postDTO.getCreateDate());
        content.setStatus(postDTO.getStatus());
        postRepository.save(content);
        Img img = imgRepository.getImg(idPost);
        img.setId(img.getId());
        img.setUrl(postDTO.getImg());
        img.setPost(content);
        imgRepository.save(img);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //Phúc
    @GetMapping(value = "/list1")
    public ResponseEntity<List<Post>> getAllPost(@RequestParam("size") long size){
        try {
            List<Post> posts;
            posts = postRepository.getAllPost(size);
            return new ResponseEntity<>(posts, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //Phúc
    @GetMapping("/list/{id}")
    public ResponseEntity<Post> findPostId(@PathVariable(value = "id") Long id){
        try {
            Post post = postService.findPostId(id);
            return ResponseEntity.ok().body(post);
        } catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
