let medicamentos = [];
let selectedCatmat = '';
let selectedMedicine = null;

document.addEventListener('DOMContentLoaded', async function() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/gabriellabueno/tabela-medicamentos-catmat/refs/heads/main/medicamentos-tabela-catmat.json');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        medicamentos = await response.json();
        console.log('Tabela CATMAT carregada:', medicamentos.length, 'medicamentos');
    } catch (error) {
        console.error('Erro ao carregar tabela CATMAT:', error);
        showError('Erro ao carregar dados dos medicamentos');
        return;
    }

    const medicineInput = document.getElementById('medicineInput');
    const suggestionsList = document.getElementById('suggestionsList');
    const searchButton = document.getElementById('searchButton');

    if (!medicineInput || !suggestionsList || !searchButton) {
        console.error('Elementos DOM não encontrados:', {
            medicineInput: !!medicineInput,
            suggestionsList: !!suggestionsList,
            searchButton: !!searchButton
        });
        showError('Erro: Elementos de busca não encontrados na página');
        return;
    }

    medicineInput.addEventListener('input', function(e) {
        const query = e.target.value.toLowerCase().trim();

        if (query.length < 2) {
            suggestionsList.innerHTML = '';
            suggestionsList.style.display = 'none';
            return;
        }

        console.log('Filtrando medicamentos com query:', query);
        const matches = medicamentos.filter(med => {
            const principioAtivo = med.principio_ativo ? med.principio_ativo.toLowerCase() : '';
            return principioAtivo.includes(query);
        }).slice(0, 10);

        console.log('Sugestões encontradas:', matches);

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

    suggestionsList.addEventListener('click', function(e) {
        const suggestionItem = e.target.closest('.suggestion-item');
        if (suggestionItem) {
            const catmat = suggestionItem.getAttribute('data-catmat');
            const name = suggestionItem.getAttribute('data-name');

            medicineInput.value = name;
            selectedCatmat = catmat;
            selectedMedicine = medicamentos.find(med => med.codigo_catmat === catmat);
            suggestionsList.style.display = 'none';

            console.log('Medicamento selecionado:', name, 'CATMAT:', catmat);
        }
    });

    searchButton.addEventListener('click', async function() {
        if (!selectedCatmat) {
            showError('Por favor, selecione um medicamento da lista de sugestões');
            return;
        }

        const neighborhoodInput = document.getElementById('neighborhoodInput');
        const neighborhood = neighborhoodInput ? neighborhoodInput.value.trim() : '';

        try {
            showLoading(true);
            hideError();

            console.log('Buscando estabelecimentos para CATMAT:', selectedCatmat, 'Neighborhood:', neighborhood);

            const response = await fetch(`/search-locations?catmatCode=${selectedCatmat}&neighborhood=${encodeURIComponent(neighborhood)}`);

            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }

            const locations = await response.json();

            // Armazena os locais para usar em outros JS:
            localStorage.setItem('locations', JSON.stringify(locations));

            console.log('Estabelecimentos encontrados:', locations);

            let favorites = { medicines: [], locations: [] };
            const userEmail = await getUserEmail();
            if (userEmail) {
                const favoritesResponse = await fetch('/favorites/list');
                if (favoritesResponse.ok) {
                    favorites = await favoritesResponse.json();
                }
            }

            const filteredLocations = applyFilters(locations);
            displayResults(filteredLocations, favorites);

        } catch (error) {
            console.error('Erro ao buscar estabelecimentos:', error);
            showError('Erro ao buscar estabelecimentos. Tente novamente.');
        } finally {
            showLoading(false);
        }
    });

    async function toggleFavoriteMedicine(medicine, button) {
        const userEmail = await getUserEmail();
        if (!userEmail) {
            showError('Você precisa estar logado para favoritar itens');
            return;
        }

        const isFavorite = button.querySelector('i').classList.contains('bi-star-fill');
        try {
            if (isFavorite) {
                const response = await fetch(`/favorites/delete-medicine/${medicine.codigo_catmat}`, {
                    method: 'DELETE',
                    credentials: 'include',
                    headers: {
                        'Accept': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error(`Erro ao remover medicamento: ${response.status}`);
                }
                updateButtonState(button, false);
            } else {
                const response = await fetch('/favorites/save-medicine', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify(medicine),
                });
                if (!response.ok) {
                    throw new Error(`Erro ao salvar medicamento: ${response.status}`);
                }
                updateButtonState(button, true);
            }
        } catch (error) {
            console.error('Erro ao favoritar/remover medicamento:', error);
            showError('Erro ao atualizar favorito');
        }
    }

    async function toggleFavoriteLocation(location, button) {
        const userEmail = await getUserEmail();
        if (!userEmail) {
            showError('Você precisa estar logado para favoritar itens');
            return;
        }

        const isFavorite = button.querySelector('i').classList.contains('bi-star-fill');
        try {
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
            } else {
                const response = await fetch('/favorites/save-location', {
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
            showError('Erro ao atualizar favorito');
        }
    }

    function updateButtonState(button, isFavorite) {
        if (!button) {
            console.error('Botão não encontrado para atualização de estado');
            return;
        }
        const icon = button.querySelector('i');
        if (!icon) {
            console.error('Ícone não encontrado no botão:', button);
            return;
        }
        if (isFavorite) {
            icon.classList.remove('bi-star');
            icon.classList.add('bi-star-fill');
        } else {
            icon.classList.remove('bi-star-fill');
            icon.classList.add('bi-star');
        }
    }

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

    function displayResults(locations, favorites) {
        const container = document.getElementById('resultsContainer');
        const resultsSection = document.getElementById('resultsSection');
        const template = document.getElementById('location-card-template');

        if (!container || !resultsSection || !template) {
            console.error('Elementos de resultado não encontrados:', {
                container: !!container,
                resultsSection: !!resultsSection,
                template: !!template
            });
            return;
        }

        container.innerHTML = '';

        if (locations.length === 0) {
            let message = 'Nenhum estabelecimento encontrado com este medicamento em estoque';
            container.innerHTML = `<div class="col-12"><div class="alert alert-info">${message}</div></div>`;
            resultsSection.classList.remove('d-none');
            return;
        }

        const resultCount = document.createElement('div');
        resultCount.className = 'col-12 mb-3';
        resultCount.innerHTML = `<div class="alert alert-success"><strong>${locations.length}</strong> estabelecimento(s) encontrado(s)</div>`;
        container.appendChild(resultCount);

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

            const saveButton = clone.querySelector('.favorite-btn');
            if (!saveButton) {
                console.error('Botão .favorite-btn não encontrado no clone do template:', clone);
                return;
            }
            const isLocationFavorited = favorites.locations && favorites.locations.some(loc => loc.cnesCode === location.cnesCode);
            updateButtonState(saveButton, isLocationFavorited);
            saveButton.addEventListener('click', () => toggleFavoriteLocation(location, saveButton));

            container.appendChild(clone);
        });

        resultsSection.classList.remove('d-none');
    }

    function showError(message) {
        const errorElement = document.getElementById('errorMessage');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.remove('d-none');
        }
    }

    function hideError() {
        const errorElement = document.getElementById('errorMessage');
        if (errorElement) {
            errorElement.classList.add('d-none');
        }
    }

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

    function formatCEP(cep) {
        if (!cep) return '';
        return cep.replace(/(\d{5})(\d{3})/, '$1-$2');
    }

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
});