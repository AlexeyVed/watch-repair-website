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
    res.send('okay')

});

function checkUserInDataBase (login, password) {
    return new Promise((resolve, reject) => {
        const connectionDB = getConnection();
        connectionDB.connect(function (err) {
            if (err) {
                throw err;
            }
            console.log("Connected!");
            connectionDB.query("SELECT id, password FROM tblogin where login=?", [login], function (err, result, fields) {
                if (err){
                    throw err;
                }
                console.log(result);
                console.log(result, 'result');
                if (!result.length) {
                    checkUserFlag = false;
                    reject('User not defined, press PortalRegistrationForm!');
                } else {
                    if (result[0].password === password) {
                        currentID = result[0].id;
                        console.log(result[0].id, 'user id');
                        checkUserFlag = true;
                        resolve();
                    } else {
                        checkUserFlag = false;
                        reject('Wrong password. Try again or stop trying to hack our service');
                    }
                }
            });
        });
    });

}

app.listen(process.env.PORT || 4000, () => console.log(`Listening on port ${process.env.PORT || 4000}!`));




