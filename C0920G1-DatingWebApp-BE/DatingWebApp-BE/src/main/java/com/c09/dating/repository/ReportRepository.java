package com.c09.dating.repository;

import com.c09.dating.DTO.ReportDTO;
import com.c09.dating.entity.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {
    @Query(value = "select report.content as content,report.post_id as postId, report.id as reportId, report.user_id as userId from report where user_id=?", nativeQuery = true)
    List<ReportDTO> findByUser_Id(Long userId);
}
