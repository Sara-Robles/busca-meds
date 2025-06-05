    document.addEventListener('DOMContentLoaded', async function() {

        // BOTÃO ATUALIZAR CONTA
        document.getElementById('updatePageButton').addEventListener('click', async function () {
            window.location.href = '/buscameds/user/update';
        });

        // Apresenta os botões de alterar conta e logout
        document.getElementById('updatePageButton').classList.remove('d-none');
        document.getElementById('logoutButton').classList.remove('d-none');

        // VERIFICA SE USUARIO ESTA LOGADO
        // REMOVE OU APRESENTA LINKS
        let userEmail = await getUserEmail();

        // SE USUÁRIO NÃO ESTIVER LOGADO
        if (!userEmail) {
            const message = 'Você precisa estar logado para ver os favoritos';
            showAlert(message, 'info');

            document.getElementById('loginLink').classList.remove('d-none');
            document.getElementById('updatePageButton').classList.add('d-none');
            document.getElementById('logoutButton').classList.add('d-none');
            return;

        // SE USUÁRIO ESTIVER LOGADO
        } else {
            document.getElementById('loginLink').classList.add('d-none');

            // APRESENTA FAVORITOS
            await fetchFavorites();
        }

        // PEGA FAVORITOS DO USUARIO
        async function fetchFavorites() {
            try {
                const response = await fetch('/favorites/list', {
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
                console.log('Favoritos retornados:', favorites);

                displayFavorites(favorites);

            } catch (error) {
                console.error('Erro ao carregar favoritos:', error);
                showAlert('Erro ao carregar favoritos', 'error');
            }
        }

       // APRESENTA FAVORITOS
        function displayFavorites(favorites) {
            const locationsContainer = document.getElementById('locationsContainer');
            locationsContainer.innerHTML = '';

            if (favorites.locations && favorites.locations.length > 0) {
                favorites.locations.forEach(location => {
                    const card = createLocationCard(location, true);
                    locationsContainer.appendChild(card);
                });
            } else {
                showAlert('Nenhum local favoritado', 'info')
            }
        }

        // CRIA CARD PARA LOCAL
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
            clone.querySelector('[data-field="medicine"]').textContent = location.medicamento || 'Não informado';

            const saveButton = clone.querySelector('button');
            updateButtonState(saveButton, isFavorite);
            saveButton.addEventListener('click', () => toggleFavoriteLocation(location, saveButton));

            return clone;
        }



        // FAVORITAS OU DESFAVORITAR LOCAIS
        async function toggleFavoriteLocation(location, button) {
            const isFavorite = button.classList.contains('btn-warning');
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
                        showAlert('Nenhum locaol favoritado', 'info');
                    }
                    button.closest('.card').remove();
                    updateButtonState(button, false);
                    showAlert(`Local '${location.nome_fantasia}' removido`, 'info');
                    await fetchFavorites();
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
                    await fetchFavorites();
                }
            } catch (error) {
                console.error('Erro ao favoritar/remover local:', error);
                showAlert('Erro ao atualizar favorito', 'error');
            }
        }

        // ATUALIZA ICONE BOTÃO
        function updateButtonState(button, isFavorite) {
            if (isFavorite) {
                button.classList.remove('btn-outline-warning');
                button.classList.add('btn-warning');
                button.querySelector('i').className = 'bi-star-fill';
            } else {
                button.classList.remove('btn-warning');
                button.classList.add('btn-outline-warning');
                button.querySelector('i').className = 'bi-star';
            }
        }

        // PEGA EMAIL DO USUARION PELO ENDPOINT
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


        // APRESENTA ALERTA
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

        // Format CEP
        function formatCEP(cep) {
            if (!cep) return '';
            return cep.replace(/(\d{5})(\d{3})/, '$1-$2');
        }


    });