package br.edu.fatecgru.buscameds.controller;

import br.edu.fatecgru.buscameds.model.Location;
import br.edu.fatecgru.buscameds.model.Medicine;
import br.edu.fatecgru.buscameds.service.FavoriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class FavoriteController {

    @Autowired
    private FavoriteService favoriteService;

    // BUSCA REMÉDIO
    @GetMapping("/home")
    public ResponseEntity<List<Location>> searchMedicine(@RequestParam String catmatCode,
                                         @RequestParam (required = false) String cep,
                                         @RequestParam (required = false) String neighborhood) {
        if (cep != null) {

           return ResponseEntity.ok( favoriteService.searchByCep(catmatCode, cep) );

        } else if (neighborhood != null) {
            return ResponseEntity.ok( favoriteService.searchByNeighborhood(catmatCode, neighborhood) );

        } else {
            return ResponseEntity.ok( favoriteService.searchByCatmat(catmatCode) );
        }

        //try { } catch (Exception ex) { ex.getMessage(); }
    }

    // EXIBE FAVORITOS DO USUÁRIO PELO ID
//    @GetMapping("/favorites")
//    public ResponseEntity<Favorite> favoritesPage(@RequestParam String id) {
//
//        return ResponseEntity.ok( favoriteService.getFavorite(id) );
//
//        //try { } catch (Exception ex) { ex.getMessage(); }
//    }

    // SALVA REMÉDIO
    @PostMapping("/favorites/save-medicine")
    public ResponseEntity<String> saveMedicine(@RequestBody Medicine medicine,
                               @RequestBody String id) {

        try {
            //favoriteService.saveMedicine(id, medicine);
            return ResponseEntity.ok("Remédio salvo com sucesso!");

        } catch (Exception ex) {
            return ResponseEntity.ok( "Erro ao salvar! " + ex.getMessage() );
        }
    }

    // SALVA LOCAL
    @PostMapping("/favorites/save-location")
    public ResponseEntity<String> saveLocation(@RequestBody Location location,
                               @RequestBody String id) {

        try {
            //favoriteService.saveLocation(id, location);
            return ResponseEntity.ok("Local salvo com sucesso!");

        } catch (Exception ex) {
            return ResponseEntity.ok("Erro ao salvar! " + ex.getMessage());
        }
    }

    // DELETA FAVORITO
//    @DeleteMapping("/favorites/delete/")
//    public ResponseEntity<String> deleteFavorite(@RequestBody String id) {
//
//        try {
//            favoriteService.deleteFavorite(id);
//            ResponseEntity.ok( "Local excluído com sucesso!" );
//
//        } catch (Exception ex) {
//            ResponseEntity.ok( "Erro ao excluir! " + ex.getMessage() );
//        }
//
//        return ResponseEntity.notFound().build();
//    }

}
