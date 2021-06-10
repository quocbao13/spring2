package com.c09.dating.service;

import com.c09.dating.DTO.ImgDTO;

import java.util.List;

public interface ImgService {

    List<ImgDTO>getAllImgByUserId(Long id);
}
