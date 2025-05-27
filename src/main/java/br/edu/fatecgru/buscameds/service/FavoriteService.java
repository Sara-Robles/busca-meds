package br.edu.fatecgru.buscameds.service;

import br.edu.fatecgru.buscameds.DTO.UserDTO;
import br.edu.fatecgru.buscameds.DTO.UserFavoritesDTO;
import br.edu.fatecgru.buscameds.model.Favorite;
import br.edu.fatecgru.buscameds.model.Location;
import br.edu.fatecgru.buscameds.model.Medicine;
import br.edu.fatecgru.buscameds.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FavoriteService {

    @Autowired
    private UserRepository userRepository;


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

    public Favorite getFavorite(String id) {
        return userRepository.findFavoriteById(id);
    }

    public void saveFavorite(String id, Favorite favorite) {
        userRepository.saveFavorite(id, favorite);
    }

    public void deleteFavorite(String id) {
        userRepository.deleteFavoriteById(id);
    }

    public void saveMedicine(String id, Medicine medicine) {
        Favorite favorite = userRepository.findFavoriteById(id);
        favorite.addMedicine(medicine);
        saveFavorite(id, favorite);
    }

    public void saveLocation(String id, Location location) {
        Favorite favorite = userRepository.findFavoriteById(id);
        favorite.addLocation(location);
        saveFavorite(id, favorite);
    }

}
