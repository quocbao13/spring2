package com.c09.dating.repository;

import com.c09.dating.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account,Long> {

    //tuan repo
    Optional<Account> findByEmail(String email);
    boolean existsByEmail(String email);
    Account findAccountByEmail(String email);
    //không xóa

}
