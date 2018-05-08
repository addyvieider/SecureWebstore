const mysql = require('mysql');

module.exports = {
    createConnection : function () {

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

    },

    endConnection : function (con) {
        con.end(function (err) {
            if (err) throw err;
            //console.log("Disconnected!");
        });
    }
}