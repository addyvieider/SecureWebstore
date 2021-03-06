const mysql = require('mysql');

module.exports = {

    options : {
        host: "localhost",
        user: "root",
        password: "passwordIS",
        database: "webstore"
    },

    createConnection : function () {

        //console.log("Try connect");

        let con = mysql.createConnection(this.options);
        con.connect(function (err) {
            if (err) throw err;
            //console.log("Connected!");
        });

        return con;

    },

    endConnection : function (con) {
        //console.log("Try end");
        con.end(function (err) {
            if (err) {
                console.log(err);
            }
            //console.log("Disconnected!");
        });
    }
}