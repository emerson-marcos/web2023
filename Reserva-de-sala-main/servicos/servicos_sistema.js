// Importar o módulo de conexão com banco MySQL
const conexao = require('../bd/conexao_mysql');

// Importar o módulo file system
const fs = require('fs');

const crypto = require('crypto');

// Função para exibir o formulário para cadastro de produtos
function paginaPrincipal(req, res){
    res.render('index');
}

function adminLogin(req,res) {
    res.render('adminLogin');
}

function loginAdmin(email, senha, err) {

    if (!email || !senha) {
        return res.render('adminLogin', { erro: 'Por favor, preencha todos os campos.' });
    }

    let sql = `SELECT * FROM admin WHERE email = ? AND senha = ?`;
    conexao.query(sql, [email, senha], function(err, result) {
        if (err) {
            return res.render('login', { erro: 'Erro ao consultar o banco de dados' });
        }
        if (result.length > 0) {
            req.session.usuario = result[0]; // Definindo o usuário na sessão
            res.redirect('/reservasAdm'); // Redireciona para a página de gerente se as credenciais estiverem corretas
        } else {
            return res.render('adminLogin', { erro: 'Credenciais Inválidas' });
        }
    });
}

// Exportar funções
module.exports = {
    paginaPrincipal,
    adminLogin,
    loginAdmin
};