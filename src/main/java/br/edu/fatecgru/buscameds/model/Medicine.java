package br.edu.fatecgru.buscameds.model;

public class Medicine {
    private String catmatCode;
    private String name;

    public Medicine() {}

    public Medicine(String catmatCode, String name) {
        this.catmatCode = catmatCode;
        this.name = name;
    }

    public String getCatmatCode() {
        return catmatCode;
    }

    public void setCatmatCode(String catmatCode) {
        this.catmatCode = catmatCode;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
