package br.edu.fatecgru.buscameds.repository;

import br.edu.fatecgru.buscameds.model.Favorite;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FavoriteRepository extends MongoRepository<Favorite, String> {

}
