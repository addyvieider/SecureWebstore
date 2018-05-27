const dbConnector = require('./dbConnector.js');
const mysql = require('mysql');

module.exports = {

    insertProduct: function(req,res) {

        let con = dbConnector.createConnection();

        //nella query l'immagine viene inserita tramite LOAD_FILE(), il parametro di LOAD_FILE() deve essere il path dell'immagine. 
        //Per esempio LOAD_FILE("C:/images/img.png")

        con.query('INSERT INTO product (id,name,category,description,shortdesc,image) VALUES (?,?,?,?,LOAD_FILE(?))',
                  [req.session.id,req.session.name,req.session.category,req.session.description,req.session.shortdesc,req.session.image],
                  (err,result) => {

                     if(err){
                         console.log(err);
                         req.status(500).end();
                         return;
                     }



                  });

    }
}