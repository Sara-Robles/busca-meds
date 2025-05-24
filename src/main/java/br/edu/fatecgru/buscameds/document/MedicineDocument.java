package br.edu.fatecgru.buscameds.document;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@ToString(exclude = "catmatCode")
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "medicines")
public class MedicineDocument {
    @Id
    private String catmatCode;
    private String name;

}
