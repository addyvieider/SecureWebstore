const dbConnector = require('./dbConnector.js');
const crypto = require('crypto');

module.exports = {

    login: function(req, res) {
        if (req.session.user) {
            res.status(409).end();
            return;
        }

        var con = dbConnector.createConnection();

        con.query('SELECT * from user WHERE username = ?', [req.body.username], (err, result) => {

            if (err) console.log(err);

            var userFound = !!result[0];
            var username = userFound ? result[0].username : null;
            var salt = userFound ? result[0].salt : null;
            var password = userFound ? result[0].password : null;

            var hashedPw = hashPassword(req.body.password, salt);

            if (userFound && username === req.body.username && password.toString('hex') === hashedPw.hash.toString('hex')) {

                req.session.user = {
                    username: username,
                    admin: !!result[0].admin
                };

                res.status(200).end();

            } else {
                res.status(404).end();
            }
        });

        dbConnector.endConnection(con);
    },


    register: function(req, res) {
        var con = dbConnector.createConnection();
        var hashedPw = hashPassword(req.body.password);
      
        con.query('INSERT into user values (?,?,?,?,?,?)', [req.body.username, 
          hashedPw.hash, 
          hashedPw.salt,
          req.body.email,
          req.body.name,
          req.body.surname],
          (err, result) => {
      
            if(err) console.log(err);
      
            res.status(200).end();
      
        });
      
        dbConnector.endConnection(con);

    }

}

function hashPassword(password, salt) {

    salt = salt || crypto.randomBytes(64);
    hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512');
      
    return {
      salt: salt,
      hash: hash
    };
  
  }