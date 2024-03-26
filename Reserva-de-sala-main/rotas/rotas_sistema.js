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
  console.log("nao");
  const email = req.body.email;
  console.log(email);
  const senha = req.body.senha;
  console.log(senha);
  console.log("nao");

  if (!email || !senha) {
      return res.render('adminLogin', { erro: 'Por favor, preencha todos os campos.' });
  }

  let sql = `SELECT * FROM admin WHERE email = ? AND senha = ?`;
  conexao.query(sql, [email, senha], function(err, result) {
      console.log(result);
      if (err) {
          return res.render('login', { erro: 'Erro ao consultar o banco de dados' });
      }
      if (result.length > 0) {
          console.log("Entrou no servicos_sistema.js");
          req.session.usuario = result[0]; // Definindo o usuário na sessão
          res.redirect('/reservasAdm'); // Redireciona para a página de gerente se as credenciais estiverem corretas
      } else {
          return res.render('adminLogin', { erro: 'Credenciais Inválidas' });
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

router.post('/login', function(req,res) {
    servico.loginAdmin(req,res);
});

// Middleware de autenticação
router.use(function(req, res, next) {
    // Verifica se a rota não é a de login, a rota principal ou a rota de submissão do formulário
    if (req.path !== '/login' && req.path !== '/' && req.path !== '/formulario') {
        // Verifique se o usuário está autenticado
        if (req.session && req.session.usuario) {
            // Se o usuário estiver autenticado, continue o fluxo da solicitação
            next(); 
        } else {
            // Se o usuário não estiver autenticado, redirecione-o para a página principal
            res.redirect('/');
        }
    } else {
        // Se a rota for a de login, a rota principal ou a rota de submissão do formulário, continua o fluxo da solicitação
        next();
    }
});

//rota principal
router.get('/', function(req, res){
    servico.paginaPrincipal(req, res);
});

// Exportar o router
module.exports = router;
