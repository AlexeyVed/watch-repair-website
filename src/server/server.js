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

app.listen(process.env.PORT || 4000, () => console.log(`Listening on port ${process.env.PORT || 4000}!`));




