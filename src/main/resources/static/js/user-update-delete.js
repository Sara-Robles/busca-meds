document.addEventListener('DOMContentLoaded', async function() {

    // Oculta página de login
    document.getElementById('loginLink').classList.add('d-none');

    const nameInput = document.getElementById('nameInput');
    const emailInput = document.getElementById('emailInput');

    fetch('/user/data')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na requisição: ' + response.status);
            }
            return response.json();
        })
        .then(userObj => {
            const user = userObj.data; // Acessa o objeto user dentro de data
            nameInput.value = user.name; // Preenche o campo name
            emailInput.value = user.email; // Preenche o campo email
            emailInput.disabled = true; // Desabilita o campo email
            console.log('Usuário:', user); // Loga o objeto user
        })
        .catch(error => {
            console.error('Erro ao buscar dados do usuário:', error);
        });

    console.log('Campos de input:', nameInput, emailInput);

    // ATUALIZAR USUÁRIO
    document.getElementById('updateButton').addEventListener('click', async function(){

        // Atribui os valores dos inputs nas variáveis

        const newName = document.getElementById('nameInput').value;
        const newEmail = document.getElementById('emailInput').value;
        const newPassword = document.getElementById('passwordInput').value;


        fetch('/user/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },

            // Permite enviar e receber cookies
            credentials: 'include',

            // JSON a ser passado para o back-end
            body: JSON.stringify({ name: newName, email: newEmail, password: newPassword })
        })
            .then(response => {
                if (response.ok) {
                    ('Atualização bem-sucedida!');

                } else {
                    showError('Não foi possível atualizar os dados!');
                }
            })
            .catch(error => {
                console.error('Erro na requisição:', error);
            });
    });

    // EXCLUIR USUÁRIO
    document.getElementById('deleteButton').addEventListener('click', async function() {
        try {
            const email = emailInput.value;
            const resposne = fetch(`/user/delete/${email}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                showError('Não foi possível excluir o usuário!');
            }

        } catch (error) {
            console.error('Erro na requisição:', error);
        }
    });

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
});