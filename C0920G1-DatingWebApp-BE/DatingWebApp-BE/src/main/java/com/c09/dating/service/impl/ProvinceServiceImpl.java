package com.c09.dating.service.impl;

import com.c09.dating.entity.Province;
import com.c09.dating.repository.ProvinceRepository;
import com.c09.dating.service.ProvinceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProvinceServiceImpl implements ProvinceService {

    private final ProvinceRepository provinceRepository;
    ProvinceServiceImpl(ProvinceRepository provinceRepository){
        this.provinceRepository = provinceRepository;
    }

    public List<Province> findAllProvince(){
        return this.provinceRepository.findAll();
    }


    public List<Province> getAll(){
        return this.provinceRepository.findAll();
    }

}
