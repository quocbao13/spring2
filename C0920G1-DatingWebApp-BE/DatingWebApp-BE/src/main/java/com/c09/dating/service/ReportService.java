package com.c09.dating.service;

import com.c09.dating.DTO.ReportDTO;
import com.c09.dating.entity.Report;

import java.util.List;

public interface ReportService {
    List<ReportDTO> findAllReportByUserId(Long userId);
}
