//PEGANDO ELEMENTOS DO DOM
const inputCep = document.querySelector('#cep')


//CAPTURANDO O EVENTO change
inputCep.addEventListener('change',(evt)=>{
    
    const numCep = evt.target.value.replace(/\D/g, "")

    console.log(numCep)

    if (numCep.lengh !== 8){
        alert('CEP INVÁLIDO')

        return
    }

  consultaCEP(numCep)


})


//FUNÇÃO CONSULTA CEP VIACEP
const consultaCEP = (cep) => {
    //TENTA CONECTAR A API
try{
    //FAZ A COMUNICAÇÃO COM A API DO VIA CEP POR MEIO DA FUNÇÃO fetch

    const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`)


    //SE O STATUS DA RESPOSTA NÃO FOR OK. DISPARA UMA EXCEÇõ
     if(!resposta.ok){
        throw new Error("ERRO NA REQUISIÇÃO")
     }

     //OBTEM OS DADOS DA API
     const dadosEndereco = await resposta.josn()

     //VERIFICA SE O  DADOS SÃO VÁLIDOS
     if(dadosEndereco.erro){
        alert('CEP NÃO LOCALIZARO')

        return
   }

   //CHAMA  A FUNCÃO carregaInput
carregaInput(dadosEndereco)

//CASO HAJA QUALQUER ERRO É DISPARADA UMA EXCEÇÃO
}catch(erro){
    console.log("ERRO", erro.message)
}

}

//OBJETO LITERAL DOS INPUTS
const campos = {
   logradoura: document.querySelector('#logradoura'),
   bairro: document.querySelector('#bairro'),
   complemento: document.querySelector('#complemento'),
   uf: document.querySelector('#fuf')

}

//FUNÇÃO CARREGA INPUTS 
const carregaInput = (objEndereco)=>{
    const div
    for(let campo in objEndereco){
        campus [campo].value = objEndereco[campo]
        campos[campo].disabled =  true
    }
    
}


