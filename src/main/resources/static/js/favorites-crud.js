

    // Containers for medicines and locations
    const medicinesContainer = document.createElement('div');
    medicinesContainer.className = 'row';
    document.querySelector('.col:nth-child(1)').appendChild(medicinesContainer);

    const locationsContainer = document.createElement('div');
    locationsContainer.className = 'row';
    document.querySelector('.col:nth-child(2)').appendChild(locationsContainer);

    // Função que busca os favoritos
    async function fetchFavorites() {
        try {
            const response = await fetch('/buscameds/favorites', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                }
            });


            if (!response.ok) {
                throw new Error(`Erro ao buscar favoritos: ${response.status}`);
            }

            const favorites = await response.json();
            console.log('Favoritos:', favorites);

            displayFavorites(favorites);

        } catch (error) {
            console.error('Erro ao carregar favoritos:', error);
        }
    }

    // Display favorites in their respective sections
    function displayFavorites(favorites) {
        medicinesContainer.innerHTML = '';
        locationsContainer.innerHTML = '';

        if (favorites.medicines && favorites.medicines.length > 0) {
            favorites.medicines.forEach(medicine => {
                const card = createMedicineCard(medicine, true);
                medicinesContainer.appendChild(card);
            });
        } else {
            medicinesContainer.innerHTML = '<div class="col-12"><div class="alert alert-info">Nenhum medicamento favoritado</div></div>';
        }

        if (favorites.locations && favorites.locations.length > 0) {
            favorites.locations.forEach(location => {
                const card = createLocationCard(location, true);
                locationsContainer.appendChild(card);
            });
        } else {
            locationsContainer.innerHTML = '<div class="col-12"><div class="alert alert-info">Nenhum local favoritado</div></div>';
        }
    }

    // Create a medicine card
    function createMedicineCard(medicine, isFavorite) {
        const template = document.getElementById('medicine-card-template');
        const clone = template.content.cloneNode(true);

        clone.querySelector('[data-field="name"]').textContent = medicine.principio_ativo || 'Não informado';

        const saveButton = clone.querySelector('button');
        updateButtonState(saveButton, isFavorite);
        saveButton.addEventListener('click', () => toggleFavoriteMedicine(medicine, saveButton));

        return clone;
    }

    // Create a location card
    function createLocationCard(location, isFavorite) {
        const template = document.getElementById('location-card-template');
        const clone = template.content.cloneNode(true);

        clone.querySelector('[data-field="name"]').textContent = location.nome_fantasia || location.razao_social || 'Não informado';
        clone.querySelector('[data-field="street"]').textContent = location.logradouro || 'Não informado';
        clone.querySelector('[data-field="number"]').textContent = location.numero_endereco || 'S/N';
        clone.querySelector('[data-field="neighborhood"]').textContent = location.bairro || 'Não informado';
        clone.querySelector('[data-field="city"]').textContent = location.municipio || 'Não informado';
        clone.querySelector('[data-field="state"]').textContent = location.uf || 'SP';
        clone.querySelector('[data-field="cep"]').textContent = formatCEP(location.cep) || 'Não informado';
        clone.querySelector('[data-field="phone"]').textContent = location.telefone || 'Não informado';

        const saveButton = clone.querySelector('button');
        updateButtonState(saveButton, isFavorite);
        saveButton.addEventListener('click', () => toggleFavoriteLocation(location, saveButton));

        return clone;
    }

    // Toggle favorite status for a medicine
    async function toggleFavoriteMedicine(medicine, button) {
        const isFavorite = button.classList.contains('btn-warning');
        try {
            if (isFavorite) {
                const response = await fetch(`/buscameds/favorites/delete-medicine/${encodeURIComponent(userEmail)}/${medicine.codigo_catmat}`, {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error(`Erro ao remover medicamento: ${response.status}`);
                }
                updateButtonState(button, false);
                fetchFavorites();
            } else {
                const response = await fetch(`/buscameds/favorites/save-medicine?id=${encodeURIComponent(userEmail)}`, {
                    method: 'POST',
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
                fetchFavorites();
            }
        } catch (error) {
            console.error('Erro ao favoritar/remover medicamento:', error);
            showError('Erro ao atualizar favorito');
        }
    }

    // Toggle favorite status for a location
    async function toggleFavoriteLocation(location, button) {
        const isFavorite = button.classList.contains('btn-warning');
        try {
            if (isFavorite) {
                const response = await fetch(`/buscameds/favorites/delete-location/${encodeURIComponent(userEmail)}/${location.cnesCode}`, {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error(`Erro ao remover local: ${response.status}`);
                }
                updateButtonState(button, false);
                fetchFavorites();
            } else {
                const response = await fetch(`/buscameds/favorites/save-location?id=${encodeURIComponent(userEmail)}`, {
                    method: 'POST',
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
                fetchFavorites();
            }
        } catch (error) {
            console.error('Erro ao favoritar/remover local:', error);
            showError('Erro ao atualizar favorito');
        }
    }

    // Update button state (favorited or not)
    function updateButtonState(button, isFavorite) {
        if (isFavorite) {
            button.classList.remove('btn-outline-warning');
            button.classList.add('btn-warning');
            button.querySelector('i').textContent = 'Desfavoritar';
        } else {
            button.classList.remove('btn-warning');
            button.classList.add('btn-outline-warning');
            button.querySelector('i').textContent = 'Favoritar';
        }
    }

    // Show error message
    function showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'alert alert-danger mt-3';
        errorDiv.textContent = message;
        document.querySelector('.container').prepend(errorDiv);
        setTimeout(() => errorDiv.remove(), 3000);
    }

    // Format CEP
    function formatCEP(cep) {
        if (!cep) return '';
        return cep.replace(/(\d{5})(\d{3})/, '$1-$2');
    }

    // Quando a página carregar, chama fetchFavorites
    document.addEventListener('DOMContentLoaded', () => {
        fetchFavorites();
    });