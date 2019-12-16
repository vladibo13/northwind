import Actions from '../actions/action.config';
import uuid from 'uuid';

const initialState = {
	orders: [],
	loading: false
};

export default function orderReducer(state = initialState, action) {
	switch (action.type) {
		case Actions.GET_ORDERS: {
			console.log('get order reducer...');
			return {
				...state,
				orders: action.payload,
				loading: false
			};
		}

		default:
			return state;
	}
}
