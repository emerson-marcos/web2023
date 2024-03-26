// Importar o módulo de conexão com banco MySQL
const conexao = require('../bd/conexao_mysql');

// Importar o módulo file system
const fs = require('fs');

const crypto = require('crypto');

// Função para exibir o formulário para cadastro de produtos
function paginaPrincipal(req, res){
    res.render('index', { layout: 'main' });
}

function adminLogin(req,res) {
    res.render('adminLogin', { layout: 'login' });
}

function reservantesAdm(req,res) {
    res.render('reservantesAdm', {layout: 'reservantes'});
}

function reservasAdm(req,res) {
    res.render('reservasAdm', {layout: 'reservas'});
}

// Função para verificar se a sala já existe no banco de dados
function verificarSalaExistente(categoria, descricao, callback) {
    
    const sql = 'SELECT * FROM sala WHERE Categoria = ? AND Bloco = ?';
    
    conexao.query(sql, [categoria, descricao], (error, results) => {
        if (error) {
            console.error('Erro ao verificar sala:', error);
            callback(error, null);
        } else {
            // Se a sala já existir, retorne true no callback
            // Caso contrário, retorne false
            callback(null, results.length > 0);
        }
    });
}

// Função para inserir uma sala no banco de dados
function cadastrarSala(categoria, descricao, callback) {
    verificarSalaExistente(categoria, descricao, (error, salaExistente) => {
        if (error) {
            callback(error, null);
        } else if (salaExistente) {
            callback(null, 'Já existe uma sala com o mesmo bloco e categoria.');
        } else {
            const sql = 'INSERT INTO sala (Categoria, Descricao) VALUES (?, ?)';
            conexao.query(sql, [categoria, descricao], (error, results) => {
                if (error) {
                    console.error('Erro ao inserir sala:', error);
                    callback(error, null);
                } else {
                    console.log('Sala cadastrada com sucesso');
                    callback(null, 'Sala cadastrada com sucesso.', results);
                }
            });
        }
    });
}

// Exportar funções
module.exports = {
    paginaPrincipal,
    adminLogin,
    reservantesAdm,
    reservasAdm,
    cadastrarSala
};