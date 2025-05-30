package br.edu.fatecgru.buscameds.controller;

import br.edu.fatecgru.buscameds.model.User;
import br.edu.fatecgru.buscameds.security.JwtFilter;
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
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    JwtFilter jwtFilter;

    @Autowired
    UserDetailsServiceImpl userDetailsService;


    @GetMapping("/list")
    public List<User> getUsers() {
       return userService.findAll();
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

        try {
            userService.updateByEmail(user, user.getEmail());
            ResponseEntity.ok("Usuário atualizado com sucesso!");

        } catch (Exception ex) {
            ResponseEntity.ok( "Erro ao atualizar! " + ex.getMessage());
        }

       return ResponseEntity.ok( "Erro ao atualizar!");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable String id) {

        try {
            userService.delete(id);
            ResponseEntity.ok("Usuário removido com sucesso!");

        } catch (Exception ex) {
            ResponseEntity.ok("Erro ao remover! " + ex.getMessage());
        }
        return ResponseEntity.ok( "Erro ao remover!");
    }

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
