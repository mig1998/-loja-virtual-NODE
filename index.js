// const express = require('express');
const express = require('express');
const app = express();
const path = require('path'); // <-- esta linha é essencial
const cors = require('cors');  // Importa o CORS
const session = require('express-session');


app.use(cors());               // Habilita CORS para permitir acesso do front-end
app.use(express.json());      // Permite receber dados JSON nas requisições


app.use(session({
  secret: 'chave-secreta-bem-forte',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // true se usar HTTPS
}));


const userRoutes = require('./src/routes/userRoutes'); // Importa as rotas
const pageRoutes = require('./src/routes/pageRoutes'); // Importa as rotas


// Configura EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Arquivos estáticos (CSS, imagens, etc.)
app.use(express.static('public'));


app.use('/',pageRoutes); // Prefixa as rotas com /users


app.use('/users', userRoutes); // Prefixa as rotas com /users

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});