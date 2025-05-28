package br.edu.fatecgru.buscameds.DTO;

import br.edu.fatecgru.buscameds.model.Favorite;
import br.edu.fatecgru.buscameds.model.User;

public class UserDTO {

    String name;
    String email;
    Favorite favorite;

    public UserDTO() {
    }

    // Metodo para transformar User em UserDTO
    public UserDTO(User user) {
        this.name = user.getName();
        this.email = user.getEmail();
        this.favorite = user.getFavorite();
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getEmail() {
        return email;
    }

    public Favorite getFavorite() { return favorite; }

    public void setFavorite(Favorite favorite) { this.favorite = favorite; }
}

