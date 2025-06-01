// Variáveis globais
let medicamentos = [];
let selectedCatmat = '';

// Carrega a tabela CATMAT quando a página carrega
document.addEventListener('DOMContentLoaded', async function() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/gabriellabueno/tabela-medicamentos-catmat/refs/heads/main/medicamentos-tabela-catmat.json');
        medicamentos = await response.json();
        console.log('Tabela CATMAT carregada:', medicamentos.length, 'medicamentos');
    } catch (error) {
        console.error('Erro ao carregar tabela CATMAT:', error);
        showError('Erro ao carregar dados dos medicamentos');
    }
});

// Input de medicamento com sugestões
document.getElementById('medicineInput').addEventListener('input', function(e) {
    const query = e.target.value.toLowerCase().trim();
    const suggestionsList = document.getElementById('suggestionsList');

    if (query.length < 2) {
        suggestionsList.innerHTML = '';
        suggestionsList.style.display = 'none';
        return;
    }

    // Filtrar medicamentos
    const matches = medicamentos.filter(med =>
        med.principio_ativo.toLowerCase().includes(query)
    ).slice(0, 10); // Limitar a 10 sugestões

    // Mostrar sugestões
    if (matches.length > 0) {
        suggestionsList.innerHTML = matches.map(med =>
            `<li class="list-group-item list-group-item-action suggestion-item" 
                 data-catmat="${med.codigo_catmat}" 
                 data-name="${med.principio_ativo}">
                <strong>${med.principio_ativo}</strong><br>
                <small>${med.concentracao} - ${med.forma_farmaceutica}</small>
            </li>`
        ).join('');
        suggestionsList.style.display = 'block';
    } else {
        suggestionsList.innerHTML = '<li class="list-group-item">Nenhum medicamento encontrado</li>';
        suggestionsList.style.display = 'block';
    }
});

// Selecionar sugestão
document.getElementById('suggestionsList').addEventListener('click', function(e) {
    const suggestionItem = e.target.closest('.suggestion-item');
    if (suggestionItem) {
        const catmat = suggestionItem.getAttribute('data-catmat');
        const name = suggestionItem.getAttribute('data-name');

        document.getElementById('medicineInput').value = name;
        selectedCatmat = catmat;
        document.getElementById('suggestionsList').style.display = 'none';

        console.log('Medicamento selecionado:', name, 'CATMAT:', catmat);
    }
});

// Botão de busca
document.getElementById('searchButton').addEventListener('click', async function() {
    if (!selectedCatmat) {
        showError('Por favor, selecione um medicamento da lista de sugestões');
        return;
    }

    try {
        showLoading(true);
        hideError();

        console.log('Buscando estabelecimentos para CATMAT:', selectedCatmat);

        // Fazer requisição para o back-end
        const response = await fetch(`/search-locations?catmatCode=${selectedCatmat}`);

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        const locations = await response.json();
        console.log('Estabelecimentos encontrados:', locations.length);

        // Aplicar filtros de CEP e bairro
        const filteredLocations = applyFilters(locations);

        displayResults(filteredLocations);

    } catch (error) {
        console.error('Erro ao buscar estabelecimentos:', error);
        showError('Erro ao buscar estabelecimentos. Tente novamente.');
    } finally {
        showLoading(false);
    }
});

// Filtros de CEP e bairro
function applyFilters(locations) {
    const cepFilter = document.getElementById('cepInput').value.trim().replace(/\D/g, ''); // Remove caracteres não numéricos
    const bairroFilter = document.getElementById('bairroInput').value.trim().toLowerCase();

    let filtered = locations;

    // Filtro por CEP
    if (cepFilter) {
        filtered = filtered.filter(location => {
            const locationCep = (location.cep || '').replace(/\D/g, '');
            return locationCep.includes(cepFilter);
        });
    }

    // Filtro por bairro
    if (bairroFilter) {
        filtered = filtered.filter(location => {
            const locationBairro = (location.bairro || '').toLowerCase();
            return locationBairro.includes(bairroFilter);
        });
    }

    return filtered;
}

// Exibir resultados
function displayResults(locations) {
    const container = document.getElementById('resultsContainer');
    const resultsSection = document.getElementById('resultsSection');
    const template = document.getElementById('location-card-template');

    container.innerHTML = '';

    // Formata mensagem de erro
    if (locations.length === 0) {
        const cepFilter = document.getElementById('cepInput').value.trim();
        const bairroFilter = document.getElementById('bairroInput').value.trim();

        let message = 'Nenhum estabelecimento encontrado com este medicamento em estoque';
        if (cepFilter || bairroFilter) {
            message += ' nos filtros especificados';
        }
        message += '.';

        container.innerHTML = `<div class="col-12"><div class="alert alert-info">${message}</div></div>`;
        resultsSection.classList.remove('d-none');
        return;
    }

    // Mostrar contador de resultados
    const resultCount = document.createElement('div');
    resultCount.className = 'col-12 mb-3';
    resultCount.innerHTML = `<div class="alert alert-success"><strong>${locations.length}</strong> estabelecimento(s) encontrado(s)</div>`;
    container.appendChild(resultCount);

    locations.forEach(location => {
        // Clonar template
        const clone = template.content.cloneNode(true);

        // Preencher dados
        clone.querySelector('[data-field="name"]').textContent = location.nome_fantasia || location.razao_social;
        clone.querySelector('[data-field="street"]').textContent = location.logradouro || 'Não informado';
        clone.querySelector('[data-field="number"]').textContent = location.numero_endereco || 'S/N';
        clone.querySelector('[data-field="neighborhood"]').textContent = location.bairro || 'Não informado';
        clone.querySelector('[data-field="city"]').textContent = location.municipio || 'Não informado';
        clone.querySelector('[data-field="state"]').textContent = location.uf || 'SP';
        clone.querySelector('[data-field="cep"]').textContent = formatCEP(location.cep) || 'Não informado';
        clone.querySelector('[data-field="phone"]').textContent = location.telefone || 'Não informado';

        container.appendChild(clone);
    });

    // Mostrar seção de resultados
    resultsSection.classList.remove('d-none');
}

// Mostrar mensagem de erro
function showError(message) {
    const errorElement = document.getElementById('errorMessage');
    errorElement.textContent = message;
    errorElement.classList.remove('d-none');
}

// Esconder mensagem de erro
function hideError() {
    const errorElement = document.getElementById('errorMessage');
    errorElement.classList.add('d-none');
}

// Mostrar/esconder loading (carregando)
function showLoading(show) {
    const medicineInput = document.getElementById('medicineInput')
    const cepInput = document.getElementById('cepInput')
    const bairroInput = document.getElementById('bairroInput')
    const button = document.getElementById('searchButton');
    const searchText = document.getElementById('searchText');
    const spinner = document.getElementById('spinner');


    if (show) {
        medicineInput.disabled = true;
        cepInput.disabled = true;
        bairroInput.disabled = true;
        button.disabled = true;
        searchText.textContent = 'Buscando...';
        spinner.classList.remove('d-none');
    } else {
        medicineInput.disabled = false;
        cepInput.disabled = false;
        bairroInput.disabled = false;
        button.disabled = false;
        searchText.textContent = 'Buscar Estabelecimentos';
        spinner.classList.add('d-none');
    }
}

// Formatar CEP
function formatCEP(cep) {
    if (!cep) return '';
    return cep.replace(/(\d{5})(\d{3})/, '$1-$2');
}