package br.edu.fatecgru.buscameds.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "location")
public class Location {

    @Id
    private String cnes;

    private String name;
    private String phone;
    private Address address;


    public Location() {}

    public Location(String cnes, String name, String phone, Address address) {
        this.cnes = cnes;
        this.name = name;
        this.phone = phone;
        this.address = address;
    }

    public String getCnes() {
        return cnes;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }


    @Override
    public String toString() {
        return "LocalDocument{" +
                "address=" + address +
                ", phone='" + phone + '\'' +
                ", name='" + name + '\'' +
                '}';
    }
}
