package br.edu.fatecgru.buscameds.controller;

import br.edu.fatecgru.buscameds.model.Favorite;
import br.edu.fatecgru.buscameds.model.Location;
import br.edu.fatecgru.buscameds.model.Medicine;
import br.edu.fatecgru.buscameds.service.FavoriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("buscameds")
public class FavoriteController {

    @Autowired
    private FavoriteService favoriteService;

    // BUSCA REMÉDIO
    @GetMapping("/search")
    public ResponseEntity<List<Location>> searchMedicine(@RequestParam String catmatCode,
                                                         @RequestParam (required = false) String neighborhood,
                                                         @RequestParam (required = false) String cep) {
        if (neighborhood != null) {
           return ResponseEntity.ok( favoriteService.searchByNeighborhood(catmatCode, neighborhood) );

        } else if (cep != null) {
            return ResponseEntity.ok( favoriteService.searchByCep(catmatCode, cep) );

        } else {
            return ResponseEntity.ok( favoriteService.searchByCatmat(catmatCode) );
        }

        //try { } catch (Exception ex) { ex.getMessage(); }
    }

    // EXIBE FAVORITOS DO USUÁRIO PELO ID
    @GetMapping("/favorites")
    public ResponseEntity<?> getFavorites(@RequestParam String id) {
        return ResponseEntity.ok(favoriteService.getFavorites(id));
    }

    // SALVA REMÉDIO
    @PostMapping("/favorites/save-medicine")
    public ResponseEntity<String> saveMedicine(@RequestParam String id,
                                               @RequestBody Medicine medicine) {

        favoriteService.saveMedicine(id, medicine);
        return ResponseEntity.ok("Remédio favoritado com sucesso.");
    }

    // SALVA LOCAL
        @PostMapping("/favorites/save-location")
    public ResponseEntity<String> saveLocation(@RequestParam String id,
                                               @RequestBody Location location) {
        favoriteService.saveLocation(id, location);
        return ResponseEntity.ok("Local favoritado com sucesso.");
    }

    // EXCLUI REMÉDIO
    @DeleteMapping("/favorites/delete-medicine/{id}/{catmatCode}")
    public ResponseEntity<String> deleteMedicine(@PathVariable String id,
                                                 @PathVariable String catmatCode) {

        favoriteService.deleteMedicine(id, catmatCode);
        return ResponseEntity.ok( "Remédio removido dos favoritos." );
    }

    //EXCLUI LOCAL
    @DeleteMapping("/favorites/delete-location/{id}/{cnesCode}")
    public ResponseEntity<String> deleteLocation(@PathVariable String id,
                                                 @PathVariable String cnesCode) {

        favoriteService.deleteLocation(id, cnesCode);
        return ResponseEntity.ok( "Local removido dos favoritos." );
    }

}
