package com.c09.dating.service;

import com.c09.dating.DTO.IProfileDTO;
import com.c09.dating.DTO.ProfileDTO;
import com.c09.dating.DTO.UserProfile;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public interface ProfileService {

   List<IProfileDTO> findAllDataMapping(Long id);

  List<IProfileDTO>findAllPostFriendId(Long id);

    List<IProfileDTO>findAllPostIdNoFriend(Long id);
    List<UserProfile>findProfileUser(Long id);
    List<UserProfile>findPostByUserNoFriend(Long id);
    List<UserProfile>findPostByUserFriend(Long id);
}
