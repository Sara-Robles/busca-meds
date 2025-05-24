package br.edu.fatecgru.buscameds.document;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "medicines")
public class MedicineDocument {
    @Id
    private String catmatCode;
    private String name;

    public MedicineDocument() {}

    public MedicineDocument(String catmatCode, String name) {
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
