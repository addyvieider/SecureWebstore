const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.listen(80, () => {
    console.log('Server started!');
  });

  app.route('/products').get((req, res) => {
    res.send(201, '{id: 3, name: "testApi", price: 10}');
});

