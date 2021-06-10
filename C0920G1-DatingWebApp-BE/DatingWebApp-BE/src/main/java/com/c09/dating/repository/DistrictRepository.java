package com.c09.dating.repository;

import com.c09.dating.entity.District;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DistrictRepository extends JpaRepository<District,Long> {


    @Query("select d from District d join Province p on p.id = d.province.id where p.id =?1")
    List<District> findByProvinceId(Long id);
}
