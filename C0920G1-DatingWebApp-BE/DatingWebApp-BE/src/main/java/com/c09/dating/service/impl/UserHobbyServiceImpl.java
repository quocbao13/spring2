package com.c09.dating.service.impl;

import com.c09.dating.entity.UserHobby;
import com.c09.dating.repository.HobbyRepository;
import com.c09.dating.repository.UserHobbyRepository;
import com.c09.dating.repository.UserRepository;
import com.c09.dating.service.UserHobbyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserHobbyServiceImpl implements UserHobbyService {

    @Autowired
    UserHobbyRepository userHobbyRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    HobbyRepository hobbyRepository;


    @Override
    public void save(UserHobby userHobby) {
         userHobbyRepository.save(userHobby);
    }
}
