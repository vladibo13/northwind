import axios from 'axios';

export const getOrdersService = async () => {
	try {
		const { data } = await axios.get('http://localhost:5000/northwind/orders');
		return data;
	} catch (ex) {
		return [];
	}
};

export const registerUserService = async (user) => {
	try {
		const { data } = await axios.post('http://localhost:5000/auth/register', user);
		console.log('data from service ', data);
		return data;
	} catch (ex) {
		return [];
	}
};

// loginUserService

export const loginUserService = async (user) => {
	try {
		const { data } = await axios.post('http://localhost:5000/auth/login', user);
		return data;
	} catch (ex) {
		return [];
	}
};

export const resetUserService = async (user) => {
	try {
		const { data } = await axios.post('http://localhost:5000/auth/reset', user);
		return data;
	} catch (ex) {
		return [];
	}
};
