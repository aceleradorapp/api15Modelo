window.onload = function() {
    const userName = localStorage.getItem('name');
    const userType = localStorage.getItem('type');
    const token = localStorage.getItem('token');

    document.getElementById('user-name').textContent = userName;

    document.getElementById('logout-link').addEventListener('click', function() {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        localStorage.removeItem('type');
        
        window.location.href = '/';
    });


    // Mostrar/ocultar menu dropdown ao clicar
    const dropdownBtn = document.querySelector('.dropdown-btn');
    const dropdownContent = document.querySelector('.dropdown-content');

    // Controlar a visibilidade do menu suspenso
    dropdownBtn.addEventListener('click', function(event) {
        event.stopPropagation(); // Impede que o clique no botão feche o menu imediatamente
        dropdownContent.style.display = (dropdownContent.style.display === 'block') ? 'none' : 'block';
    });

    // Fechar o menu se clicar fora
    document.addEventListener('click', function(event) {
        if (!dropdownBtn.contains(event.target) && !dropdownContent.contains(event.target)) {
            dropdownContent.style.display = 'none';
        }
    });
};
