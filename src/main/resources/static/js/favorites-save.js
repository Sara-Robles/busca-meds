
const locations = JSON.parse(localStorage.getItem('locations'));

async function saveLocation() {
    try {
        const response = await fetch('/buscameds/favorites/save-location', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(locations)
        });
        if (!response.ok) {
                throw new Error(`Erro ao salvar favorito: ${response.status}`);
            }

        console.log('response:', response);

    } catch (error) {
        console.error('Erro:', error);
    }
}

saveButton.addEventListener('click', () => toggleFavoriteLocation(location, saveButton));

// Toggle favorite status for a location
async function toggleFavoriteLocation(location, button) {
    const isFavorite = button.classList.contains('btn-warning');
    try {
        if (isFavorite) {
            const response = await fetch(`/buscameds/favorites/delete-location/${location.cnesCode}`, {
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
            const response = await fetch('/buscameds/favorites/save-location', {
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
