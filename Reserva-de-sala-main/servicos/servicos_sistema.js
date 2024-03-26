// Importar o módulo de conexão com banco MySQL
const conexao = require('../bd/conexao_mysql');

// Importar o módulo file system
const fs = require('fs');

const crypto = require('crypto');

// Função para exibir o formulário para cadastro de produtos
function paginaPrincipal(req, res){
    res.render('index');
}

// Exportar funções
module.exports = {
    paginaPrincipal
};