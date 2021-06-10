package com.c09.dating.service.impl;

import com.c09.dating.entity.Hobby;
import com.c09.dating.repository.HobbyRepository;
import com.c09.dating.service.HobbyService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HobbyServiceImpl implements HobbyService {
    private final HobbyRepository hobbyRepository;

    HobbyServiceImpl(HobbyRepository hobbyRepository){
        this.hobbyRepository = hobbyRepository;
    }

    public List<Hobby> findAllHobby(){
        return this.hobbyRepository.findAll();
    }


}
