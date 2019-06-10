const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const dbConnectionConfig = require('./db-connection-config.js');

app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());

app.use(express.static('dist'));

function getConnection() {
    return mysql.createConnection(dbConnectionConfig);
}

app.post('/login', function (req, res) {

    checkUserInDataBase(req.body.login, req.body.pass)
        .then(() => {
            res.send('correctly');
        })
        .catch(err => {
            res.send('error');
        });
});

function checkUserInDataBase (email, password, flag) {
    return new Promise((resolve, reject) => {
        const connectionDB = getConnection();
        connectionDB.connect(function (err) {
            if (err) {
                throw err;
            }
            connectionDB.query("SELECT email, password FROM login where email=?", [email], function (err, result) {
                if (err){
                    throw err;
                }
                if (!result.length) {
                    reject('User not defined, press Registration!');
                } else {
                    if (result[0].password === password) {
                        resolve('User correctly');
                    } else {
                        reject('Wrong password. Try again or stop trying to hack our service');
                    }
                }
            });
        });
    });
}

app.listen(process.env.PORT || 4000, () => console.log(`Listening on port ${process.env.PORT || 4000}!`));




