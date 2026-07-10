//IMPORTANDO OS PRODUTOS DO ARQUIVO lista_produtos.js
import {produtos} from "../js/lista_produtos.js";

//PEGANDO ELEMENTOS DO DOM 
const sectonCards = document.querySelector('#cards')

//CARREGANDO OS CARDS 
const listarProdutos = () => {

    sectonCards.innerHTML = ''
//PERCORRENDO O ARRAY DE PRODUTOS 
    produtos.forEach((elem, i) =>{
     //CRIANDO O ELEMENTO div E DWFININDO O ATRIBUTO CARDS   
    const divCards = document.createElement('div')
    divCards.setAttribute('class', 'card')

   //CRIANDO O ELEMENTO img E DEFININDO OS ATRIBUTOS SRC E ALT OS VALORES DO CAMINHO DAS IMAGENS E A DESCRIÇÃO DOS DADOS
    const imgCard = document.createElement('img')
    imgCard.setAttribute('src',  elem.caminho_imagem)
    imgCard.setAttribute('alt', elem.descricao_protudo)

 //CRIANDO O ELEMENTO p E ATRIBUINDO A DESCRIÇÃO DOS PRODUTOS
    const pCard = document.createElement('p')
    pCard.innerHTML = elem.descricao_protudo

   //CRIANDO O ELEMENTO h2 E ATRIBUINDO O VALOR UNITÁRIO DEIXANDO EM DUAS CASAS DECIMAIS E SUBSTITUINDO PONTO POR VÍRGULA
    const h2Card = document.createElement('h2')
    h2Card.innerHTML =`R$ ${parseFloat(elem.valor_unitario).toFixed(2).replace('.',',')}`

    //CRIANDO O  ELEMENTO button E DEFININDO OS ATRIBUTOS class E A DESCRIÇÃO ADICIONAR
    const btnCard = document.createElement('button')
    btnCard.setAttribute('class', 'btn-add')
    btnCard.innerHTML = 'Adicionar'

    //ADICIONANDO OS ELEMENTOS FILHOS AOS divCards
    divCards.appendChild(imgCard)
    divCards.appendChild(pCard)
    divCards.appendChild(h2Card)
    divCards.appendChild(btnCard)

//ADICIONAR O divCards A SECTION CARDS
    })
}

//CHAMANDO A FUNÇÃO listarProdutos
listarProdutos()