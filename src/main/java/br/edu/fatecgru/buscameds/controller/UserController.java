package br.edu.fatecgru.buscameds.controller;

import br.edu.fatecgru.buscameds.model.User;
import br.edu.fatecgru.buscameds.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {

    @Autowired
    private UserService userService;


    @GetMapping("/user/list")
    public List<User> getUsers() {
       return userService.findAll();
    }

    @PostMapping("/user/create")
    public String save(@RequestBody User user) {

        try {
            userService.save(user);
            return "Usuário salvo com sucesso!";

        } catch (Exception ex) {
            return "Erro ao salvar! " + ex.getMessage();
        }
    }

    @PutMapping("/user/update")
    public String update(@RequestBody User user) {

        try {
            userService.update(user);
            return "Usuário atualizado com sucesso!";

        } catch (Exception ex) {
            return "Erro ao atualizar! " + ex.getMessage();
        }
    }

    @DeleteMapping("/user/delete/{id}")
    public String delete(@PathVariable String id) {

        try {
            userService.delete(id);
            return "Usuário removido com sucesso!";

        } catch (Exception ex) {
            return "Erro ao remover! " + ex.getMessage();
        }
    }

}
