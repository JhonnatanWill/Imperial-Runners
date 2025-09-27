document.addEventListener('DOMContentLoaded', function() {
    const idGeradoElement = document.getElementById('idGerado');
    const fotoPerfilInput = document.getElementById('fotoPerfilInput');
    const avatarImage = document.getElementById('avatarImage');
    const concluirButton = document.getElementById('concluir');
    const idIndicanteInput = document.getElementById('idIndicante');

    const idGerado = sessionStorage.getItem('usuarioID');

    if (idGerado) {
        idGeradoElement.innerText = idGerado;
    } else {
        window.location.href = 'index.html';
    }

    fotoPerfilInput.addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                avatarImage.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // Lógica para o botão "Concluir"
    concluirButton.addEventListener('click', function() {
        const idIndicante = idIndicanteInput.value.trim();
        const fotoPerfil = fotoPerfilInput.files[0];

        console.log('ID do Usuário:', idGerado);
        console.log('ID do Indicante:', idIndicante);
        console.log('Foto de Perfil:', fotoPerfil ? fotoPerfil.name : 'Nenhuma');

        // Limpa o ID do armazenamento de sessão, pois não será mais necessário
        sessionStorage.removeItem('usuarioID');

        // Redireciona o usuário para a página de produtos
        window.location.href = 'produtos.html';
    });
});