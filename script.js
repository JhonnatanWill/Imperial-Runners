// Função para gerar o novo ID sequencial no formato 000001
function gerarNovoNumeroSequencial() {
    // Pega o último número armazenado ou começa em 0
    let ultimoIdNumero = localStorage.getItem('ultimoIdNumero');
    if (ultimoIdNumero === null) {
        ultimoIdNumero = 0;
    } else {
        ultimoIdNumero = parseInt(ultimoIdNumero);
    }

    let novoNumero = ultimoIdNumero + 1;

    // Salva o novo número no armazenamento local
    localStorage.setItem('ultimoIdNumero', novoNumero);

    // Formata o número para ter 6 dígitos, preenchendo com zeros
    return String(novoNumero).padStart(6, '0');
}

document.getElementById('cadastroForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // 1. Pega o valor do estado (e garante que esteja em letras maiúsculas)
    const estado = document.getElementById('estado').value.toUpperCase();

    // 2. Gera a parte sequencial do ID
    const numeroSequencial = gerarNovoNumeroSequencial();

    // 3. Monta o ID final
    // Formato: [000001] + [SP] + BR
    const novoID = numeroSequencial + estado + 'BR';
    
    // 4. ARMAZENA O ID NO LOCALSTORAGE
    localStorage.setItem('usuarioID', novoID);

    // 5. Redireciona para a página de perfil (simulando um cadastro bem-sucedido)
    window.location.href = 'perfil.html';
});