package com.c09.dating.service.impl;
import com.c09.dating.repository.BanRepository;
import com.c09.dating.service.BanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BanServiceImpl implements BanService {
    @Autowired
    private BanRepository banRepository;

    @Override
    public void banAccountForOneWeek(Long accountId) {
        this.banRepository.banAccountForOneWeek(accountId);
    }

    @Override
    public void banAccountForOneMonth(Long accountId) {
        this.banRepository.banAccountForOneMonth(accountId);
    }

    @Override
    public void banAccountForever(Long accountId) {
        this.banRepository.banAccountForever(accountId);
    }

    @Override
    public void unlockAccount() {
        this.banRepository.unlockAccount();
    }
}
