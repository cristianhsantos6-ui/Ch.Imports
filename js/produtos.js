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

    //ADICIONANDO A OPÇÃO "TODOS" (id_secao 5) NO INÍCIO DO MENU
    //ELA NÃO VEM DOS PRODUTOS, POR ISSO É INSERIDA MANUALMENTE
    secoesFiltradas.unshift({ id_secao: 5, secao: "Todos" })

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
    //SE FOR A SEÇÃO "TODOS" (5), RETORNA TODOS OS PRODUTOS SEM FILTRAR
    if (idSecao === 5) {
        return produtos
    }
    return produtos.filter(elem => elem.id_secao === idSecao)
}

//CAPTURANDO OS CARACTERES DO INPUT PESQUISA 
//PEGANDO O INPUT DO DOM
const inputPesquisa = document.querySelector('#pesquisa')

inputPesquisa.addEventListener('input',(evt)=>{
    //PEGANDO O VALOR DO input E CONVERTENDO EM MINÚSCULO
    let txtInput = evt.target.value.toLowerCase()
    
    //FILTRANDO OS CARDS A PARTIR DO FILTER E INCLUDES
    montarCards(produtos.filter(elem=> elem.descricao_produto.toLowerCase().includes (txtInput)))

})


//FUNÇÃO monta cards
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
    imgCard.setAttribute('alt', elem.descricao_produto)

    const pCard = document.createElement('p')
    pCard.innerHTML = elem.descricao_produto

    const h2Card = document.createElement('h2')
    h2Card.innerHTML = `R$ ${parseFloat(elem.valor_unitario).toFixed(2).replace('.', ',')}`

   //CRIANDO O ELEMENTO button  E DEFININDO OS ATRIBUTOS CLASS E A DESCRIÇÃO ADICIONAR
    const btnCard = document.createElement('button')
    btnCard.setAttribute('class', 'btn-add')
    btnCard.innerHTML = 'Adicionar'

    btnCard.addEventListener('click',()=>{
        window.location.href = '../paginas/carrinho.html'
    })

   //ADICIONAR OS ELEMENTOS FILHOS AOS divCards
    divCards.appendChild(imgCard)
    divCards.appendChild(pCard)
    divCards.appendChild(h2Card)
    divCards.appendChild(btnCard)

//ADICIONAR O divCard A SECTION CARDS
    sectonCards.appendChild(divCards) 
})
}

//EXIBINDO TODOS OS PRODUTOS AO CARREGAR A PÁGINA
montarCards(produtos)