// ESTADO DO CARRINHO

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

// ELEMENTOS FIXOS DA PÁGINA

const elementoSubtotalGeral = document.getElementById("subtotal");
const elementoTotalGeral = document.getElementById("total");
const botaoFinalizar = document.getElementById("finalizar");
const listaCarrinho = document.getElementById("itens-carrinho"); // container onde os itens serão exibidos (só existe em carrinho.html)

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

// Salva o estado atual do carrinho no localStorage
function salvarCarrinho() {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

// CARRINHO (lógica de dados)

function adicionarOuAtualizarItem(nome, preco, quantidade) {
    const itemExistente = carrinho.find(item => item.nome === nome);

    if (itemExistente) {
        itemExistente.quantidade = quantidade;
    } else {
        carrinho.push({ nome, preco, quantidade });
    }

    salvarCarrinho();
}

function removerItem(nome) {
    carrinho = carrinho.filter(item => item.nome !== nome);
    salvarCarrinho();
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

// Renderiza os itens do carrinho na página carrinho.html
function renderizarCarrinho() {
    if (!listaCarrinho) return; // só executa se o container existir na página

    listaCarrinho.innerHTML = "";

    if (carrinho.length === 0) {
        listaCarrinho.innerHTML = "<p>Seu carrinho está vazio.</p>";
        atualizarResumo();
        return;
    }

    carrinho.forEach(item => {
        const linha = document.createElement("div");
        linha.classList.add("item-carrinho");

        linha.innerHTML = `
            <span class="nome-item">${item.nome}</span>
            <span class="quantidade-item">${item.quantidade}x</span>
            <span class="valor-item-carrinho">${formatarMoeda(item.preco * item.quantidade)}</span>
            <button class="remover-item" data-nome="${item.nome}">Remover</button>
        `;

        listaCarrinho.appendChild(linha);
    });

    // eventos dos botões "remover" recém-criados
    listaCarrinho.querySelectorAll(".remover-item").forEach(botao => {
        botao.addEventListener("click", () => {
            removerItem(botao.dataset.nome);
            renderizarCarrinho();
            atualizarResumo();
        });
    });

    atualizarResumo();
}

// Roda a renderização assim que a página carrinho.html carrega
renderizarCarrinho();

// EVENTOS: QUANTIDADE (input em tempo real)
// só existe nas páginas que exibem produtos (ex: index.html)

document.querySelectorAll(".produto").forEach(elementoProduto => {

    const { nome, preco, inputQuantidade } = obterDadosProduto(elementoProduto);

    inputQuantidade.addEventListener("input", () => {
        const quantidade = validarQuantidade(inputQuantidade);


        atualizarValorItem(elementoProduto, preco, quantidade);


        const itemExistente = carrinho.find(item => item.nome === nome);
        if (itemExistente) {
            itemExistente.quantidade = quantidade;
            salvarCarrinho();
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

        // redireciona para a página do carrinho
        window.location.href = "carrinho.html";
        // ajuste o caminho se o botão estiver em outra pasta, ex: "paginas/carrinho.html"
    });
});

// EVENTOS: REMOVER (usado dentro das páginas de produto, se existir botão remover lá)

document.querySelectorAll(".remover").forEach(botao => {

    botao.addEventListener("click", () => {
        const elementoProduto = botao.closest(".produto");
        const { nome, preco, inputQuantidade } = obterDadosProduto(elementoProduto);

        removerItem(nome);

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

    // limpa o carrinho após finalizar
    carrinho = [];
    salvarCarrinho();
    renderizarCarrinho();
});