const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const helmet = require('helmet');
const authService = require('./authService.js');
const productService = require('./productService');

app.use(bodyParser.json());
app.enable('trust proxy');
app.use(session({
  secret: 'Wow much secret very safe',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 3600000, secure: true },
  rolling: true
}));

app.use(cors({origin: ["http://localhost:4200", "http://localhost:3000"], credentials: true}));
app.use(helmet());

app.route('/api/products/').get((req, res) => productService.getProducts(req, res));
app.route('/api/product').get((req, res) => productService.getProduct(req, res));
app.route('/api/register').post((req, res) => authService.register(req, res));
app.route('/api/login').post((req, res) => authService.login(req,res));
app.route('/api/logout').post((req, res) => authService.logout(req,res));
app.route('/api/admin').get((req, res) => authService.isAdmin(req,res));

app.listen(3000, () => {
  console.log('Server started!');
});