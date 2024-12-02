// Função para capturar o formulário de login e fazer a requisição
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário

    // Obter os valores dos campos de e-mail e senha
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Validar se ambos os campos estão preenchidos
    if (!email || !password) {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    // Criar o objeto para a requisição
    const loginData = {
        email: email,
        password: password
    };

    // Realizar a requisição para a API de login
    fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Login bem-sucedido!') {
            // Armazenar as informações no localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('name', data.name);
            localStorage.setItem('type', data.type);

            // Redirecionar o usuário após o login bem-sucedido
            window.location.href = '/dashboard'; // Ou para outra página de sua escolha
        } else {
            // Exibir mensagem de erro se a resposta não for sucesso
            alert('Erro ao fazer login: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Erro na requisição:', error);
        alert('Ocorreu um erro. Tente novamente.');
    });
});
