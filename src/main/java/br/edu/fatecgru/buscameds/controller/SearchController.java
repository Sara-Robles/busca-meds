package br.edu.fatecgru.buscameds.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class SearchController {

    @GetMapping("/search-locations")
    public ResponseEntity<?> searchLocations(@RequestParam String catmatCode) {
        try {
            List<Map<String, Object>> allLocations = new ArrayList<>();
            int offset = 0; // número de páginas
            int limit = 100; // limite de objetos por página
            String codigoUf = "35"; // SP

            // Loop para buscar todas as páginas
            while (true) {
                // URL requisiçção BNA FAR
                String url = String.format(
                        "https://apidadosabertos.saude.gov.br/daf/estoque-medicamentos-bnafar-horus?codigo_catmat=%s&codigo_uf=%s&limit=%d&offset=%d",
                        catmatCode, codigoUf, limit, offset
                );

                RestTemplate restTemplate = new RestTemplate();
                ResponseEntity<Map> response = restTemplate.getForEntity(url, Map.class);

                // Enquanto a API retornar dados
                if (response.getBody() != null && response.getBody().get("parametros") != null) {
                    List<Map<String, Object>> parametros = (List<Map<String, Object>>) response.getBody().get("parametros");

                    if (parametros.isEmpty()) {
                        break; // Não há mais dados
                    }

                    // Processar e agrupar por estabelecimento
                    for (Map<String, Object> item : parametros) {
                        Map<String, Object> location = new HashMap<>();
                        location.put("municipio", item.get("municipio"));
                        location.put("codigo_cnes", item.get("codigo_cnes"));
                        location.put("nome_fantasia", item.get("nome_fantasia"));
                        location.put("logradouro", item.get("logradouro"));
                        location.put("numero_endereco", item.get("numero_endereco"));
                        location.put("bairro", item.get("bairro"));
                        location.put("cep", item.get("cep"));
                        location.put("telefone", item.get("telefone"));

                        // Verificar se já existe este estabelecimento na lista
                        boolean exists = allLocations.stream()
                                .anyMatch(loc -> loc.get("codigo_cnes").equals(item.get("codigo_cnes")));

                        if (!exists) {
                            allLocations.add(location);
                        }
                    }

                    offset += limit;
                } else {
                    break;
                }
            }

            return ResponseEntity.ok(allLocations);

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao buscar estabelecimentos: " + e.getMessage());
        }
    }
}