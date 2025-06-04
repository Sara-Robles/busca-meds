package br.edu.fatecgru.buscameds.controller;

import org.springframework.data.convert.ReadingConverter;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("buscameds")
public class ViewController {

    @GetMapping("/home")
    public String home() {
        return "/index.html";
    }

    @GetMapping("/favorites")
    public String favoritesPage() {
        return "/favorites.html";
    }

    @GetMapping("/user/login")
    public String loginPage() {
        return "/user-login.html";
    }

    @GetMapping("/user/registration")
    public String registrationPage() {
        return "/user-registration.html";
    }

    @GetMapping("/user/update")
    public String updatePage() {
        return "/user-update.html";
    }

}