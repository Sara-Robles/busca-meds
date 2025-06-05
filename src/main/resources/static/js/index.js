let tabelaCatmat = [];
let selectedCatmat = '';
let selectedMedicine = null;

document.addEventListener('DOMContentLoaded', async function() {


    // VERIFICA SE USUARIO ESTA LOGADO
    // APRESENTA OU REMOVE OPÇÃO DE LOGIN
    let userEmail = await getUserEmail();
    if (!userEmail) {
        // Oculta página de login
        document.getElementById('loginLink').classList.remove('d-none');
    } else {
        document.getElementById('loginLink').classList.add('d-none');
    }

    // CARREGA TABELA CATMAT
    try {
        const response = await fetch('https://raw.githubusercontent.com/gabriellabueno/tabela-medicamentos-catmat/refs/heads/main/medicamentos-tabela-catmat.json');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        tabelaCatmat = await response.json(); // armazena medicamentos no array

        console.log('Tabela CATMAT carregada:', tabelaCatmat.length, 'medicamentos');
    } catch (error) {
        console.error('Erro ao carregar tabela CATMAT:', error);
        return;
    }

    const medicineInput = document.getElementById('medicineInput');

    // APRESENTAR SUGESTÕES AO DIGITAR - campo de input de medicamentos
    medicineInput.addEventListener('input', function(e) {
        const query = e.target.value.toLowerCase().trim();

        // Desconsidera inputs menores que 2 caracteres
        if (query.length < 2) {
            suggestionsList.innerHTML = '';
            suggestionsList.style.display = 'none';
            return;
        }

        // Filtra o que foi digitado e compara com array "tabelaCatmat"
        // armazena resultados em "suggestions"
        const suggestions = tabelaCatmat.filter(med => {
            const principioAtivo = med.principio_ativo ? med.principio_ativo.toLowerCase() : '';
            return principioAtivo.includes(query);
        }).slice(0, 10);

        // Se houver alguma sugestão no array
        if (suggestions.length > 0) {
            // Cria li (list item) para sugestão e adiciona no HTML (ul)
            suggestionsList.innerHTML = suggestions.map(med =>
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

    const suggestionsList = document.getElementById('suggestionsList');

    // PEGAR MEDICAMENTO SELECIONADO DA LISTA DE SUGESTÕES
    // EVENTO DE CLICK NA SUGESTÃO
    suggestionsList.addEventListener('click', function(e) {

        const suggestionItem = e.target.closest('.suggestion-item');

        if (suggestionItem) {
            // Pega dados do medicamento clicado
            const catmat = suggestionItem.getAttribute('data-catmat');
            const name = suggestionItem.getAttribute('data-name');

            medicineInput.value = name; // Adiciona nome no campo de input
            selectedCatmat = catmat;
            // busca objeto medicamento a partir do codigo catmat do item selecionado
            selectedMedicine = tabelaCatmat.find(med => med.codigo_catmat === catmat);
            suggestionsList.style.display = 'none'; // Esconde lista

            console.log('Medicamento selecionado:', name, 'CATMAT:', catmat);
            console.log('selectedMedicine = ', selectedMedicine)
        }
    });

    const searchButton = document.getElementById('searchButton');

    // INICIAR BUSCA DE LOCAIS
    // EVENTO DE CLICK NO BOTÃO BUSCAR
    searchButton.addEventListener('click', async function() {

        // Verifica se o input de remédio está vazio
        const medicineValue = medicineInput.value.trim();
        if (!medicineValue) {
            const message = 'Por favor, selecione um medicamento da lista de sugestões';
            showAlert(message, 'error');
            return;
        }

        // Pega bairro do input para enviar na requisição
        const neighborhoodInput = document.getElementById('neighborhoodInput');
        const neighborhood = neighborhoodInput ? neighborhoodInput.value.trim() : '';

        try {
            showLoading(true); // apresenta status "carregando"
            hideAlert(); // esconde alertas

            // REQUISIÇÃO PARA ENDPOINT DA API BNA FAR (/search-locations)
            const response = await fetch(`/search-locations?catmatCode=${selectedCatmat}&neighborhood=${encodeURIComponent(neighborhood)}`);
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }
            const locations = await response.json();

            // Armazena os locais para usar em outros JS:
            localStorage.setItem('locations', JSON.stringify(locations));
            console.log('Estabelecimentos encontrados:', locations);

            // Pega favoritos do usuário
            let favorites = { medicines: [], locations: [] };
            const userEmail = await getUserEmail();
            if (userEmail) {
                const favoritesResponse = await fetch('/favorites/list');
                if (favoritesResponse.ok) {
                    favorites = await favoritesResponse.json();
                }
            }

            // Aplica filtros de busca
            const filteredLocations = applyFilters(locations);
            // Apresenta resultados
            displayResults(filteredLocations, favorites);

        } catch (error) {
            console.error('Erro ao buscar estabelecimentos:', error);
            const message = 'Erro ao buscar estabelecimentos. Tente novamente.';
            showAlert(message, 'error');
        } finally {
            showLoading(false);
        }
    });

    // METODO PARA FAVORITAR E DESFAVORITAR LOCAIS
    async function toggleFavoriteLocation(location, button) {
        const userEmail = await getUserEmail();
        if (!userEmail) {
            const message = 'Você precisa estar logado para favoritar itens';
            showAlert(message, 'info');
            return;
        }

        // Verifica se elemento esta favoritado
        const isFavorite = button.querySelector('i').classList.contains('bi-star-fill');
        try {
            // Se sim, desfavorita
            if (isFavorite) {
                const response = await fetch(`/favorites/delete-location/${location.codigo_cnes}`, {
                    method: 'DELETE',
                    credentials: 'include',
                    headers: {
                        'Accept': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error(`Erro ao remover local: ${response.status}`);
                }
                updateButtonState(button, false);
            } else { // Se não, favorita
                const medicine = `${selectedMedicine.principio_ativo} | ${selectedMedicine.concentracao} | ${selectedMedicine.forma_farmaceutica}`
                const response = await fetch(`/favorites/save-location?medicine=${encodeURIComponent(medicine)}`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify(location),
                });
                if (!response.ok) {
                    throw new Error(`Erro ao salvar local: ${response.status}`);
                }
                updateButtonState(button, true);
            }
        } catch (error) {
            console.error('Erro ao favoritar/remover local:', error);
            showAlert('Erro ao atualizar favorito', 'error');
        }
    }

    // ATUALIZA ICONE DO BOTÃO DE FAVORITO
    function updateButtonState(button, isFavorite) {
        const icon = button.querySelector('i');
        if (isFavorite) {
            icon.classList.remove('bi-star');
            icon.classList.add('bi-star-fill');
        } else {
            icon.classList.remove('bi-star-fill');
            icon.classList.add('bi-star');
        }
    }

    // APLICA FILTROS DE BUSCA
    function applyFilters(locations) {
        const cepFilter = document.getElementById('cepInput')?.value.trim().replace(/\D/g, '') || '';
        const neighborhoodFilter = document.getElementById('neighborhoodInput')?.value.trim().toLowerCase() || '';

        let filtered = locations;

        if (cepFilter) {
            filtered = filtered.filter(location => {
                const locationCep = (location.cep || '').replace(/\D/g, '');
                return locationCep.includes(cepFilter);
            });
        }

        if (neighborhoodFilter) {
            filtered = filtered.filter(location => {
                const locationNeighborhood = (location.bairro || '').toLowerCase();
                return locationNeighborhood.includes(neighborhoodFilter);
            });
        }

        return filtered;
    }

    // APRESENTA RESULTADOS DA BUSCA - LOCAIS
    function displayResults(locations, favorites) {
        // Pega elementos HMTL
        const container = document.getElementById('resultsContainer');
        const resultsSection = document.getElementById('resultsSection');
        const template = document.getElementById('location-card-template');

        container.innerHTML = '';

        // Verifica se há medicamentos no array
        if (locations.length === 0) {
            let message = 'Nenhum estabelecimento encontrado com este medicamento em estoque';
            showAlert(message, 'info');
            resultsSection.classList.remove('d-none');
            return;
        }

        const message = `${locations.length} estabelecimento(s) encontrado(s)`;
        showAlert(message, 'info')

        // PREENCHE TEMPLATE HTML PARA CARD DE LOCAL
        locations.forEach(location => {
            const clone = template.content.cloneNode(true);

            clone.querySelector('[data-field="name"]').textContent = location.nome_fantasia || location.razao_social || 'Não informado';
            clone.querySelector('[data-field="street"]').textContent = location.logradouro || 'Não informado';
            clone.querySelector('[data-field="number"]').textContent = location.numero_endereco || 'S/N';
            clone.querySelector('[data-field="neighborhood"]').textContent = location.bairro || 'Não informado';
            clone.querySelector('[data-field="city"]').textContent = location.municipio || 'Não informado';
            clone.querySelector('[data-field="state"]').textContent = location.uf || 'SP';
            clone.querySelector('[data-field="cep"]').textContent = formatCEP(location.cep) || 'Não informado';
            clone.querySelector('[data-field="phone"]').textContent = location.telefone || 'Não informado';

            const favoriteSaveButton = clone.querySelector('.location-btn');
            const isLocationFavorite = favorites.locations && favorites.locations.some(loc => loc.codigo_cnes === location.codigo_cnes);
            updateButtonState(favoriteSaveButton, isLocationFavorite);
            favoriteSaveButton.addEventListener('click', () => toggleFavoriteLocation(location, favoriteSaveButton));

            container.appendChild(clone);
        });

        resultsSection.classList.remove('d-none');
    }

    // PEGA EMAIL DO USUÁRIO - VERIFICA SE ESTÁ LOGADO
    async function getUserEmail() {
        try {
            const response = await fetch('/user/email', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error(`Erro ao recuperar email: ${response.status}`);
            }

            const data = await response.json();
            return data.email || data;

        } catch (error) {
            console.error(error.message);
            return null;
        }
    }

    // APRESENTA ELEMENTOS DE CARREGAMENTO NO BOTÃO
    function showLoading(show) {
        const medicineInput = document.getElementById('medicineInput');
        const cepInput = document.getElementById('cepInput');
        const neighborhoodInput = document.getElementById('neighborhoodInput');
        const button = document.getElementById('searchButton');
        const searchText = document.getElementById('searchText');
        const spinner = document.getElementById('spinner');

        if (!medicineInput || !cepInput || !neighborhoodInput || !button || !searchText || !spinner) {
            console.error('Elementos de loading não encontrados:', {
                medicineInput: !!medicineInput,
                cepInput: !!cepInput,
                neighborhoodInput: !!neighborhoodInput,
                button: !!button,
                searchText: !!searchText,
                spinner: !!spinner
            });
            return;
        }

        if (show) {
            medicineInput.disabled = true;
            cepInput.disabled = true;
            neighborhoodInput.disabled = true;
            button.disabled = true;
            searchText.textContent = 'Buscando...';
            spinner.classList.remove('d-none');
        } else {
            medicineInput.disabled = false;
            cepInput.disabled = false;
            neighborhoodInput.disabled = false;
            button.disabled = false;
            searchText.textContent = 'Buscar Estabelecimentos';
            spinner.classList.add('d-none');
        }
    }

    // REGEX PARA FORMATAR CEP
    function formatCEP(cep) {
        if (!cep) return '';
        return cep.replace(/(\d{5})(\d{3})/, '$1-$2');
    }

    // APRESENTA ALERTAS
    function showAlert(message, type) {

        if(type === 'error') {
            const errorElement = document.getElementById('errorMessage');
            errorElement.textContent = message;
            errorElement.classList.remove('d-none');
        } else if (type === 'info') {
            const infoMessage = document.getElementById('infoMessage');
            infoMessage.textContent = message;
            infoMessage.classList.remove('d-none');

        }
    }

    // ESCONDE ALERTAS
    function hideAlert() {
        const errorElement = document.getElementById('errorMessage');
        if (errorElement) {
            errorElement.classList.add('d-none');
        }
    }

});