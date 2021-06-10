package com.c09.dating.repository;

import com.c09.dating.entity.ConfirmToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConfirmTokenRepository extends JpaRepository<ConfirmToken, Long> {
    ConfirmToken findByConfirmationToken(String confirmToken);
}
