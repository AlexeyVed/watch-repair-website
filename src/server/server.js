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
                        resolve('User');
                    } else {
                        reject('Wrong password');
                    }
                }
            });
        });
    });
}

app.get('/getData', function (req, res) {
    getCitiesAndClocks()
        .then(result => {
            res.send(result)
        })
        .catch(err => {
            res.send(err)
        })

});

function getCitiesAndClocks () {

    const connectionDB = getConnection();

    const getCities = new Promise((resolve, reject) => {
        connectionDB.connect(() => {
            connectionDB.query(`SELECT city FROM cities`, function (err, result) {
                if (err) throw err;
                const arrOfCities = result.map(item => (item.city))
                resolve(arrOfCities);
                reject('Error! Download cities!');
            });
        });
    })

    const getClocks = new Promise((resolve, reject) => {
        connectionDB.connect(() => {
            connectionDB.query(`SELECT typeClock, timeRepair FROM clocks`, function (err, result) {
                if (err) throw err;
                resolve(result);
                reject('Error! Download clocks!');
            });
        });
    })

    return Promise.all([getCities, getClocks])
}

/*app.post('/register', async (req, res) => {

});

function  saveUserInDB(req) {
    return new Promise((resolve, reject) => {
        const { mail, password } = req.body;
        const connectionDB = getConnection();

        connectionDB.connect(function (err) {
            if (err) {
                return reject(err);
            }
            console.log("Connected!");
            const sql = `INSERT INTO login (mail, password) VALUES (?, ?, '')`;
            const values = [login, password];
            connectionDB.query(sql, values, function (err, result) {
                if (err) {
                    return reject(err);
                }

                resolve(mail);
            });
        });
    });
}*/

app.listen(process.env.PORT || 4000, () => console.log(`Listening on port ${process.env.PORT || 4000}!`));




