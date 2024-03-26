// Importar o módulo express
const express = require('express');

// Extraindo a função Router do módulo express
const router = express.Router();

//importar o módulo para armanezar a sessão de login
const session = require('express-session');


// Importar módulo de serviços
const servico = require('../servicos/servicos_sistema');
const conexao = require('../bd/conexao_mysql');


//rota principal
router.get('/', function(req, res){
    servico.paginaPrincipal(req, res);
});

//rota principal
router.get('/adminLogin', function(req, res){
    servico.adminLogin(req, res);
});

// Exportar o router
module.exports = router;