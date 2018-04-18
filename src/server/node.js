const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');

app.use(bodyParser.json());

app.listen(3000, () => {
    console.log('Server started!');
  });

  app.route('/api/products/').get((req, res) => {

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

    var page = parseInt(req.query.page) || 0;
    var display = parseInt(req.query.display) || 10;
    var skip = (page-1) * display;
    var limit = skip + ', ' + display;
    var numRows;

    console.log(limit);
   
    con.query('SELECT count(*) as numRows FROM product', (err,result) => {
      if(err) throw err;

      numRows = result[0].numRows;

    });

    con.query('SELECT * FROM product LIMIT ' + limit + ";", (err,result) => {
      if(err) throw err;

      console.log('Data received from Db:\n');
      console.log(result);
      
      res.setHeader('Content-Type', 'application/json');
      res.status(200).send("{\"products\":"+JSON.stringify(result)+",\"totalRows\":"+JSON.stringify(numRows)+"}");


    });
    
    

    //res.status(200).send(JSON.stringify({id: 1, name: "beerApi", price: 100}));

    con.end(function(err) {
      if (err) throw err;
      console.log("Disconnected!");
    })
    
});

