package br.edu.fatecgru.buscameds.model;

import java.util.List;

public class Favorite {

    List<Medicine> medicines;
    List<Location> locations;

    public Favorite() {
    }

    public Favorite(List<Medicine> medicines, List<Location> locations) {
        this.medicines = medicines;
        this.locations = locations;
    }

    public List<Medicine> getMedicines() {
        return medicines;
    }

    public void setMedicines(List<Medicine> medicines) {
        this.medicines = medicines;
    }

    public List<Location> getLocations() {
        return locations;
    }

    public void setLocations(List<Location> locations) {
        this.locations = locations;
    }

    public void addMedicine(Medicine medicine) {
        medicines.add(medicine);
    }

    public void addLocation(Location location) {
        locations.add(location);
    }
}
