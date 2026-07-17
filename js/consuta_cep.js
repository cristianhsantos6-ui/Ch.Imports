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

    const resposta =  fetch(`viacep.com.br/ws/${numCep}/json/`)


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


