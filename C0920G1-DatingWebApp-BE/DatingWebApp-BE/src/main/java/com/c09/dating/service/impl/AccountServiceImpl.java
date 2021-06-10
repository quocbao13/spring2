package com.c09.dating.service.impl;

import com.c09.dating.entity.Account;
import com.c09.dating.repository.AccountRepository;
import com.c09.dating.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    private AccountRepository repository;

    @Override
    public Account findById(Long id) {
        return this.repository.findById(id).orElse(null);
    }


    @Autowired
    AccountRepository accountRepository;


    //    Phương thức lấy id account cua THINH
    @Override
    public List<Account> getAll() {
        return this.accountRepository.findAll();
    }
//    ----------------------------------------

}
