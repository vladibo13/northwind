import Actions from './action.config';
import axios from 'axios';
import { getItemsService } from '../service';

export const getOrders = () => {
	return async (dispatch) => {
		try {
			const orders = await axios.get('http://localhost:5000/northwind/orders');
			dispatch(getOrdersAction(orders.data));
		} catch (e) {
			console.log(e);
		}
		// const items = await getItemsService();
		// dispatch(getItemsAction(items));
	};
};

export const getOrdersAction = (data) => ({
	type: Actions.GET_ORDERS,
	payload: data
});
