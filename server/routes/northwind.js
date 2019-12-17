const express = require('express');
const router = express.Router();
const pool = require('../db/pool');
const jwt = require('jsonwebtoken');

router.get('/customers', async (req, res, next) => {
	const { CompanyName, job } = req.query;
	console.log(CompanyName, job);
	const [ query, params ] = getCustomersQuery(req.query);
	console.log(query, params);
	try {
		const result = await pool.execute(query, params);
		const [ first ] = result;
		res.json({ result: first });
	} catch (e) {
		res.json(e);
	}
	// res.json({ msg: 'ok' });
	// db.execute(query, params, (err, result) => {
	// 	if (err) return res.json(err);
	// 	return res.json(result);
	// });
});

function getCustomersQuery(params) {
	return [ `select * from customers where Company = ? and job_title = ?`, [ ...Object.values(params) ] ];
	// return [ `select * from customers where  job_title = ?`, [ ...Object.values(params) ] ];
}

router.get('/orders', async (req, res, next) => {
	try {
		const [ query ] = getCustomersOrders();
		const result = await pool.execute(query);
		const [ first ] = result;
		res.json(first);
	} catch (error) {
		res.status(400).json(error);
	}
});

function getCustomersOrders(params) {
	return [ `select * from orders` ];
}

function getAllUsers() {
	return 'select * from users';
}

module.exports = router;
