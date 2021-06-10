package com.c09.dating.service.impl;

import com.c09.dating.entity.District;
import com.c09.dating.repository.DistrictRepository;
import com.c09.dating.service.DistrictService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DistrictServiceImpl implements DistrictService {
    // hieu tao district repository
    private final DistrictRepository districtRepository;
    DistrictServiceImpl(DistrictRepository districtRepository){
        this.districtRepository = districtRepository;
    }

    public List<District> findAllDistrict() {
        return this.districtRepository.findAll();
    }


    public List<District> getAll(){
        return this.districtRepository.findAll();

    }

    @Override
    public List<District> findByProvinceId(Long id) {
        return this.districtRepository.findByProvinceId(id);
    }

}
