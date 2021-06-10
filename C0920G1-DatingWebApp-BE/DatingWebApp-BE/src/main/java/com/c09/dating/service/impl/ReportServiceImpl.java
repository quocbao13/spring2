package com.c09.dating.service.impl;

import com.c09.dating.DTO.ReportDTO;
import com.c09.dating.repository.ReportRepository;
import com.c09.dating.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReportServiceImpl implements ReportService {
    @Autowired
    ReportRepository reportRepository;
    @Override
    public List<ReportDTO> findAllReportByUserId(Long userId) {
        return this.reportRepository.findByUser_Id(userId);
    }
}
