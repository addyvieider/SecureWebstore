const mysql = require('mysql');

module.exports = {

    options : {
        host: "localhost",
        user: "root",
        password: "passwordIS",
        database: "webstore"
    },

    createConnection : function () {

        let con = mysql.createConnection(this.options);

        con.connect(function (err) {
            if (err) throw err;
            //console.log("Connected!");
        });

        return con;

    },

    endConnection : function (con) {
        con.end(function (err) {
            if (err) throw err;
            //console.log("Disconnected!");
        });
    }
}