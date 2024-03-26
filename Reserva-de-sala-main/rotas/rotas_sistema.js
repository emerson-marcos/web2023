// Importar o módulo express
const express = require('express');

// Extraindo a função Router do módulo express
const router = express.Router();

// Importar módulo de serviços
const servico = require('../servicos/servicos_sistema');

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
  
    servico.loginAdmin(email, senha, (err, results) => {
      if (err) {
        res.status(500).send('Erro interno do servidor');
        return;
      }
  
      if (results.length > 0) {
        // Se as credenciais estiverem corretas, redirecione para a página de reservas
        console.log("nao");
        res.redirect('/reservasAdm');
      } else {
        // Se as credenciais estiverem incorretas, exiba uma mensagem de erro
        console.log("nao");
        res.send('Credenciais inválidas');
      }
    });
  });



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
