package br.edu.fatecgru.buscameds.service;

import br.edu.fatecgru.buscameds.repository.FavoriteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FavoriteService {

    @Autowired
    private FavoriteRepository favoriteRepository;
}
