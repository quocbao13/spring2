package com.c09.dating.repository;

import com.c09.dating.entity.Account;
import com.c09.dating.entity.Ban;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;


@Repository
public interface BanRepository extends JpaRepository<Ban, Long> {

    @Transactional
    @Modifying
    @Query(value = "insert into Ban (date_un_ban, status_lock, account_id) " +
                            "values (DATE(DATE_ADD(curdate(), INTERVAL 7 day )), true , :accountId)", nativeQuery = true)
    void banAccountForOneWeek(@Param("accountId") Long accountId);

    @Transactional
    @Modifying
    @Query(value = "insert into Ban (date_un_ban, status_lock, account_id) values" +
                            " (DATE(DATE_ADD(curdate(), INTERVAL 1 month)), true , :accountId)", nativeQuery = true)
    void banAccountForOneMonth(Long accountId);

    @Transactional
    @Modifying
    @Query(value = "insert into Ban (date_un_ban, status_lock, account_id)" +
                            " values (DATE(DATE_ADD(curdate(), INTERVAL 200 year )), true , :accountId)", nativeQuery = true)
    void banAccountForever(Long accountId);

    @Transactional
    @Modifying
    @Query(value = "update ban set ban.status_lock = 0 where date_un_ban = DATE(now())", nativeQuery = true)
    void unlockAccount();

}
