const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.listen(3000, () => {
    console.log('Server started!');
  });

  app.route('/api/products').get((req, res) => {
    res.send(201, JSON.stringify({id: 1, name: "beerApi", price: 100}));
});

