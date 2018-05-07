const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const session = require('express-session');
const crypto = require('crypto');

app.use(bodyParser.json());
app.use(session({
  secret: 'Wow much secret very safe',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 6000, secure: true },
  rolling: true
}));

app.listen(3000, () => {
  console.log('Server started!');
});

app.route('/api/products/').get((req, res) => {

  var page = parseInt(req.query.page) || 1;
  var display = parseInt(req.query.display) || 10;
  var skip = (page - 1) * display;
  var limit = skip + ', ' + display;
  var numRows;

  console.log(limit);

  con = createConnection();

  con.query('SELECT count(*) as numRows FROM product', (err, result) => {
    if (err) throw err;

    numRows = result[0].numRows;

    con = createConnection();
    con.query('SELECT * FROM product LIMIT ' + limit + ";", (err, result) => {
      if (err) throw err;
  
      //console.log('Data received from Db:\n');
      //console.log(result);
  
      res.setHeader('Content-Type', 'application/json');
      res.status(200).send("{\"products\":" + JSON.stringify(result) + ",\"totalRows\":" + JSON.stringify(numRows) + "}");
  
      endConnection(con);
    });

  });

  endConnection(con);

});

app.route('/api/product').get((req, res) => {

  var con = createConnection();

  con.query('SELECT * FROM product WHERE id = ?', [req.query.id] , (err, result) => {
    if (err) throw err;

    //console.log('Data received from Db:\n');
    //console.log(result);

    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(result[0]));


  });

  endConnection(con);


});


app.route('/api/register').post((req, res) => {

  var con = createConnection();
  var hashedPw = hashPassword(req.body.password);

  con.query('INSERT into user values (?,?,?,?,?,?)', [req.body.username, 
    hashedPw.hash, 
    hashedPw.salt,
    req.body.email,
    req.body.name,
    req.body.surname],
    (err, result) => {

      if(err) console.log(err);

      res.status(200).end();

  });



  endConnection(con);

});

app.route('/api/login').post((req, res) => {

  var con = createConnection();

  con.query('SELECT * from user WHERE username = ?', [req.body.username], (err, result) => {

    if(err) console.log(err);

    var username = result[0].username;
    var salt = result[0].salt;
    var password = result[0].password;

    var hashedPw = hashPassword(req.body.password, salt);

    if(username === req.body.username && password.toString('hex') === hashedPw.hash.toString('hex')) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }

  });

  endConnection(con);

});



function createConnection() {

  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "passwordIS",
    database: "webstore"
  });

  con.connect(function (err) {
    if (err) throw err;
    //console.log("Connected!");
  });

  return con;

}

function endConnection(con) {
  con.end(function (err) {
    if (err) throw err;
    //console.log("Disconnected!");
  });
}

function hashPassword(password, salt) {

  salt = salt || crypto.randomBytes(64);
  hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512');
    
  return {
    salt: salt,
    hash: hash
  };

}
