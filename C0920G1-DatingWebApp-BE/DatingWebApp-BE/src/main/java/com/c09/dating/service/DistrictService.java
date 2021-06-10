package com.c09.dating.service;

import com.c09.dating.entity.District;

import java.util.List;

public interface DistrictService {
    List<District> getAll();

    List<District> findByProvinceId(Long id);
}
