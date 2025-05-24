package br.edu.fatecgru.buscameds.document;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@ToString(exclude = "cnes")
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "locals")
public class LocalDocument {

    @Id
    private String cnes;
    private String address;
    private Integer telephone;
    private String name;

}
