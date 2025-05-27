package br.edu.fatecgru.buscameds.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "user")
public class User {

    @Id
    String id;
    String name;
    String email;

    Favorite favorite;

    public User() {
    }

    public User(String id, String name, String email, Favorite favorite) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.favorite = favorite;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Favorite getFavorite() {
        return favorite;
    }

    public void setFavorite(Favorite favorite) {
        this.favorite = favorite;
    }

    public void addMedicine(Medicine medicine) {
        favorite.addMedicine(medicine);
    }

    public void addLocation(Location location) {
        favorite.addLocation(location);
    }
}
