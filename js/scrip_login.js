const form = document.getElementById("formLogin");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    const usuario = JSON.parse(localStorage.getItem("usuario"));

    if (!usuario) {
        alert("Nenhum usuário cadastrado.");
        return;
    }

    if (email === usuario.email && senha === usuario.senha) {
        alert("Login realizado com sucesso!");

        localStorage.setItem("usuarioLogado", usuario.nome);


    } else {
        alert("E-mail ou senha incorretos.");
    }

    // REDIRECIONAR PARA O CARRINHO
    window.location.href = "carrinho.html";
});