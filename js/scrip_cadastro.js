const formulario = document.getElementById("form-pessoa");

formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    const usuario = {
        nome: document.getElementById("nome").value,
        cpf: document.getElementById("cpf").value,
        telefone: document.getElementById("telefone").value,
        email: document.getElementById("Email").value,
        senha: document.getElementById("Senha").value
    };

    // Salva os dados do usuário
    localStorage.setItem("usuario", JSON.stringify(usuario));

    alert("Cadastro realizado com sucesso!");

    // Redireciona para o login
    window.location.href = "login.html";
});