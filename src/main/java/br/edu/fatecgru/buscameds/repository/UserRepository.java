package br.edu.fatecgru.buscameds.repository;

import br.edu.fatecgru.buscameds.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User, String> {

    User save(User user);

    User findByEmail(String email);

    boolean existsByEmail(String email);

}
