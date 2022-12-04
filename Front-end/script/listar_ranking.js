
    $(function () { // quando o documento estiver pronto/carregado

    // chamada ao backend
    $.ajax({
        url: 'http://localhost:5000/listar_ranking', // lembrar de trocar a url
        method: 'GET',
        dataType: 'json', // os dados são recebidos no formato json
        success: listar, // chama a função listar para processar o resultado
        error: function () {
            alert("erro ao ler dados, verifique o backend");
        }
    });

    // função executada quando tudo dá certo
    function listar(ranking) {
        // percorrer a lista de pessoas retornadas; 
        for (var i in ranking) { //i vale a posição no vetor
            lin = '<tr>' + // elabora linha com os dados da pessoa
                '<td>' + ranking[i].nome + '</td>' +
                '<td>' + ranking[i].sequencia + '</td>' +
                '<td>' + ranking[i].vitorias + '</td>' +
                '<td>' + ranking[i].derrotas + '</td>' +
                '</tr>';
            // adiciona a linha no corpo da tabela
            $('#corpoTabelaRanking').append(lin);
            
        };
    };
});