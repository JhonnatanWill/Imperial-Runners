document.addEventListener('DOMContentLoaded', function() {
    // Busca o ID do usuário, que foi salvo no localStorage
    const usuarioID = localStorage.getItem('usuarioID');
    
    const idGeradoElement = document.getElementById('perfilIdGerado');
    const fotoPerfilInput = document.getElementById('fotoPerfilInput');
    const avatarImage = document.getElementById('avatarImage');
    const concluirButton = document.getElementById('concluir');
    const idIndicanteInput = document.getElementById('idIndicante');
    
    // ----------------------------------------------------
    // LÓGICA DE EXIBIÇÃO E VALIDAÇÃO DO ID
    // ----------------------------------------------------
    if (usuarioID) {
        // Exibe o ID no elemento correto
        idGeradoElement.textContent = usuarioID;
    } else {
        // Se o ID não existir (usuário tentou acessar diretamente), redireciona
        idGeradoElement.textContent = "ID não encontrado. Redirecionando...";
        alert("Acesso negado. Por favor, cadastre-se primeiro.");
        window.location.href = 'index.html';
        return; // Para o restante da execução
    }

    // ----------------------------------------------------
    // LÓGICA DE UPLOAD DE FOTO (Mantida)
    // ----------------------------------------------------
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

    // ----------------------------------------------------
    // LÓGICA para o botão "Concluir" (Mantida)
    // ----------------------------------------------------
    concluirButton.addEventListener('click', function() {
        const idIndicante = idIndicanteInput.value.trim();
        const fotoPerfil = fotoPerfilInput.files[0];

        // O ID do usuário (usuarioID) já está na variável acima

        // Opcional: Aqui você faria o envio final dos dados
        console.log('ID do Usuário:', usuarioID);
        console.log('ID do Indicante:', idIndicante);
        console.log('Foto de Perfil:', fotoPerfil ? fotoPerfil.name : 'Nenhuma');

        // Limpa o ID de usuário do armazenamento (pois a sessão de cadastro terminou)
        localStorage.removeItem('usuarioID');

        // Redireciona o usuário para a página de produtos
        window.location.href = 'produtos.html';
    });
});