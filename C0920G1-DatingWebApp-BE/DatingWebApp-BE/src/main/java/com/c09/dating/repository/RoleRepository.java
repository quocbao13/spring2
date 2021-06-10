package com.c09.dating.repository;

import com.c09.dating.entity.AccountRole;
import com.c09.dating.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role,Long> {
    @Query(value = "select u from Role u where u.name = ?1")
    Optional<Role> findByName(AccountRole name);
}
