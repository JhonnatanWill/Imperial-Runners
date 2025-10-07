// --- BASE DE DADOS SIMPLIFICADA PARA ESTADOS/CIDADES ---
// O VALOR (value) DE CADA ESTADO É A SIGLA (ex: 'SP'), que usaremos para o ID.
const estadosCidades = {
    'AC': ['Rio Branco', 'Cruzeiro do Sul'],
    'AM': ['Manaus', 'Parintins'],
    'BA': ['Salvador', 'Feira de Santana'],
    'MG': ['Belo Horizonte', 'Contagem', 'Uberlândia'],
    'PR': ['Curitiba', 'Londrina'],
    'RJ': ['Rio de Janeiro', 'Niterói'],
    'SP': ['São Paulo', 'Campinas', 'Santos', 'Ribeirão Preto']
};

// --- FUNÇÕES DE LÓGICA E POPULAÇÃO DOS DROPDOWNS ---

function popularEstados() {
    const selectEstado = document.getElementById('estado');
    const siglas = Object.keys(estadosCidades).sort(); // Pega as siglas e ordena

    siglas.forEach(sigla => {
        const option = document.createElement('option');
        option.value = sigla; // O VALOR É A SIGLA!
        option.textContent = sigla;
        selectEstado.appendChild(option);
    });
}

function popularCidades(siglaEstado) {
    const selectCidade = document.getElementById('cidade');
    
    // Limpa opções antigas
    selectCidade.innerHTML = '<option value="">Selecione a Cidade</option>'; 
    
    if (siglaEstado && estadosCidades[siglaEstado]) {
        const cidades = estadosCidades[siglaEstado].sort(); // Pega as cidades e ordena
        
        cidades.forEach(cidade => {
            const option = document.createElement('option');
            option.value = cidade;
            option.textContent = cidade;
            selectCidade.appendChild(option);
        });
        selectCidade.disabled = false; // Habilita a lista de cidades
    } else {
        selectCidade.disabled = true; // Desabilita se nenhum estado for selecionado
    }
}

// --- LÓGICA DO ID E SUBMISSÃO DO FORMULÁRIO (Ajustada) ---

function gerarNovoNumeroSequencial() {
    let ultimoIdNumero = localStorage.getItem('ultimoIdNumero');
    if (ultimoIdNumero === null) {
        ultimoIdNumero = 0;
    } else {
        ultimoIdNumero = parseInt(ultimoIdNumero);
    }
    let novoNumero = ultimoIdNumero + 1;
    localStorage.setItem('ultimoIdNumero', novoNumero);
    return String(novoNumero).padStart(6, '0');
}

document.addEventListener('DOMContentLoaded', function() {
    // 1. POPULA OS ESTADOS ASSIM QUE A PÁGINA CARREGA
    popularEstados();

    const selectEstado = document.getElementById('estado');
    const form = document.getElementById('cadastroForm');

    // 2. ESCUTA A MUDANÇA NO CAMPO ESTADO
    selectEstado.addEventListener('change', function() {
        const siglaSelecionada = this.value; // Captura a sigla (ex: 'SP')
        popularCidades(siglaSelecionada);
    });

    // 3. ESCUTA A SUBMISSÃO DO FORMULÁRIO (Lógica do ID)
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // VALIDAÇÃO BÁSICA PARA GARANTIR QUE OS CAMPOS NÃO ESTÃO VAZIOS
        if (selectEstado.value === "" || document.getElementById('cidade').value === "") {
             alert("Por favor, selecione o Estado e a Cidade.");
             return;
        }

        // --- AQUI A SIGLA É CAPTURADA DIRETAMENTE DO VALOR DO SELECT ---
        const estadoSigla = selectEstado.value.toUpperCase(); 
        
        const numeroSequencial = gerarNovoNumeroSequencial();
        
        // Monta o ID final: [000001] + [SP] + BR
        const novoID = numeroSequencial + estadoSigla + 'BR';
        
        localStorage.setItem('usuarioID', novoID);

        // Redireciona para a página de perfil
        window.location.href = 'perfil.html';
    });
});

// --- LÓGICA PARA EXIBIR O ID NA PÁGINA DE PERFIL (Mantida) ---
if (window.location.pathname.includes('perfil.html')) {
    const usuarioID = localStorage.getItem('usuarioID');
    const elementoID = document.getElementById('perfilIdGerado');

    if (usuarioID && elementoID) {
        elementoID.textContent = usuarioID;
    } 
    // Outras validações de perfil.js continuam válidas.
}