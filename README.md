[![English Translation](https://img.shields.io/badge/English%20Translation-2d314a?style=for-the-badge)](https://github.com/Sara-Robles/busca-meds/blob/main/README-translation.md) 

<div align="center">
  
# 💊 BuscaMeds </h1> 

 [![Website](https://img.shields.io/badge/Acesse%20o%20BuscaMeds-035a7d?style=for-the-badge)](LINK)

</div>

<a href="https://github.com/Sara-Robles/busca-meds">
 <img src="https://github.com/Sara-Robles/busca-meds/blob/main/imagens/logo.png" width="250px" alt="Logo do website" align="right"> 
</a>

O BuscaMeds é um website destinado a busca de estabelecimentos de saúde que possuem um medicamento, apresentando apenas medicamentos oferecidos pelo SUS e limitado geograficamente ao estado de São Paulo. 

<h2 align="center">Funcionamento</h2>

  A aplicação capta informações sobre os medicamentos através de uma API REST implementada em Java. A partir do nome do medicamento inserido pelo usuário, é buscado o código CATMAT equivalente na Tabela CATMAT. Então, é feito uma requisição para a API BNAFAR utilizando o código CATMAT do medicamento como parânetro. 
  
É esperado como retorno todos os estabelecimentos de saúde que possuem o medicamento em estoque. 

  Após a busca, é apresentado ao usuário uma lista dos estabelecimentos, contendo dados como endereço completo e informações de contato. O usuário pode favoritar os estabelecimentos junto do medicamente pesquisado, mas deverá criar uma conta para acessar essa funcionalidade.

<h2 align="center">Bases de Dados</h2>

- [**Tabela de Medicamentos do CATMAT**](https://integracao.esusab.ufsc.br/ledi/documentacao/referencias/tabela_catmat.html) (Catálogo de Materiais) do Portal de Compras do Governo Federal
- Base de dados [**BNAFAR**](https://apidadosabertos.saude.gov.br/v1/#/BNAFAR/get_daf_estoque_medicamentos_bnafar_horus) da **API de Dados Abertos** do Governo Federal
  - Base Nacional de Dados de Ações e Serviços da Assistência Farmacêutica no SUS

> A BNA FAR permite requisições com diversos parâmetros, nesta aplicação utilizamos principalmente o código CATMAT e o código IBGE do Estado de São Paulo
> 
> _Código CATMAT do medicamento:_ Usado para identificação única dos medicamentos


<h2 align="center">Propósito da Aplicação</h2>

- Facilitar a busca por medicamentos do SUS em estabelecimentos de saúde do estado de São Paulo
- Permitir que qualquer usuário consulte a disponibilidade de medicamentos
- Oferecer uma área de favoritos personalizada, acessível via login
- Armazenar os dados de forma segura e escalável, com acesso web

> [!NOTE]
> Projeto acadêmico desenvolvido para a disciplina prática de **Laboratório de Engenharia de Software** para o curso de Análise e Desenvolvimento de Sistemas na FATEC Guarulhos

<h2 align="center">Arquitetura e Tecnologias utilizadas</h2>

- Arquitetura monolítica (MVC + REST) ⇨ Hospedado no [Render](https://render.com)
- Banco de Dados ⇨ Hospedado no [Supabase](https://supabase.com)

### Front-End

- HTML5, CSS3
- Bootstrap 5 para componentes e responsividade
- JavaScript
  
### Back-End

- Java 17
- Spring Boot Framework 
- REST API para integração com o front-end
- JPA/Hibernate para persistência dos dados
- Segurança e Autenticação com JWT

### Banco de Dados

- PostgreSQL
- Tabelas criadas automaticamente com base nas entidades JPA 
- Estrutura básica:
  - `usuarios`: nome, email, senha
  - `favoritos`: lista de locais vinculados ao usuário
  - `locais`: dados do estabelecimento + nome do medicamento buscado

<h2 align="center">Interface</h2>

<div align="center">

### Home e Busca

<img src="https://github.com/Sara-Robles/busca-meds/blob/main/media/atualizar-cadastro.jpg" width="300px" alt="Visualização de Medicamentos">  

### Favoritos

<img src="https://github.com/Sara-Robles/busca-meds/blob/main/media/cadastro-produto.jpg" width="300px" alt="Favoritos">  

### Login de Usuário

<img src="https://github.com/Sara-Robles/busca-meds/blob/main/media/login-usuario.jpg" width="300px" alt="Login de Usuário">  

</div>



## 🔗 Links

- [BNAFAR](https://www.gov.br/saude/pt-br/composicao/sectics/daf/bnafar)
- [Tabela de Medicamentos do CATMAT](https://integracao.esusab.ufsc.br/ledi/documentacao/referencias/tabela_catmat.html)
- [API Portal de Dados Abertos](https://www.gov.br/conecta/catalogo/apis/api-portal-de-dados-abertos)
- [API de Dados Abertos - Swagger](https://apidadosabertos.saude.gov.br/v1/#/BNAFAR/get_daf_estoque_medicamentos_bnafar_horus)

