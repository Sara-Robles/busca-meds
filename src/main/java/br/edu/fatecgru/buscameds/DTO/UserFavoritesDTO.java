package br.edu.fatecgru.buscameds.DTO;

import br.edu.fatecgru.buscameds.model.Favorite;
import br.edu.fatecgru.buscameds.model.Location;
import br.edu.fatecgru.buscameds.model.Medicine;
import br.edu.fatecgru.buscameds.model.User;
import java.util.List;

public class UserFavoritesDTO {

    Favorite favorite;

    public UserFavoritesDTO() {
    }

    // Metodo para transformar User em UserDTO
    public UserFavoritesDTO(User user) {
        this.favorite = user.getFavorite();
    }

    public Favorite getFavorite() {
        return favorite;
    }

    public void setFavorite(Favorite favorite) {
        this.favorite = favorite;
    }

    public List<Medicine> getFavoriteMedicines() {
        return favorite.getMedicines();
    }

    public List<Location> getFavoriteLocations() {
        return favorite.getLocations();
    }

}

