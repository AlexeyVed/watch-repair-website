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

    checkUserInDataBase(req.body.email, req.body.password)
        .then( msg => {
            res.send(msg);
        })
        .catch(err => {
            res.send(err);
        });
});

function checkUserInDataBase (email, password) {
    return new Promise((resolve, reject) => {
        const connectionDB = getConnection();
        connectionDB.connect(() => {
            connectionDB.query("SELECT email, password FROM login where email=?", [email], function (err, result) {
                if (err){
                    throw err;
                }
                if (email === 'admin@example.com' && password === 'passwordsecret') {
                    resolve('Admin')
                }
                if (!result.length) {
                    reject('User not found');
                } else {
                    if (result[0].password === password) {
                        resolve('User correctly');
                    } else {
                        reject('Wrong password');
                    }
                }
            });
        });
    });
}

app.post('/register', async (req, res) => {
    try {
        const data = await saveDataPersonInLoginTable(req);
        currentUserName = data.login;
        currentID = data.id;
        console.log('registration sucsufally', data.login, data.id)
        res.send('OK');
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            res.send('user is already added');
        } else {
            res.send(err.sqlMessage);
        }
    }
});

function  saveDataPersonInLoginTable(req) {
    return new Promise((resolve, reject) => {
        const {login, password, mail} = req.body;
        const connectionDB = getConnection();

        connectionDB.connect(function (err) {
            if (err) {
                return reject(err);
            }
            console.log("Connected!");
            const sql = `INSERT INTO login (login, password, mail) VALUES (?, ?, '')`;
            const values = [login, password];
            connectionDB.query(sql, values, function (err, result) {
                if (err) {
                    return reject(err);
                }
                console.log("Saved data login");
                resolve({login, id: result.insertId});
            });
        });
    });
}

app.listen(process.env.PORT || 4000, () => console.log(`Listening on port ${process.env.PORT || 4000}!`));




