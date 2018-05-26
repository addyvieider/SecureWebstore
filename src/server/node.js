const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const helmet = require('helmet');
const dbConnector = require('./dbConnector');
const authService = require('./authService.js');
const productService = require('./productService');
const orderService = require('./orderService');

app.use(bodyParser.json());
app.enable('trust proxy');
app.use(session({
  store: new MySQLStore(dbConnector.options),
  secret: 'Wow much secret very safe',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true },
  rolling: true
}));

app.use(cors({origin: ["http://localhost:4200", "http://localhost:3000"], credentials: true}));
app.use(helmet());

app.use((req, res, next) => {
  if (req.cookies && req.cookies.user_sid && !req.session.user) {
      res.clearCookie('user_sid');        
  }
  next();
});

app.route('/api/products/').get((req, res) => productService.getProducts(req, res));
app.route('/api/product').get((req, res) => productService.getProduct(req, res));
app.route('/api/register').post((req, res) => authService.register(req, res));
app.route('/api/login').post((req, res) => authService.login(req,res));
app.route('/api/logout').post((req, res) => authService.logout(req,res));
app.route('/api/admin').get((req, res) => authService.isAdmin(req,res));
app.route('/api/login').get((req, res) => authService.isLoggedIn(req,res));
app.route('/api/order').post((req, res) => orderService.placeOrder(req,res));
app.route('/api/orders').get((req, res) => orderService.getOrders(req,res));

app.listen(3000, () => {
  console.log('Server started!');
});