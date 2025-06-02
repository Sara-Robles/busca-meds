package br.edu.fatecgru.buscameds.controller;

import br.edu.fatecgru.buscameds.model.User;
import br.edu.fatecgru.buscameds.service.UserDetailsServiceImpl;
import br.edu.fatecgru.buscameds.service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    UserDetailsServiceImpl userDetailsService;


    @GetMapping("/list")
    public ResponseEntity<List<User>> getUsers() {
        return ResponseEntity.ok(userService.findAll());
    }

    @GetMapping("/update")
    public ResponseEntity<?> updatePage(Authentication authentication) {

        UserDetails userDetails = userDetailsService.loadUserByUsername(authentication.getName());

        try {
            return ResponseEntity.ok(userDetails);
        } catch (Exception ex) {
            return ResponseEntity.ok("Erro ao carregar dados do usuário! " + ex.getMessage());
        }
    }

    @PutMapping("/update")
    public ResponseEntity<String> update(@RequestBody User user) {

        userService.updateByEmail(user, user.getEmail());
        return ResponseEntity.ok("Usuário atualizado com sucesso!");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable String id) {

        userService.delete(id);
        return ResponseEntity.ok("Usuário removido com sucesso!");

    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user,
                                   HttpServletResponse response) {

        Cookie cookie = userService.login(
                user.getEmail(), user.getPassword());
        response.addCookie(cookie);

        return ResponseEntity.ok("Usuário logado com sucesso!");
    }

    @PostMapping("/registration")
    public ResponseEntity<String> register(@RequestBody User newUser) {

        // Verifica se o email já existe antes de tentar salvar
        if (userService.existsByEmail(newUser.getEmail())) {
            return ResponseEntity.ok("Usuário já cadastrado!");
        }

        newUser.setPassword(newUser.getPassword());
        userService.register(newUser);
        return ResponseEntity.ok("Usuário cadastrado com sucesso!");


    }

}
