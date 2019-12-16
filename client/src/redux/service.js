import axios from 'axios';

export const getOrdersService = async () => {
	try {
		const { data } = await axios.get('http://localhost:5000/northwind/orders');
		return data;
	} catch (ex) {
		return [];
	}
};
