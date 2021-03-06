const dbConnector = require('./dbConnector.js');
const crypto = require('crypto');

module.exports = {

    login: function (req, res) {

        let con = dbConnector.createConnection();

        con.query('SELECT * from user WHERE username = ?', [req.body.username], (err, result) => {

            if (err) console.log(err);

            let userFound = !!result[0];
            let username = userFound ? result[0].username : null;
            let salt = userFound ? result[0].salt : null;
            let password = userFound ? result[0].password : null;
            let admin = userFound ? !!result[0].admin : false;

            let hashedPw = hashPassword(req.body.password, salt);

            if (userFound && username === req.body.username && password.toString('hex') === hashedPw.hash.toString('hex')) {

                req.session.user = {
                    username: username,
                    admin: admin
                };

                /*req.session.save(err => {

                    console.log("saved");

                    if(err) {
                        console.log(err);
                    }

                });*/

                res.status(200).send(JSON.stringify(req.session.user));

            } else {
                res.status(204).send();
            }
        });

        dbConnector.endConnection(con);
    },


    register: function (req, res) {

        if(!req.body) {

            res.status(400).end();
            return;

        }

        if(req.body.password && typeof(req.body.password) == String && req.body.password.length < 8) {
            res.status(400).end();
            return;
        }

        let con = dbConnector.createConnection();
        let hashedPw = hashPassword(req.body.password);

        con.query('INSERT into user (username, password, salt, email, name, surname) values (?,?,?,?,?,?)',
            [req.body.username,
            hashedPw.hash,
            hashedPw.salt,
            req.body.email,
            req.body.name,
            req.body.surname],
            (err, result) => {

                if (err) {
                    if ('ER_DUP_ENTRY' == err.code) {
                        res.status(409).end();
                    } else {
                        res.status(500).end();
                    }
                    return;
                }

                res.status(200).end();

            });

        dbConnector.endConnection(con);

    },


    logout: function (req, res) {

        if (req.session && req.session.user) {
            req.session.regenerate(err => {
                if (err) {
                    console.log(err);
                    res.status(500).send(err);
                } else {
                    res.status(200).end();
                }
            });
        } else {
            //console.log("not found");
            res.status(404).end();
        }
    },

    isAdmin: function (req, res) {

        if (req.session && req.session.user) {
            res.status(200).send(JSON.stringify(req.session.user.admin));
        } else {
            res.status(200).send(JSON.stringify(false));
        }

    },

    isLoggedIn: function (req, res) {

        if (req.session && req.session.user) {
            res.status(200).send(JSON.stringify(req.session.user.username));
        } else {
            res.status(200).send(JSON.stringify(false));
        }

    },

    getUsers: function (req, res) {

        if (req.session && req.session.user) {

            if (req.session.user.admin) {
                let con = dbConnector.createConnection();
                con.query('SELECT * from user', (err, result) => {

                    if (err) {
                        console.log(err);
                        res.status(500).end();
                        return;
                    }

                    res.status(200).send(JSON.stringify(result));

                    dbConnector.endConnection(con);

                });

            } else {
                res.status(403).end();
            }

        } else {
            res.status(401).end();
        }

    },

    saveUser: function (req, res) {

        if(!req.body) {

            res.status(400).end();
            return;

        }

        if (req.session && req.session.user) {

            if (req.session.user.admin) {
                let con = dbConnector.createConnection();
                let user = req.body.user;
                con.query('UPDATE user SET name = ?, surname = ?, email = ?, admin = ? ' +
                    'WHERE username = ?', [user.name, user.surname, user.email, user.admin, user.username] ,(err, result) => {

                        if (err) {
                            console.log(err);
                            res.status(500).end();
                            return;
                        }

                        res.status(200).send(JSON.stringify(result));

                        dbConnector.endConnection(con);

                    });

            } else {
                res.status(403).end();
            }

        } else {
            res.status(401).end();
        }



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