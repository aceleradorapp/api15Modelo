document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.getElementById('registerForm');
    
    if (registerForm) {
        registerForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const password = document.getElementById('password').value;
            const passwordConfirm = document.getElementById('passwordConfirm').value;

            // Validação de campos
            if (!name || !email || !phone || !password || !passwordConfirm) {
                alert("Por favor, preencha todos os campos.");
                return;
            }

            if (password !== passwordConfirm) {
                alert("As senhas não coincidem.");
                return;
            }

            // Dados a serem enviados para a API
            const userData = {
                name: name,
                email: email,
                phone: phone,
                password: password
            };

            try {
                const response = await fetch('http://localhost:3000/api/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userData)
                });

                const result = await response.json();

                if (response.ok) {
                    // Caso a criação do usuário seja bem-sucedida
                    localStorage.setItem('userName', result.user.name);
                    localStorage.setItem('userEmail', result.user.email);
                    localStorage.setItem('userRole', result.user.roles);

                    alert('Usuário criado com sucesso!');

                    // Redirecionar para a página de login ou home
                    window.location.href = '/login';  // Ou qualquer rota que desejar
                } else {
                    alert(result.message || 'Erro ao criar usuário.');
                }

            } catch (error) {
                console.error('Erro ao cadastrar o usuário:', error);
                alert('Ocorreu um erro. Tente novamente.');
            }
        });
    } else {
        console.error('Formulário de cadastro não encontrado.');
    }
});
