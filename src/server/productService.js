const dbConnector = require('./dbConnector.js');

module.exports = {

  getProducts: function (req, res) {

    let page = parseInt(req.query.page) || 1;
    let display = parseInt(req.query.display) || 10;
    let skip = (page - 1) * display;
    let limit = skip + ', ' + display;
    let numRows;

    //console.log(limit);

    con = dbConnector.createConnection();

    con.query('SELECT count(*) as numRows FROM product', (err, result) => {
      if (err) throw err;

      numRows = result[0].numRows;

      con = dbConnector.createConnection();
      con.query('SELECT * FROM product LIMIT ' + limit + ";", (err, result) => {
        if (err) throw err;

        //console.log('Data received from Db:\n');
        //console.log(result);

        res.setHeader('Content-Type', 'application/json');
        res.status(200).send("{\"products\":" + JSON.stringify(result) + ",\"totalRows\":" + JSON.stringify(numRows) + "}");

        dbConnector.endConnection(con);
      });

    });

    dbConnector.endConnection(con);
  },

  getProduct: function (req, res) {
    let con = dbConnector.createConnection();

    con.query('SELECT * FROM product WHERE id = ?', [req.query.id], (err, result) => {
      if (err) throw err;

      //console.log('Data received from Db:\n');
      //console.log(result);

      res.setHeader('Content-Type', 'application/json');
      res.status(200).send(JSON.stringify(result[0]));


    });

    dbConnector.endConnection(con);
  }

}