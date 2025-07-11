[![English Translation](https://img.shields.io/badge/English%20Translation-2d314a?style=for-the-badge)](https://github.com/Sara-Robles/busca-meds/blob/main/README-translation.md) 

<div align="center">
  
# 💊 BuscaMeds </h1> 

 [![Website](https://img.shields.io/badge/Acesse%20o%20BuscaMeds-035a7d?style=for-the-badge)](LINK)

</div>

<a href="https://github.com/Sara-Robles/busca-meds">
 <img src="https://github.com/Sara-Robles/busca-meds/blob/main/imagens/logo.png" width="250px" alt="Logo do website" align="right"> 
</a>

O BuscaMeds é um website destinado a busca de estabelecimentos de saúde que possuem um medicamento, limitado a medicamentos oferecidos pelo SUS e ao estado de São Paulo. 

**Bases de dados utilizadas:**
- [Tabela de Medicamentos do CATMAT](https://integracao.esusab.ufsc.br/ledi/documentacao/referencias/tabela_catmat.html) (Catálogo de Materiais) do Portal de Compras do Governo Federal.
- Base de dados [BNAFAR](https://apidadosabertos.saude.gov.br/v1/#/BNAFAR/get_daf_estoque_medicamentos_bnafar_horus) da API de Dados Abertos do Governo Federal: Base Nacional de Dados de Ações e Serviços da Assistência Farmacêutica no SUS.
  - Permite requisições aceitando diversos parâmetros para filtro. Nesta aplicação, utilizaremos principalmente o código CATMAT e o código IBGE do Estado de São Paulo.
  - Código CATMAT do medicamento: Utilizado para identificação única dos medicamentos.

A aplicação capta informações sobre os medicamentos através de uma API implementada em Java. A partir do nome do medicamento inserido pelo usuário, é buscado o código CATMAT equivalente na Tabela CATMAT retornada da requisição. Então, é feita outra requisição para a API BNAFAR utilizando o código CATMAT do medicamento como parânetro, é esperado como retorno todos os estabelecimentos de saúde que possuem o medicamento em estoque. 

Após a busca, é apresentado uma lista dos estabelecimentos, contendo dados como endereço completo e informações de contato. Permite favoritar estabelecimentos de saúde e o medicamento buscado, sendo necessário o login para a funcionalidade de favoritos. Fornece recuperação e apresentação dos dados em tempo real, armazenadas em um banco de dados não relacional MongoDB.

> Desenvolvido para a disciplina prática de "Laboratório de Engenharia de Software" na FATEC Guarulhos. 

## :hammer_and_wrench: Tecnologias Utilizadas

- **HTML e CSS**: Estrutura e estilização da página.
- **Java**: Estrutura da API para criação dos endpoints, tratamento dos dados e operações no banco de dados.
  - **JPA/Hibernate**: Implementação Java para estrutura das tabelas relacionais e acesso a base de dados.
- **JavaScript:** Interatividade da aplicação, requisições para APIs externas e comunicação com o back-end.
- **MongoDB**: Banco de dados não relacional, baseado em documentos, para persistência de dados.
  
<h2 align="center">Interface</h2>

<div align="center">

### Home e Busca

<img src="https://github.com/Sara-Robles/busca-meds/blob/main/imagens/atualizar-cadastro.jpg" width="300px" alt="Visualização de Medicamentos">  

### Favoritos

<img src="https://github.com/Sara-Robles/busca-meds/blob/main/imagens/cadastro-produto.jpg" width="300px" alt="Favoritos">  

### Login de Usuário

<img src="https://github.com/Sara-Robles/busca-meds/blob/main/imagens/login-usuario.jpg" width="300px" alt="Login de Usuário">  


</div>



### 🔗 Links

- [BNAFAR](https://www.gov.br/saude/pt-br/composicao/sectics/daf/bnafar)
- [Tabela de Medicamentos do CATMAT](https://integracao.esusab.ufsc.br/ledi/documentacao/referencias/tabela_catmat.html)
- [API Portal de Dados Abertos](https://www.gov.br/conecta/catalogo/apis/api-portal-de-dados-abertos)
- [API de Dados Abertos - Swagger](https://apidadosabertos.saude.gov.br/v1/#/BNAFAR/get_daf_estoque_medicamentos_bnafar_horus)

