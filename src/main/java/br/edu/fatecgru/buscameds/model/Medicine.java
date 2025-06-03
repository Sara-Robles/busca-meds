package br.edu.fatecgru.buscameds.model;

public class Medicine {
    private String codigo_catmat;
    private String principio_ativo;
    private String concentracao;
    private String forma_farmaceutica;
    private String unidade_fornecimento;

    public Medicine() {}

    public Medicine(String codigo_catmat, String principio_ativo, String concentracao, String forma_farmaceutica,
                    String unidade_fornecimento) {
        this.codigo_catmat = codigo_catmat;
        this.principio_ativo = principio_ativo;
        this.concentracao = concentracao;
        this.forma_farmaceutica = forma_farmaceutica;
        this.unidade_fornecimento = unidade_fornecimento;
    }

    public String getCodigo_catmat() {
        return codigo_catmat;
    }

    public void setCodigo_catmat(String codigo_catmat) {
        this.codigo_catmat = codigo_catmat;
    }

    public String getPrincipio_ativo() {
        return principio_ativo;
    }

    public void setPrincipio_ativo(String principio_ativo) {
        this.principio_ativo = principio_ativo;
    }

    public String getConcentracao() {
        return concentracao;
    }

    public void setConcentracao(String concentracao) {
        this.concentracao = concentracao;
    }

    public String getForma_farmaceutica() {
        return forma_farmaceutica;
    }

    public void setForma_farmaceutica(String forma_farmaceutica) {
        this.forma_farmaceutica = forma_farmaceutica;
    }

    public String getUnidade_fornecimento() {
        return unidade_fornecimento;
    }

    public void setUnidade_fornecimento(String unidade_fornecimento) {
        this.unidade_fornecimento = unidade_fornecimento;
    }
}
