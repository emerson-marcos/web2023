//importar modulo Express
const express = require('express');

//importar modulo express-handlebars
const { engine } = require('express-handlebars');

//importar modulo de rotas
const rotas = require('./rotas/rotas_sistema');

//App
const app = express();

//adicionar CSS
app.use('/css', express.static('./css'));

//Referenciar a pasta de imagens
app.use('/assets', express.static('./assets'));

//configuração do express-handlebars
app.engine('handlebars', engine({
    helpers:{
        //Função auxiliar para verificar igualdade
        condicionalIgualdade: function(parametro1, parametro2, options){
            return parametro1 === parametro2 ? options.fn(this) : options.inverse(this);
        }
    }
}));
app.set('view engine', 'handlebars');
app.set('views', './views');

// manipulação de dados via rotas
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//rotas
app.use('/', rotas);


//Servidor
app.listen(8080);