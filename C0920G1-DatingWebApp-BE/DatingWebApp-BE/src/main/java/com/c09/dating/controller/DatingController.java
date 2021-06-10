package com.c09.dating.controller;
import com.c09.dating.DTO.ListUserRecommendSystemDTO;
import com.c09.dating.DTO.ListUserRecommendToShowDTO;
import com.c09.dating.entity.DisLikeRecommend;
import com.c09.dating.entity.Hobby;
import com.c09.dating.service.DatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(value = "dating")
public class DatingController {

    @Autowired
    private DatingService datingService;

//    Display list user by gender and province
    @GetMapping(value = "/list/{id}")
    public ResponseEntity<List<ListUserRecommendSystemDTO>> getAllUserByGenderAndProvince(@PathVariable("id") Long id) {
        ListUserRecommendSystemDTO user = datingService.getUserById(id);
        List<ListUserRecommendSystemDTO> users = datingService.getAllUserByGenderAndProvince(user.getDatingGender()
                                                                                            , user.getProvince(), id);
        users.remove(user);
        users.removeIf(l -> l.getUserId().equals(user.getUserId()));
        int count = 1;
        for (int i = 1; i < users.size(); i++){
            if (users.get(i).getUserId().equals(users.get(i - 1).getUserId())){
                continue;
            }
            count++;
        }
        if (count < 5) {
            List<ListUserRecommendSystemDTO> userByGender = datingService.getAllUserByGender("Male", id);
            userByGender.removeIf(l -> l.getUserId().equals(user.getUserId()));
            users.addAll(userByGender);
        }
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

//    Display list hobby by id of login user
    @GetMapping(value = "/{id}")
    public ResponseEntity<List<Hobby>> getHobbyById(@PathVariable("id") Long id) {
        List<Hobby> hobbies = datingService.getHobbyOfUserById(id);
        if (hobbies == null) {
            return new ResponseEntity<>(null, HttpStatus.OK);
        }
        return new ResponseEntity<>(datingService.getHobbyOfUserById(id), HttpStatus.OK);
    }

//    Display login user
    @GetMapping(value = "/user/{id}")
    public ResponseEntity<ListUserRecommendSystemDTO> getUserById(@PathVariable("id") Long id){
        return new ResponseEntity<>(datingService.getUserById(id), HttpStatus.OK);
    }

//    Show list recommend user for login user
    @GetMapping(value = "/show-recommend/{id}")
    public ResponseEntity<List<ListUserRecommendToShowDTO>> getUserRecommendList(@PathVariable("id") Long id){
        try {
            return new ResponseEntity<>(datingService.showListUserRecommend(id), HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    // Save user that login user dislike to list dislike
    @PostMapping(value = "/save-dislike")
    public ResponseEntity<DisLikeRecommend> createDislike(@RequestParam Long idLogin, @RequestParam Long idDislike) {
        DisLikeRecommend disLikeRecommend = datingService.saveDislikeUser(idLogin, idDislike);
        if (disLikeRecommend != null){
            return new ResponseEntity<>(disLikeRecommend, HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }
}
