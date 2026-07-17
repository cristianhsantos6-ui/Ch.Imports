const formulario = document.getElementById("form-pessoa");

formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    // Captura todos os dados dos inputs do formulário
    const usuario = {
        nome: document.getElementById("nome").value,
        cpf: document.getElementById("cpf").value,
        telefone: document.getElementById("telefone").value,
        email: document.getElementById("Email").value,
        dataNascimento: document.getElementById("data-nascimento").value,
        cep: document.getElementById("CEP").value,
        logradouro: document.getElementById("logradouro").value, 
        numero: document.getElementById("numero").value,
        complemento: document.getElementById("complemento").value,
        bairro: document.getElementById("bairro").value,
        cidade: document.getElementById("cidade").value,
        estado: document.getElementById("estado").value
    };

    // Salva os dados do usuário no localStorage
    localStorage.setItem("usuario", JSON.stringify(usuario));

    alert("Cadastro realizado com sucesso! Veja os dados ao lado.");

    // --- NOVA LÓGICA PARA EXIBIR AO LADO ---
    
    // Busca a div lateral onde os dados serão exibidos (criada no CSS/HTML)
    const divDados = document.getElementById("dados-cadastrados");
    const listaDados = document.getElementById("lista-dados");

    // Limpa qualquer exibição anterior
    listaDados.innerHTML = "";

    // Mapeamento de nomes amigáveis para exibição
    const nomesCampos = {
        nome: "Nome", cpf: "CPF", telefone: "Telefone", email: "E-mail",
        dataNascimento: "Data de Nascimento", cep: "CEP", logradouro: "Logradouro",
        numero: "Número", complemento: "Complemento", bairro: "Bairro",
        cidade: "Cidade", estado: "Estado"
    };

    // Preenche a lista com as informações
    for (let chave in usuario) {
        const item = document.createElement("p");
        item.style.marginBottom = "8px";
        item.innerHTML = `<strong>${nomesCampos[chave]}:</strong> ${usuario[chave]}`;
        listaDados.appendChild(item);
    }

    // Mostra o container de dados removendo a classe que o esconde
    divDados.classList.remove("escondido");

    
     setTimeout(() => {
        window.location.href = "login.html";
     }, 5000); // 5000 milissegundos = 5 segundos
});
