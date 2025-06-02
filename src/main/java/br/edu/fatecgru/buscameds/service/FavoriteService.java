package br.edu.fatecgru.buscameds.service;

import br.edu.fatecgru.buscameds.model.*;
import br.edu.fatecgru.buscameds.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.*;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class FavoriteService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public List<Location> searchByCep(String catmatCode, String cep) {
        List<Location> locations = new ArrayList<>();
        return locations;
    }

    public List<Location> searchByNeighborhood(String catmatCode, String neighborhood) {
        List<Location> locations = new ArrayList<>();
        return locations;
    }

    public List<Location> searchByCatmat(String catmatCode) {
        List<Location> locations = new ArrayList<>();
        return locations;
    }

    public Favorite getFavorites(String email) throws NoSuchElementException {

        if (email == null) {
            throw new IllegalArgumentException();
        }

        User user = userRepository.findByEmail(email);

        Favorite favorite = user.getFavorite();

        if (favorite == null) {
            throw new NoSuchElementException(
                    "Esse usuário ainda não possui remédios ou locais favoritos.");
        }

        return favorite;
    }

    public void saveMedicine(String email, Medicine medicine) {

        if (email == null || medicine == null) {
            throw new IllegalArgumentException();
        }

        if ( !userRepository.existsByEmail(email) ) {
            throw new NoSuchElementException("Usuário não encontrado!");
        }

        Query query = new Query(Criteria.where("email").is(email));
        Update update = new Update().push("favorite.medicines", medicine);
        mongoTemplate.updateFirst(query, update, User.class);
    }

    public void saveLocation(String email, Location location) {

        if (email == null || location == null) {
            throw new IllegalArgumentException();
        }

        if ( !userRepository.existsByEmail(email) ) {
            throw new NoSuchElementException("Usuário não encontrado!");
        }

        Query query = new Query(Criteria.where("email").is(email));
        Update update = new Update().push("favorite.locations", location);
        mongoTemplate.updateFirst(query, update, User.class);
    }

    public void deleteMedicine(String email, String catmatCode) {

        if (email == null || catmatCode == null) {
            throw new IllegalArgumentException();
        }

        if ( !userRepository.existsByEmail(email) ) {
            throw new NoSuchElementException("Usuário não encontrado!");
        }

        Query query = new Query(Criteria.where("email").is(email));
        Update update = new Update().pull("favorite.medicines",
                new Query(Criteria.where("catmatCode").is(catmatCode)));
        mongoTemplate.updateFirst(query, update, User.class);
    }

    public void deleteLocation(String email, String cnesCode) {

        if (email == null || cnesCode == null) {
            throw new IllegalArgumentException();
        }

        if ( !userRepository.existsByEmail(email) ) {
            throw new NoSuchElementException("Usuário não encontrado!");
        }

        Query query = new Query(Criteria.where("email").is(email));
        Update update = new Update().pull("favorite.locations",
                new Query(Criteria.where("cnesCode").is(cnesCode)));

        mongoTemplate.updateFirst(query, update, User.class);
    }
}
