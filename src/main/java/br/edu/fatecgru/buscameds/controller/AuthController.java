package br.edu.fatecgru.buscameds.controller;

import br.edu.fatecgru.buscameds.model.User;
import br.edu.fatecgru.buscameds.service.UserService;
import br.edu.fatecgru.buscameds.service.JwtService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtService jwtService;

    // LOGIN
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user,
                                HttpServletResponse response) {
        try {
            Cookie cookie = userService.login(
                    user.getEmail(), user.getPassword());
            response.addCookie(cookie);

            return ResponseEntity.ok("Usuário logado com sucesso!");
        } catch (Exception e) {
            return ResponseEntity.ok("Não foi possível realizar o login! " + e.getMessage());
        }
    }

    // CADASTRO
    @PostMapping("/registration")
    public ResponseEntity<String> register(@RequestBody User newUser) {

        // Verifica se o email já existe antes de tentar salvar
        if (userService.existsByEmail(newUser.getEmail())) {
            return ResponseEntity.ok("Usuário já cadastrado!");
        }

        try {
            newUser.setPassword(newUser.getPassword());
            userService.register(newUser);
            return ResponseEntity.ok("Usuário cadastrado com sucesso!");
        } catch (Exception e) {
            return ResponseEntity.ok("Não foi possível realizar o cadastro! " + e.getMessage());
        }

    }
}
