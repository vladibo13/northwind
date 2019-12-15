const express = require('express');
const router = express.Router();
const pool = require('../db/pool');

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

module.exports = router;
