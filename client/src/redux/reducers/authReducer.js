import Actions from '../actions/action.config';

const initialState = {
	user: {},
	redirect: false,
	token: ''
};

export default function authReducer(state = initialState, action) {
	switch (action.type) {
		case Actions.REGISTER_USER: {
			console.log('register user reducer...');
			console.log('from reducer payload ', action.payload);
			return {
				...state,
				redirect: true
			};
		}

		case Actions.LOGIN_USER: {
			return {
				...state,
				user: action.payload.user,
				token: action.payload.token,
				redirect: true
			};
		}

		case Actions.RESET_PASSWORD: {
			return {
				...state,
				redirect: true
			};
		}

		case Actions.RESET_AUTH_STATE: {
			return {
				user: {},
				redirect: false,
				token: ''
			};
		}

		default:
			return state;
	}
}
