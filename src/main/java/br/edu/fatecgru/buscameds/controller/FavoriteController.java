package br.edu.fatecgru.buscameds.controller;

import br.edu.fatecgru.buscameds.model.Favorite;
import br.edu.fatecgru.buscameds.model.Location;
import br.edu.fatecgru.buscameds.service.FavoriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")

public class FavoriteController {

    @Autowired
    private FavoriteService favoriteService;

    // EXIBE FAVORITOS DO USUÁRIO
    @GetMapping("/favorites/list")
    public ResponseEntity<?> getFavorites(Authentication authentication) {
        String email = authentication.getName();
        Favorite favorites = favoriteService.getFavorites(email);
        return ResponseEntity.ok(favorites);
    }

    // SALVA LOCAL
    @PostMapping("/favorites/save-location")
    public ResponseEntity<String> saveLocation(Authentication authentication,
                                               @RequestBody Location location,
                                               @RequestParam String medicine) {
        String email = authentication.getName();
        location.setMedicamento(medicine);
        favoriteService.saveLocation(email, location);

        return ResponseEntity.ok("Local favoritado com sucesso.");
    }


    //EXCLUI LOCAL
    @DeleteMapping("/favorites/delete-location/{codigo_cnes}")
    public ResponseEntity<String> deleteLocation(Authentication authentication,
                                                 @PathVariable String codigo_cnes) {

        String email = authentication.getName();
        favoriteService.deleteLocation(email, codigo_cnes);

        return ResponseEntity.ok( "Local removido dos favoritos." );
    }

}
