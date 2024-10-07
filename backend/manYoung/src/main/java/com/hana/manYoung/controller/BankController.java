package com.hana.manYoung.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/bank")
@Controller
@RequiredArgsConstructor
public class BankController {
    @GetMapping("/account/{user_id}")
    public String account() {
        return "account";
    }
}
