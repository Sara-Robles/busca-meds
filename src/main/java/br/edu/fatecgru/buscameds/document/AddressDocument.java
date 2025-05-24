package br.edu.fatecgru.buscameds.document;

import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class AddressDocument {
    private String street;
    private Integer number;
    private String neighborhood;
    private String cep;
}
