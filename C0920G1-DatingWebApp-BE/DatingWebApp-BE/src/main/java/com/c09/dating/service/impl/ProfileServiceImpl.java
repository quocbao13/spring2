package com.c09.dating.service.impl;

import com.c09.dating.DTO.IProfileDTO;
import com.c09.dating.DTO.ProfileDTO;
import com.c09.dating.DTO.UserProfile;
import com.c09.dating.repository.ProfileRepository;

import com.c09.dating.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProfileServiceImpl implements ProfileService {

    @Autowired
    ProfileRepository profileRepository;

    @Override
    public List<IProfileDTO> findAllDataMapping(Long idAccount) {
        return this.profileRepository.findByAccountProfile(idAccount);
    }

    @Override
    public List<IProfileDTO> findAllPostFriendId(Long idFriend) {
        return this.profileRepository.findByProfileIdFriend(idFriend);
    }

    @Override
    public List<IProfileDTO> findAllPostIdNoFriend(Long idTarget) {
        return this.profileRepository.findByProfileIdNoFriend(idTarget);
    }

    @Override
    public List<UserProfile> findProfileUser(Long id) {
        return this.profileRepository.findPostByMyAccount(id);
    }

    @Override
    public List<UserProfile> findPostByUserNoFriend(Long id) {
        return this.profileRepository.findPostByUserNoFriend(id);
    }

    @Override
    public List<UserProfile> findPostByUserFriend(Long id) {
        return this.profileRepository.findPostByUserFriend(id);
    }

}
