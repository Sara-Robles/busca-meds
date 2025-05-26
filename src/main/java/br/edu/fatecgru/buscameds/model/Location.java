package br.edu.fatecgru.buscameds.model;

public class Location {

    private String cnesCode;
    private String name;
    private String phone;
    private Address address;


    public Location() {}

    public Location(String cnes, String name, String phone, Address address) {
        this.cnesCode = cnes;
        this.name = name;
        this.phone = phone;
        this.address = address;
    }

    public String getCnesCode() {
        return cnesCode;
    }

    public void setCnesCode(String cnesCode) {}

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

}
