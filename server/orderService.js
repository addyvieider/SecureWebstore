const dbConnector = require('./dbConnector.js');
const mysql = require('mysql');

module.exports = {

    placeOrder: function (req, res) {

        if (req.session && req.session.user) {

            if (req.body.orderItems && req.body.orderItems.length > 0 && req.body.name && req.body.address) {

                let con = dbConnector.createConnection();
                con.query('INSERT INTO order_collection (username, name, address) VALUES (?,?,?)',
                    [req.session.user.username, req.body.name, req.body.address], (err, result) => {

                        if (err) {
                            console.log(err);
                            res.status(500).end();
                            return;
                        }

                        let id = result.insertId;
                        let orderItems = req.body.orderItems;
                        let sql = 'INSERT INTO order_item (order_id, product, package, quantity) VALUES ';

                        orderItems.forEach(orderItem => {

                            if (orderItem.product && orderItem.product.id && orderItem.product.name && orderItem.packageType &&
                                orderItem.packageType.name && orderItem.quantity && orderItem.quantity > 0) {

                                sql += '(' + mysql.escape(id) + ", " + mysql.escape(orderItem.product.id) + "," + mysql.escape(orderItem.packageType.name) +
                                    ", " + mysql.escape(orderItem.quantity) + '),';

                            }

                        });

                        sql = sql.slice(0, -1);

                        let con1 = dbConnector.createConnection();
                        con1.query(sql, (err, result) => {

                            if (err) {
                                console.log(err);
                                res.status(500).end();
                                return;
                            }

                            res.status(200).end();
                            dbConnector.endConnection(con1);

                        });

                        dbConnector.endConnection(con);

                    });
            } else {
                res.status(400).end();
            }

        } else {
            res.status(401).end();
        }
    },

    getOrders: function (req, res) {

        if (req.session && req.session.user) {
            let con = dbConnector.createConnection();
            con.query('SELECT name, address, price from order_collection ' +
                'where username = ?', [req.session.user.username], (err, result) => {

                    if (err) {
                        console.log(err);
                        res.status(500).end();
                        return;
                    }

                    res.status(200).send(JSON.stringify(result));

                    dbConnector.endConnection(con);

                });

        } else {
            res.status(401).end();
        }

    },

    getAllOrders: function (req, res) {

        if (req.session && req.session.user) {

            if (req.session.user.admin) {
                let con = dbConnector.createConnection();
                con.query('SELECT oc.id, oc.name, oc.address, oc.username, oc.price, oi.product, oi.package, oi.quantity from order_collection oc ' +
                    'join order_item oi on oc.id = oi.order_id', (err, result) => {

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

