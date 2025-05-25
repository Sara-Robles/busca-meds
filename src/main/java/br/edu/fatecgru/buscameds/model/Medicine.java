package br.edu.fatecgru.buscameds.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "medicine")
public class Medicine {
    @Id
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
