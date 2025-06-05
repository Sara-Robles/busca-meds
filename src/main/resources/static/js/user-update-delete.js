document.addEventListener('DOMContentLoaded', async function() {

    // Oculta página de login
    document.getElementById('loginLink').classList.add('d-none');

    const nameInput = document.getElementById('nameInput');
    const emailInput = document.getElementById('emailInput');
    const passwordInput = document.getElementById('passwordInput');

    try {
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
    } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
    }

    console.log('Campos de input:', nameInput.value, emailInput.value, passwordInput.value);

    // ATUALIZAR USUÁRIO
    document.getElementById('updateButton').addEventListener('click', async function(){

        // Atribui os valores dos inputs nas variáveis
        const newName = document.getElementById('nameInput').value;
        const newEmail = document.getElementById('emailInput').value;
        const newPassword = document.getElementById('passwordInput').value;

        // Verifica se algum campo está vazio
        if(!newName.trim() || !newEmail.trim() || !newPassword.trim()) {
            showAlert('Preencha todos os campos', 'error')
            return
        }

        try {
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
                        showAlert('Atualização bem-sucedida!', 'info');

                    } else {
                        showAlert('Não foi possível atualizar os dados!', 'error');
                    }
                })

        } catch (error) {
            console.error('Erro na requisição:', error);
        }
    });

    // EXCLUIR USUÁRIO
    document.getElementById('deleteButton').addEventListener('click', async function() {
        try {
            const email = emailInput.value;
            const response = await fetch(`/user/delete/${email}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                showAlert('Não foi possível deletar o usuário', 'error');
                return
            }

            showAlert('Usuário deletado com sucesso! Redirecionando...', 'info');

            // Redirecionar para home
            setTimeout(() => window.location.href = '/buscameds/home', 2000);


        } catch (error) {
            console.error('Erro na requisição:', error);
        }
    });

    // APRESENTA ALERTA
    function showAlert(message, type) {
        if(type === 'error') {
            const errorElement = document.getElementById('errorMessage');
            errorElement.textContent = message;
            errorElement.classList.remove('d-none');
            setTimeout(() => hideAlert(), 2000);
        } else if (type === 'info') {
            const infoMessage = document.getElementById('infoMessage');
            infoMessage.textContent = message;
            infoMessage.classList.remove('d-none');
            setTimeout(() => hideAlert(), 2000);
        }
    }

    // ESCONDE ALERTAS
    function hideAlert() {
        const errorElement = document.getElementById('errorMessage');
        const infoElement = document.getElementById('infoMessage')

        if (errorElement) {
            errorElement.classList.add('d-none');
        }

        if (infoElement) {
            infoElement.classList.add('d-none');
        }

    }
});