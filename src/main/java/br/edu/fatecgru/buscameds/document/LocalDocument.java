package br.edu.fatecgru.buscameds.document;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "locals")
public class LocalDocument {

    @Id
    private String cnes;
    private Address address;
    private String phone;
    private String name;

    public LocalDocument() {}

    public LocalDocument(String cnes, Address address, String phone, String name) {
        this.cnes = cnes;
        this.address = address;
        this.phone = phone;
        this.name = name;
    }

    public String getCnes() {
        return cnes;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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
