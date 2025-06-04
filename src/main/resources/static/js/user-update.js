document.addEventListener('DOMContentLoaded', async function() {

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
                'Content-Type': 'application/json'
            },

            // Permite enviar e receber cookies
            credentials: 'include',

            // JSON a ser passado para o back-end
            body: JSON.stringify({ name: newName, email: newEmail, password: newPassword })
        })
            .then(response => {
                if (response.ok) {
                    alert('Atualização bem-sucedida!');

                } else {
                    alert('Não foi possível atualizar os dados!');
                }
            })
            .catch(error => {
                console.error('Erro na requisição:', error);
            });
    });

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