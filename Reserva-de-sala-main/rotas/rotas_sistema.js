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
          servico.reservantesAdm(req,res); // Redireciona para a página de gerente se as credenciais estiverem corretas
      } else {
        console.log("Login Inválido");
          return res.render('adminLogin', {layout: 'login'});
      }
  });
});

// Rota para receber os dados do formulário e inseri-los no banco de dados
router.post('/cadastrar-sala', (req, res) => {
    const { categoria, descricao } = req.body;

    // Chamar a função para inserir sala no banco de dados
    servico.cadastrarSala(categoria, descricao, (error, results) => {
        if (error) {
            res.status(500).send('Erro ao cadastrar a sala');
        } else {
            res.status(200).send('Sala cadastrada com sucesso');
        }
    });
});


router.get('/reservantesAdm', function(req,res) {
    
    conexao.query('SELECT * FROM reserva', (error, results) => {
        if (error) {
            console.error('Erro ao buscar as reservas:', error);
            res.status(500).send('Erro ao buscar as reservas');
        } else {
            res.render('reservantesAdm', { layout: 'reservantes', reservas: results });
        }
    });
});

router.get('/reservasAdm', function(req, res) {

    conexao.query('SELECT * FROM sala', (error, results) => {
        console.log('Consulta ao banco de dados realizada com sucesso:', results);

        if (error) {
            console.error('Erro ao buscar as salas:', error);
            res.status(500).send('Erro ao buscar as salas');
        } else {
            res.render('reservasAdm', { layout: 'reservas', salas: results });
        }
    });
});

/*******************Rotas Para Reservantes Start**********************/

router.get('/aluno-login', function(req, res) {
    try {
        // Renderiza o arquivo aluno-login.handlebars dentro da pasta reservante
        res.render('reservante/aluno-login', {layout: 'aluno-login'});
    } catch (error) {
        // Tratamento de erro, se necessário
        console.error(error);
        res.status(500).send("Desculpe, ocorreu um erro. Por favor, tente novamente mais tarde.");
    }
});


/*******************Rotas Para Reservantes End**********************/

//rota principal
router.get('/', function(req, res){
    servico.paginaPrincipal(req, res);
});

// Exportar o router
module.exports = router;
