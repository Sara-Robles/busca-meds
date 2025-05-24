package br.edu.fatecgru.buscameds.document;

public class Address {
    private String street;
    private String number;
    private String neighborhood;
    private String cep;

    public Address() {}

    public Address(String street, String number, String neighborhood, String cep) {
        this.street = street;
        this.number = number;
        this.neighborhood = neighborhood;
        this.cep = cep;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getNeighborhood() {
        return neighborhood;
    }

    public void setNeighborhood(String neighborhood) {
        this.neighborhood = neighborhood;
    }

    public String getCep() {
        return cep;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }

    @Override
    public String toString() {
        return "Address{" +
                "street='" + street + '\'' +
                ", number='" + number + '\'' +
                ", neighborhood='" + neighborhood + '\'' +
                ", cep='" + cep + '\'' +
                '}';
    }
}
