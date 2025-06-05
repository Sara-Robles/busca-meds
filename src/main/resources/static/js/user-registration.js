document.addEventListener('DOMContentLoaded', async function() {

    // CADASTRAR NOVO USUÁRIO
    document.getElementById('registerButton').addEventListener('click', async function(){

        // Atribui os valores dos inputs nas variáveis
        const name = document.getElementById('nameInput').value;
        const email = document.getElementById('emailInput').value;
        const password = document.getElementById('passwordInput').value;

        // Verifica se já existe usuário cadastrado com esse email
        if(await userExistsByEmail(email)) {
            const message = "Usuário já foi cadastrado com esse email"
            showAlert(message, 'error')
            return

        }

        // Verifica se algum campo está vazio
        if(!name.trim() || !email.trim() || !password.trim()) {
            showAlert('Preencha todos os campos', 'error')
            return
        }

        try {

            fetch('/user/registration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },

                // Permite enviar e receber cookies
                credentials: 'include',

                // JSON a ser passado para o back-end
                body: JSON.stringify({ name: name, email: email, password: password })
            })
                .then(response => {
                    if (response.ok) {
                        showAlert('Cadastro bem-sucedido! Redirecionando...', 'info');

                        // Redirecionar para login
                        setTimeout(() => window.location.href = '/buscameds/user/login', 2000);

                    } else {
                        showAlert('Não foi possível realizar o cadastro!','error');
                    }
                })

        } catch(error) {
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

        }
    }

    // ESCONDE ALERTAS
    function hideAlert() {
        const errorElement = document.getElementById('errorMessage');
        if (errorElement) {
            errorElement.classList.add('d-none');
        }
    }

    // VERIFICA SE JÁ EXISTE USUÁRIO CADASTRADO COM ESSE EMAIL
    async function userExistsByEmail(email) {
        try {
            const response = await fetch('/user/list', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                },
                credentials: 'include'
            })
            if (!response.ok) {
                throw new Error(`Erro ao buscar usuários: ${response.status}`);
            }

            const data = await response.json();

            // Verifica se não existem usuários cadastrados
            if (data === null) {
                return false
            }
            console.log('Dados recebidos:', data);

            // Acessa a propriedade 'users' do JSON retornado
            return data.users.some(user => {
                // Compara emails para verificar se já existem
                return user.email === email;
            });

        } catch (error) {
            console.error('Erro na requisição:', error.message);
            console.error('Detalhes do erro:', error);
            return false;
        }
    }
});