package com.c09.dating.controller;
import com.c09.dating.service.BanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@EnableScheduling
public class AutoUnbanController {
    @Autowired
    private BanService banService;
    @Autowired
    private JavaMailSender emailSender;
    @Scheduled(cron = "0 00 00 * * ?")
    public void autoUnban(){
        banService.unlockAccount();
    }
}
