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

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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


    @PutMapping("/update")
    public ResponseEntity<String> update(@RequestBody User userUpdate, Authentication authentication) {

        //User user = (User) userDetailsService.loadUserByUsername(authentication.getName());

        userService.updateByEmail(userUpdate, authentication.getName());
        return ResponseEntity.ok("Usuário atualizado com sucesso!");
    }

    @DeleteMapping("/delete/{email}")
    public ResponseEntity<String> delete(@PathVariable String email) {

        userService.delete(email);
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

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {

        response.addCookie(userService.logout());

        return ResponseEntity.ok("Logout realizado com sucesso!");
    }

    @GetMapping("/email")
    public ResponseEntity<?> getEmail(Authentication authentication) {
        if (authentication != null && authentication.isAuthenticated()) {
            Map<String, String> response = new HashMap<>();
            response.put("email", authentication.getName());
            return ResponseEntity.ok(response); // Retorna em formato JSON
        }
        return ResponseEntity.status(401).body("Usuário não autenticado");
    }

    @GetMapping("/data")
    public ResponseEntity<?> returnUser(Authentication authentication) {
        if (authentication != null && authentication.isAuthenticated()) {

            Object user = userService.findByEmail(authentication.getName());

            Map<String, Object> response = new HashMap<>();
            response.put("data", user);

            return ResponseEntity.ok(response); // Retorna em formato JSON
        }
        return ResponseEntity.status(401).body("Usuário não autenticado");
    }

}
