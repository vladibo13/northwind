const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();
const db = require('./db/index');
const pool = require('./db/pool');
const northwindRoutes = require('./routes/northwind');
const authRoutes = require('./routes/auth');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

db.connect(() => {
	console.log('connected to database');
});
app.get('/', (req, res, next) => {
	res.send('ok');
});

app.use('/auth', authRoutes);
app.use('/northwind', northwindRoutes);

app.listen(process.env.PORT, () => {
	console.log(`server listening  on port: ...${process.env.PORT}`);
});
