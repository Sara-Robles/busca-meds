package br.edu.fatecgru.buscameds.service;

import br.edu.fatecgru.buscameds.model.*;
import br.edu.fatecgru.buscameds.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.*;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

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

    public Favorite getFavorites(String id) {
        User user = userRepository.findById(id).get();
        return user.getFavorite();
    }

    public void saveMedicine(String id, Medicine medicine) {
        Query query = new Query(Criteria.where("_id").is(id));
        Update update = new Update().push("favorite.medicines", medicine);
        mongoTemplate.updateFirst(query, update, User.class);
    }

    public void saveLocation(String id, Location location) {
        Query query = new Query(Criteria.where("_id").is(id));
        Update update = new Update().push("favorite.locations", location);
        mongoTemplate.updateFirst(query, update, User.class);
    }

    public void deleteMedicine(String id, String catmatCode) {
        Query query = new Query(Criteria.where("_id").is(id));
        Update update = new Update().pull("favorite.medicines", new Query(Criteria.where("catmatCode").is(catmatCode)));
        mongoTemplate.updateFirst(query, update, User.class);
    }

    public void deleteLocation(String id, String cnesCode) {
        Query query = new Query(Criteria.where("_id").is(id));
        Update update = new Update().pull("favorite.locations", new Query(Criteria.where("cnesCode").is(cnesCode)));
        mongoTemplate.updateFirst(query, update, User.class);
    }
}
