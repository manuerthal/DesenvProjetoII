$(function () { // quando o documento estiver pronto/carregado
    function atualizarToken(token) {
        sessionStorage.setItem('login-token', token)
    }
    
    let token = sessionStorage.getItem('login-token')

    if (token != null) {
        atualizarToken(token)
    }

    $(document).on("click", "#btCadastrar", function () {
        //pegar dados da tela
        var nome = $("#nome_cadastro").val();
        var email = $("#email_cadastro").val();
        var senha = $("#senha_cadastro").val();

        $.ajax({
            url: 'http://localhost:5000/cadastro', // precisa colocar o teu ip e porta
            method: 'POST',

            contentType: 'application/json',
            data: JSON.stringify({
                nome: nome,
                email: email,
                senha: senha,
            }),
            success: (resultado) => {
                if (resultado.resultado == "ok") {
                    return window.location = '../login.html';
                } else {
                    alert("Erro ao fazer login: " + resultado.detalhes)
                }
            },

            error: () => {
                alert("Não foi possível fazer o cadastro.")
            } 
        })

       
    });

    // código para mapear click do botão incluir pessoa
    $(document).on("click", "#btLogar", function () {
        //pegar dados da tela
        var email = $("#email_login").val();
        var senha = $("#senha_login").val();

        $.ajax({
            url: 'http://localhost:5000/login', // precisa colocar o teu ip e porta
            method: 'POST',

            contentType: 'application/json',
            data: JSON.stringify({
                email: email, senha: senha
            }),

            success: (resultado) => {
                if (resultado.resultado == "ok") {
                    atualizarToken(resultado.detalhes.token)
                    return window.location = '../escolhas.html';
                } else {
                    alert("Erro ao fazer login: " + resultado.detalhes)
                }
            },

            error: () => {
                alert("Não foi possível fazer login.")
            } 
        })  
    });   

    $(document).on("click", "#logout", function logout() {
            
            window.location = '../login.html';
        });  
});