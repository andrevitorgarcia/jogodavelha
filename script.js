let tabuleiro = ['', '', '', '', '', '', '', '', ''];
let jogadorAtual = '';
let frutaJogador1 = '🍎';
let frutaJogador2 = '🍍';
let jogoAtivo = true;
let modoJogo = '';
let dificuldade = '';

const condicoesVitoria = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const atualizarOpcoesFruta = () => {
    const frutaJogador1 = document.getElementById('fruta-jogador1').value;
    const frutaJogador2Select = document.getElementById('fruta-jogador2');
    const opcoes = ['🍎', '🍍', '🍌', '🍉', '🍇'];
    let opcoesHTML = '';

    opcoes.forEach(fruta => {
        if (fruta !== frutaJogador1) {
            opcoesHTML += `<option value="${fruta}">${fruta}</option>`;
        }
    });

    frutaJogador2Select.innerHTML = opcoesHTML;
};

const iniciarJogo = (modo, dif = '') => {
    modoJogo = modo;
    dificuldade = dif;
    frutaJogador1 = document.getElementById('fruta-jogador1').value;
    frutaJogador2 = document.getElementById('fruta-jogador2').value;

    if (frutaJogador1 === frutaJogador2) {
        document.getElementById('mensagem-erro').innerText = 'Os jogadores não podem escolher a mesma fruta.';
        return;
    }

    jogadorAtual = frutaJogador1;
    document.getElementById('menu').style.display = 'none';
    document.getElementById('tabuleiro').style.display = 'grid';
    document.querySelector('button[onclick="reiniciarJogo()"]').style.display = 'block';
    document.querySelector('button[onclick="voltarMenu()"]').style.display = 'block';
    document.getElementById('mensagem-erro').innerText = '';
};

const voltarMenu = () => {
    reiniciarJogo();
    document.getElementById('menu').style.display = 'block';
    document.getElementById('tabuleiro').style.display = 'none';
    document.querySelector('button[onclick="reiniciarJogo()"]').style.display = 'none';
    document.querySelector('button[onclick="voltarMenu()"]').style.display = 'none';
};

const fazerJogada = (elemento, indice) => {
    if (tabuleiro[indice] === '' && jogoAtivo) {
        tabuleiro[indice] = jogadorAtual;
        elemento.innerHTML = jogadorAtual;
        if (checarVencedor()) {
            document.getElementById('mensagem').innerHTML = `${jogadorAtual} venceu!`;
            jogoAtivo = false;
        } else if (!tabuleiro.includes('')) {
            document.getElementById('mensagem').innerHTML = 'Deu velha!';
            jogoAtivo = false;
        } else {
            jogadorAtual = jogadorAtual === frutaJogador1 ? frutaJogador2 : frutaJogador1;
            if (modoJogo === 'ia' && jogadorAtual === frutaJogador2) {
                fazerJogadaIA();
            }
        }
    }
};

const fazerJogadaIA = () => {
    let celulasDisponiveis = tabuleiro.map((valor, indice) => valor === '' ? indice : null).filter(valor => valor !== null);
    let jogada;
    switch (dificuldade) {
        case 'facil':
            jogada = celulasDisponiveis[Math.floor(Math.random() * celulasDisponiveis.length)];
            break;
        case 'medio':
            jogada = encontrarMelhorJogadaMedio();
            break;
        case 'dificil':
            jogada = encontrarMelhorJogadaDificil();
            break;
        default:
            jogada = celulasDisponiveis[Math.floor(Math.random() * celulasDisponiveis.length)];
    }
    setTimeout(() => {
        document.getElementById(`celula-${jogada}`).click();
    }, 500);
};

const encontrarMelhorJogadaMedio = () => {
    let celulasDisponiveis = tabuleiro.map((valor, indice) => valor === '' ? indice : null).filter(valor => valor !== null);
    return celulasDisponiveis[Math.floor(Math.random() * celulasDisponiveis.length)];
};

const encontrarMelhorJogadaDificil = () => {
    let celulasDisponiveis = tabuleiro.map((valor, indice) => valor === '' ? indice : null).filter(valor => valor !== null);
    return celulasDisponiveis[0];
};

const checarVencedor = () => {
    for (let i = 0; i < condicoesVitoria.length; i++) {
        const [a, b, c] = condicoesVitoria[i];
        if (tabuleiro[a] && tabuleiro[a] === tabuleiro[b] && tabuleiro[a] === tabuleiro[c]) {
            return true;
        }
    }
    return false;
};

const reiniciarJogo = () => {
    tabuleiro = ['', '', '', '', '', '', '', '', ''];
    jogadorAtual = frutaJogador1;
    jogoAtivo = true;
    document.querySelectorAll('.celula').forEach(celula => celula.innerHTML = '');
    document.getElementById('mensagem').innerHTML = '';
    document.getElementById('linha-vencedora').style.display = 'none';
};
