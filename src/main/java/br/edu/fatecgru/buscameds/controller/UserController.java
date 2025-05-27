package br.edu.fatecgru.buscameds.controller;

import br.edu.fatecgru.buscameds.model.User;
import br.edu.fatecgru.buscameds.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/user/save")
    public String save(@RequestBody User user) {

        try {
            userService.save(user);
            return "Usuário salvo com sucesso!";

        } catch (Exception ex) {
            return "Erro ao salvar! " + ex.getMessage();
        }
    }

    @GetMapping("/api/teste")
    public String testar() {
        return "API funcionando!";
    }
}
