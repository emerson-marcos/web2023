// Importar o módulo express
const express = require('express');

// Extraindo a função Router do módulo express
const router = express.Router();

//importar o módulo para armanezar a sessão de login
const session = require('express-session');

// Configuração do middleware de sessão
router.use(session({
    secret: 'pega_por_favor',
    resave: false,
    saveUninitialized: true
}));

// Importar módulo de serviços
const servico = require('../servicos/servicos_sistema');
const conexao = require('../bd/conexao_mysql');

//rota principal
router.get('/adminLogin', function(req, res){
    servico.adminLogin(req, res);
});

// Rota para lidar com a submissão do formulário de login
router.post('/login', (req, res) => {
  const email = req.body.email;
  const senha = req.body.senha;

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
          servico.reservasAdm(req,res); // Redireciona para a página de gerente se as credenciais estiverem corretas
      } else {
        console.log("Login Inválido");
          return res.render('adminLogin', {layout: 'login'});
      }
  });
});


router.get('/reservasAdm', function(req,res) {
  servico.reservasAdm(req,res);
})

  //rota de login do gerente de TI (mova esta rota para cima)
router.get('/login', function(req,res) {
    servico.paginaLoginGerente(req,res);
});

//rota principal
router.get('/', function(req, res){
    servico.paginaPrincipal(req, res);
});

// Exportar o router
module.exports = router;
