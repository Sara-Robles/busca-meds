package br.edu.fatecgru.buscameds.controller;

import br.edu.fatecgru.buscameds.service.FavoriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FavoriteController {

    @Autowired
    private FavoriteService favoriteService;


}
