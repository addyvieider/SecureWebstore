const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');

app.use(bodyParser.json());

app.listen(3000, () => {
    console.log('Server started!');
  });

  app.route('/api/products').get((req, res) => {

    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "passwordIS",
      database: "webstore"
    });

    con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
    });

    con.query('SELECT * FROM product', (err,rows) => {
      if(err) throw err;
    
      console.log('Data received from Db:\n');
      console.log(rows);

      res.status(200).send(JSON.stringify(rows));
    });

    //res.status(200).send(JSON.stringify({id: 1, name: "beerApi", price: 100}));

    con.end(function(err) {
      if (err) throw err;
      console.log("Disconnected!");
    })
});

