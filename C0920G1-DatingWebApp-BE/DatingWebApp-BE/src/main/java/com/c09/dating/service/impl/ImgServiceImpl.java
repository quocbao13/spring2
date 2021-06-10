package com.c09.dating.service.impl;

import com.c09.dating.DTO.ImgDTO;
import com.c09.dating.repository.ImgRepository;
import com.c09.dating.repository.ProfileRepository;
import com.c09.dating.service.ImgService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ImgServiceImpl implements ImgService {

    @Autowired
    ImgRepository imgRepository;

    @Override
    public List<ImgDTO> getAllImgByUserId(Long id) {
        return this.imgRepository.findAllImgByUserId(id);
    }
}
