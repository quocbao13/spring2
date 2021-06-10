package com.c09.dating.service;

import com.c09.dating.entity.Account;
import java.util.List;

public interface AccountService {
    Account findById(Long id);

    //  Phương thức lấy account cua THINH
    List<Account> getAll();
//    --------------------------------------
}
