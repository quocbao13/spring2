package com.c09.dating.repository;

import com.c09.dating.entity.DisLikeRecommend;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DisLikeRecommendRepository extends JpaRepository<DisLikeRecommend,Long> {

    @Query(value = "SELECT * FROM dis_like_recommend where dis_like_recommend.id_dislike = ?", nativeQuery = true)
    List<DisLikeRecommend> findAllByIdUser(Long id);
}
