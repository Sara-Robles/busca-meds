package br.edu.fatecgru.buscameds.repository;

import br.edu.fatecgru.buscameds.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User, String> {

    //void deleteFavoriteById(String id);

    //Favorite findFavoriteById(String id);

    //void saveFavorite(String id, Favorite favorite);

    User save(User user);

}
