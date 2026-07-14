// Produtos adicionados ao carrinho
let carrinho = [];

// Elementos do resumo
const subtotal = document.getElementById("subtotal");
const total = document.getElementById("total");

// // ADICIONAR PRODUTO
// 
const botoesAdicionar = document.querySelectorAll(".adicionar");

botoesAdicionar.forEach(botao => {

    botao.addEventListener("click", () => {

        const produto = botao.closest(".produto");

        const nome = produto.querySelector("h2").textContent;

        const preco = Number(produto.dataset.preco);

        const quantidade = Number(produto.querySelector("input").value);

        // Verifica se o produto já existe no carrinho
        const existente = carrinho.find(item => item.nome === nome);

        if (existente) {

            existente.quantidade = quantidade;

        } else {

            carrinho.push({
                nome,
                preco,
                quantidade
            });

        }

        atualizarResumo();

    });

});

// REMOVER PRODUTO


const botoesRemover = document.querySelectorAll(".remover");

botoesRemover.forEach(botao => {

    botao.addEventListener("click", () => {

        const produto = botao.closest(".produto");

        const nome = produto.querySelector("h2").textContent;

        carrinho = carrinho.filter(item => item.nome !== nome);

        atualizarResumo();

    });

});

// 
// ATUALIZA RESUMO
// 

function atualizarResumo() {

    let soma = 0;

    carrinho.forEach(item => {

        soma += item.preco * item.quantidade;

    });

    subtotal.textContent =
        "R$ " + soma.toFixed(2).replace(".", ",");

    total.textContent =
        "R$ " + soma.toFixed(2).replace(".", ",");

}

 
// FINALIZAR COMPRA
// 
document.getElementById("finalizar").addEventListener("click", () => {

    if (carrinho.length === 0) {

        alert("Seu carrinho está vazio!");

        return;

    }

    let mensagem = "Produtos da compra:\n\n";

    carrinho.forEach(item => {

        mensagem += `${item.nome} - ${item.quantidade}x\n`;

    });

    mensagem += `\nTotal: ${total.textContent}`;

    alert(mensagem);

    

});