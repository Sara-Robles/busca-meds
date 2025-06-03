package br.edu.fatecgru.buscameds.model;

public class Location {

    private String codigo_cnes;
    private String nome_fantasia;
    private String telefone;
    private String municipio;
    private String logradouro;
    private String numero_endereco;
    private String bairro;
    private String cep;


    public Location() {}

    public Location(String codigo_cnes, String nome_fantasia, String telefone, String municipio,
                    String logradouro, String numero_endereco, String bairro, String cep) {
        this.codigo_cnes = codigo_cnes;
        this.nome_fantasia = nome_fantasia;
        this.telefone = telefone;
        this.municipio = municipio;
        this.logradouro = logradouro;
        this.numero_endereco = numero_endereco;
        this.bairro = bairro;
        this.cep = cep;
    }

    public String getCodigo_cnes() {
        return codigo_cnes;
    }

    public void setCodigo_cnes(String codigo_cnes) {
        this.codigo_cnes = codigo_cnes;
    }

    public String getNome_fantasia() {
        return nome_fantasia;
    }

    public void setNome_fantasia(String nome_fantasia) {
        this.nome_fantasia = nome_fantasia;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getMunicipio() {
        return municipio;
    }

    public void setMunicipio(String municipio) {
        this.municipio = municipio;
    }

    public String getLogradouro() {
        return logradouro;
    }

    public void setLogradouro(String logradouro) {
        this.logradouro = logradouro;
    }

    public String getNumero_endereco() {
        return numero_endereco;
    }

    public void setNumero_endereco(String numero_endereco) {
        this.numero_endereco = numero_endereco;
    }

    public String getBairro() {
        return bairro;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public String getCep() {
        return cep;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }

}
