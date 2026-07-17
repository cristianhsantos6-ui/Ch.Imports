
// ESTADO DO CARRINHO

let carrinho = [];

// ELEMENTOS FIXOS DA PÁGINA

const elementoSubtotalGeral = document.getElementById("subtotal");
const elementoTotalGeral = document.getElementById("total");
const botaoFinalizar = document.getElementById("finalizar");

// FUNÇÕES AUXILIARES

function formatarMoeda(valor) {
    return "R$ " + valor.toFixed(2).replace(".", ",");
}

function obterDadosProduto(elementoProduto) {
    return {
        nome: elementoProduto.querySelector("h2").textContent,
        preco: Number(elementoProduto.dataset.preco),
        inputQuantidade: elementoProduto.querySelector("input[type='number']"),
        elementoValorItem: elementoProduto.querySelector(".valor-item")
    };
}

// Garante que a quantidade seja sempre um número inteiro positivo (>= 1)
function validarQuantidade(input) {
    let valor = parseInt(input.value, 10);

    if (isNaN(valor) || valor < 1) {
        valor = 1;
    }

    input.value = valor;
    return valor;
}

// Atualiza o subtotal exibido dentro do próprio produto
function atualizarValorItem(elementoProduto, preco, quantidade) {
    const elementoValorItem = elementoProduto.querySelector(".valor-item");
    if (elementoValorItem) {
        elementoValorItem.textContent = formatarMoeda(preco * quantidade);
    }
}

// CARRINHO (lógica de dados)

function adicionarOuAtualizarItem(nome, preco, quantidade) {
    const itemExistente = carrinho.find(item => item.nome === nome);

    if (itemExistente) {
        itemExistente.quantidade = quantidade;
    } else {
        carrinho.push({ nome, preco, quantidade });
    }
}

function removerItem(nome) {
    carrinho = carrinho.filter(item => item.nome !== nome);
}

function calcularTotalGeral() {
    return carrinho.reduce((soma, item) => soma + (item.preco * item.quantidade), 0);
}

// ATUALIZAÇÃO DA INTERFACE

function atualizarResumo() {
    const totalGeral = calcularTotalGeral();

    elementoSubtotalGeral.textContent = formatarMoeda(totalGeral);
    elementoTotalGeral.textContent = formatarMoeda(totalGeral);
}


// EVENTOS: QUANTIDADE (input em tempo real)

document.querySelectorAll(".produto").forEach(elementoProduto => {

    const { nome, preco, inputQuantidade } = obterDadosProduto(elementoProduto);

    inputQuantidade.addEventListener("input", () => {
        const quantidade = validarQuantidade(inputQuantidade);

        // Atualiza o subtotal visual do item
        atualizarValorItem(elementoProduto, preco, quantidade);

        // Se o produto já estiver no carrinho, mantém o total geral sincronizado
        const itemExistente = carrinho.find(item => item.nome === nome);
        if (itemExistente) {
            itemExistente.quantidade = quantidade;
            atualizarResumo();
        }
    });
});

// EVENTOS: ADICIONAR

document.querySelectorAll(".adicionar").forEach(botao => {

    botao.addEventListener("click", () => {
        const elementoProduto = botao.closest(".produto");
        const { nome, preco, inputQuantidade } = obterDadosProduto(elementoProduto);

        const quantidade = validarQuantidade(inputQuantidade);

        adicionarOuAtualizarItem(nome, preco, quantidade);
        atualizarValorItem(elementoProduto, preco, quantidade);
        atualizarResumo();
    });
});


// EVENTOS: REMOVER


document.querySelectorAll(".remover").forEach(botao => {

    botao.addEventListener("click", () => {
        const elementoProduto = botao.closest(".produto");
        const { nome, preco, inputQuantidade } = obterDadosProduto(elementoProduto);

        removerItem(nome);

        // Reseta a quantidade e o subtotal visual do item removido
        inputQuantidade.value = 1;
        atualizarValorItem(elementoProduto, preco, 1);

        atualizarResumo();
    });
});

// EVENTO: FINALIZAR COMPRA


botaoFinalizar.addEventListener("click", () => {

    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    let mensagem = "Produtos da compra:\n\n";

    carrinho.forEach(item => {
        mensagem += `${item.nome} - ${item.quantidade}x (${formatarMoeda(item.preco * item.quantidade)})\n`;
    });

    mensagem += `\nTotal: ${elementoTotalGeral.textContent}`;

    alert(mensagem);

});