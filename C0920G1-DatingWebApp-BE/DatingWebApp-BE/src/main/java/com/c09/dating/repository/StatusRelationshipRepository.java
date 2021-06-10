package com.c09.dating.repository;

import com.c09.dating.entity.StatusRelationship;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StatusRelationshipRepository extends JpaRepository<StatusRelationship,Long> {
}
