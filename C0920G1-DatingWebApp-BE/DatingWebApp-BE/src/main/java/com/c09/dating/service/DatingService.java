package com.c09.dating.service;

import com.c09.dating.DTO.ListUserRecommendSystemDTO;
import com.c09.dating.DTO.ListUserRecommendToShowDTO;
import com.c09.dating.entity.DisLikeRecommend;
import com.c09.dating.entity.Hobby;

import java.util.List;

public interface DatingService {

    List<ListUserRecommendSystemDTO> getAllUserByGenderAndProvince(String gender, String idProvince, Long idUserLogin);
    ListUserRecommendSystemDTO getUserById(Long id);
    List<Hobby> getHobbyOfUserById(Long id);
    List<ListUserRecommendSystemDTO> getAllUserByGender(String gender, Long idUserLogin);
    List<ListUserRecommendToShowDTO> showListUserRecommend(Long id);
    DisLikeRecommend saveDislikeUser (Long idLogin, Long idDislike);
}
