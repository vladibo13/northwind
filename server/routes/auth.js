const express = require('express');
const router = express.Router();
const pool = require('../db/pool');
const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs'); // npm install
// const salt = bcrypt.genSaltSync(10);

router.post('/register', async (req, res, next) => {
	console.log(req.body);
	const { email, password, lastName, firstName } = req.body;
	if (!email || !password || !lastName || !firstName) return res.json({ msg: 'fields cannot be empty' });

	try {
		const emailExist = await ifUserExist(email);
		console.log(emailExist);
		if (emailExist) return res.json({ msg: 'user already exist' });
		const result = await pool.execute(getUserInsertionQuery(), [ email, password, firstName, lastName ]);
		res.json({
			msg: 'success register',
			redirect: true,
			user: { email, firstName, lastName, userID: result[0].insertId }
		});
	} catch (e) {
		res.json(e);
	}
});

router.post('/login', async (req, res, next) => {
	const { email, password } = req.body;
	if (!email || !password) return res.json({ msg: 'fields cannot be empty' });
	try {
		const user = await ifUserExist(email, password);
		console.log(user);
		if (!user) return res.json({ msg: 'user not exist' });
		const token = await createJWTToken(delete user.password);
		res.json({ msg: 'success logged in', user, token, redirect: true });
	} catch (e) {
		res.json(e);
	}
});

router.post('/reset', async (req, res, next) => {
	const { password, newPassword, newPasswordMatch } = req.body;
	console.log(password);
	console.log(newPassword);
	if (!password || !newPassword || !newPasswordMatch) return res.json({ msg: 'fields cannot be empty' });
	//check if user exist with password
	const user = await checkIfUserExistWithPassword(password);

	if (!user) return res.json({ msg: 'no user exist with this password' });
	if (newPassword !== newPasswordMatch) return res.json({ msg: 'incorrect password match' });
	//update password based on found user
	try {
		await pool.execute(updatePassword(), [ newPassword, user.id ]);
		res.json({ msg: 'password updated', user: user.id, redirect: true });
	} catch (e) {
		res.json(e);
	}
});

function updatePassword() {
	return 'UPDATE users SET password = ? WHERE id = ?;';
}

//create token
function createJWTToken(user) {
	return new Promise((res, rej) =>
		jwt.sign({ user }, process.env.SECRET, (e, token) => {
			if (e) return rej(e);
			return res(token);
		})
	);
}
//reset route functions
async function checkIfUserExistWithPassword(password) {
	const query = 'select * from users where password = ?';
	const payload = [ password ];
	const [ user ] = await pool.execute(query, payload);
	console.log(user);
	const [ result ] = user;
	return result;
}

//check if user exist
async function ifUserExist(email, password = null) {
	const query = password ? getUserPasswordExistQuery() : getUserExistQuery();
	const payload = password ? [ email, password ] : [ email ];
	const [ user ] = await pool.execute(query, payload);
	console.log(user);
	const [ result ] = user;
	return result;
}
//----------------------AUTH-----------------------------------------------------
function getUserExistQuery() {
	return 'select * from users where email = ?';
}
function getUserPasswordExistQuery() {
	return 'select * from users where email = ? and password = ?';
}
router.get('/users', async (req, res, next) => {
	const [ users ] = await pool.execute(getAllUsers());
	res.json(users);
});

function getUserInsertionQuery() {
	return 'INSERT INTO `northwind`.`users` (`email`, `password`, `firstName`, `lastName`) VALUES (?,?,?,?)';
}
//----------------------AUTH-----------------------------------------------------
module.exports = router;
