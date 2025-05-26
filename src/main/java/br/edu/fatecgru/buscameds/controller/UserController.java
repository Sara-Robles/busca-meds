package br.edu.fatecgru.buscameds.controller;

import br.edu.fatecgru.buscameds.model.Favorite;
import br.edu.fatecgru.buscameds.model.Location;
import br.edu.fatecgru.buscameds.model.Medicine;
import br.edu.fatecgru.buscameds.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    // BUSCA REMÉDIO
    @GetMapping("/home")
    public List<Location> searchMedicine(@RequestParam String catmatCode,
                                         @RequestParam (required = false) String cep,
                                         @RequestParam (required = false) String neighborhood) {
        if (cep != null) {
            return searchByCep(catmatCode, cep);

        } else if (neighborhood != null) {
            return searchByNeighborhood(catmatCode, neighborhood);

        } else {
            return userService.searchByCatmat(catmatCode);
        }

        //try { } catch (Exception ex) { ex.getMessage(); }
    }

    // EXIBE FAVORITOS DO USUÁRIO PELO ID
    @GetMapping("/favorites")
    public List<Favorite> favoritesPage(@RequestParam String id) {

        return userService.getFavorites(id);

        //try { } catch (Exception ex) { ex.getMessage(); }
    }

    // SALVA REMÉDIO
    @PostMapping("/favorites/save-medicine")
    public String saveMedicine(@RequestBody Medicine medicine) {

        try {
            userService.saveMedicine(medicine);
            return "Remédio salvo com sucesso!";

        } catch (Exception ex) {
            return "Erro ao salvar! " + ex.getMessage();
        }
    }

    // SALVA LOCAL
    @PostMapping("/favorites/save-location")
    public String saveLocation(@RequestBody Location location) {

        try {
            userService.saveLocation(location);
            return "Local salvo com sucesso!";

        } catch (Exception ex) {
            return "Erro ao salvar! " + ex.getMessage();
        }
    }

    // DELETA FAVORITO
    @DeleteMapping("/favorites/delete/{code}")
    public String deleteFavorite(@PathVariable String code) {

        try {
            userService.deleteFavorite(code);
            return "Local excluído com sucesso!";

        } catch (Exception ex) {
            return "Erro ao excluir! " + ex.getMessage();
        }
    }

}
