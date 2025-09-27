document.getElementById('cadastroForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const nomeCompleto = document.getElementById('nomeCompleto').value.trim();
    const dataNascimento = document.getElementById('dataNascimento').value;
    const cidade = document.getElementById('cidade').value.trim();
    const estado = document.getElementById('estado').value.trim();

    const partesNome = nomeCompleto.split(' ');
    const primeiroNome = partesNome[0];
    const ultimoNome = partesNome[partesNome.length - 1];
    
    const tresPrimeirasNome = primeiroNome.substring(0, 3).toUpperCase();
    const tresUltimasNome = ultimoNome.length >= 3 ? ultimoNome.substring(ultimoNome.length - 3).toUpperCase() : ultimoNome.toUpperCase();
    
    const partesData = dataNascimento.split('-');
    const dia = partesData[2];
    const mes = partesData[1];
    
    const duasPrimeirasCidade = cidade.substring(0, 2).toUpperCase();
    const siglaEstado = estado.substring(0, 2).toUpperCase();
    
    const idGerado = `${tresPrimeirasNome}${tresUltimasNome}${dia}${mes}${duasPrimeirasCidade}${siglaEstado}`;

    // Armazena o ID no armazenamento de sessão
    sessionStorage.setItem('usuarioID', idGerado);

    // Redireciona o usuário para a página de perfil
    window.location.href = 'perfil.html';
});