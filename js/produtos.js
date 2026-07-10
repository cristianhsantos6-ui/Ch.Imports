//IMPORTANDO OS PRODUTOS DO ARQUIVO lista_produtos.js
import {produtos} from "../js/lista_produtos.js";

//PEGANDO ELEMENTOS DO DOM 
const sectonCards = document.querySelector('#cards')

//CARREGANDO OS CARDS 
const listarProdutos = () => {
  return produtos
   
}

//CHAMANDO A FUNÇÃO listarProdutos
listarProdutos()

//MONTANDO OS MENUS SEÇÕES 
const menuSecoes = () => {
    const mapSecoes = new Map()

    //PERCORRENDO O ARRAY PRODUTOS
    produtos.forEach((elem)=>{
        mapSecoes.set(elem.id_secao, elem)

    })

    //CONVERTENDO MAP EM ARRAY
    const secoesFiltradas = Array.from(mapSecoes.values())

    //RETORNANDO O ARRAY SELECIONADO
    return secoesFiltradas
}

//FUNÇÃO PARA INSERIR OS MENUS NA LISTA
const carregaSecoes = () =>{
    //PEGANDO O ELEMENTO ul menu-secoes DO DOM
    const ulMenuSecoes = document.querySelector('#menu-secoes')
    

 //LIMPANDO O ELEMENTO DO DOM 
 ulMenuSecoes.innerHTML = ''

 //CHAMANDO A FUNÇÃO menuSecoes E PERCORRENDO O ARRAY DE SEÇÕES JA SELECIONADAS
    menuSecoes().forEach((elem, i)=>{
        //CRIANDO O ELEMENTO li
        const liMenu = document.createElement('li')

        //CRIANDO O ELEMENTO a ATRIBUINDO O NOME DA SEÇÃO
        const aMenu = document.createElement('a')
        aMenu.setAttribute('href','#')
        aMenu.setAttribute('class','link-secao')
        aMenu.innerHTML = elem.secao

         aMenu.addEventListener('click',()=>{
            montarCards(filtroProduto(elem.id_secao))
         })

        //ADICIONANDO O ELEMENTO FILHO a NO li 
        liMenu.appendChild(aMenu)

        //ADICIONANDO O ELEMENTO FILHO liMenu NO OBJETO DOM
        ulMenuSecoes.appendChild(liMenu)

    })
}

carregaSecoes()

//FUNÇÃO FILTRO PRODUTO
const filtroProduto = (idSecao)=>{
    return produtos.filter(elem => elem.id_secao === idSecao)
}

//FUNÇÃO montar cards
const montarCards = (objProdutos) => {
    //LIMPAR A SECTION cards
    sectonCards.innerHTML = ''

    sectonCards.innerHTML = ''
//PERCORRENDO O ARRAY DE PRODUTOS 
objProdutos.forEach((elem, i) => {
    const divCards = document.createElement('div')
    divCards.setAttribute('class', 'card')

    const imgCard = document.createElement('img')
    imgCard.setAttribute('src', elem.caminho_imagem)
    imgCard.setAttribute('alt', elem.descricao_protudo)

    const pCard = document.createElement('p')
    pCard.innerHTML = elem.descricao_protudo

    const h2Card = document.createElement('h2')
    h2Card.innerHTML = `R$ ${parseFloat(elem.valor_unitario).toFixed(2).replace('.', ',')}`

    const btnCard = document.createElement('button')
    btnCard.setAttribute('class', 'btn-add')
    btnCard.innerHTML = 'Adicionar'

    divCards.appendChild(imgCard)
    divCards.appendChild(pCard)
    divCards.appendChild(h2Card)
    divCards.appendChild(btnCard)

    sectonCards.appendChild(divCards) 
})
}