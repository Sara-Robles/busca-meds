package br.edu.fatecgru.buscameds.model;

import java.util.List;

public class Favorite {

    List<Location> locations;

    public Favorite() {
    }

    public Favorite(List<Location> locations) {
        this.locations = locations;
    }


    public List<Location> getLocations() {
        return locations;
    }

    public void setLocations(List<Location> locations) {
        this.locations = locations;
    }

    public void addLocation(Location location) {
        locations.add(location);
    }
}
