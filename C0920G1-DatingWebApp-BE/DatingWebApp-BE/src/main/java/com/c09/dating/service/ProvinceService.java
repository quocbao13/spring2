package com.c09.dating.service;

import com.c09.dating.entity.Province;
import com.c09.dating.repository.ProvinceRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public interface ProvinceService {
  List<Province> getAll();

}
