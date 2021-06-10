package com.c09.dating.repository;

import com.c09.dating.DTO.ProfileDTO;
import com.c09.dating.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProfileRepositoryCustom  {
    List<ProfileDTO> findByUserProfileId(Long UserProdId);
}
