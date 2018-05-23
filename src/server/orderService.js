const dbConnector = require('./dbConnector.js');

module.exports = {

    placeOrder: function(res,req) {

        let con = dbConnector.createConnection();
          
        //mettere ordine

        con.query('INSERT INTO order (username) VALUES (?,?)', [req.body.username] ,(err, result) => {
            
            //se c'è errore stampalo e ritorna 503
            if (err) {
                console.log(err);
                console.log('error 503');
            }
            
            //prendere id dell'ordine
            //siccome l'id si auto incrementa non c'è bisogno di specificarlo nella query
            //aggiungere items in order items con il metodo del link su whatsapp
            let con = dbConnector.createConnection();

            con.query('INSERT INTO order_item (product,amount,order_id) VALUES ?',[req.body.product,req.body.amount,req.body.order_id],(err,result) =>{

                //se c'è errore stampalo e ritorna 503
                if (err) {
                    console.log(err);
                    console.log('error 503');
                }

            });

            dbConnector.endConnection(); 

        });

        dbConnector.endConnection();    

    }

}