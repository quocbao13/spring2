package com.c09.dating.service;

import com.c09.dating.entity.Account;

public interface BanService {
    void banAccountForOneWeek(Long accountId);

    void banAccountForOneMonth(Long accountId);

    void banAccountForever(Long accountId);

    void unlockAccount();
}
