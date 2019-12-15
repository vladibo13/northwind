const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();
const db = require('./db/index');
app.use(bodyParser.json());

db.connect(() => {
	console.log('connected to database');
});
app.get('/', (req, res, next) => {
	res.send('ok');
});

app.listen(process.env.PORT, () => {
	console.log(`server listening  on port: ...${process.env.PORT}`);
});
