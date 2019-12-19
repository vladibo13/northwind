import Actions from './action.config';
import axios from 'axios';
import { registerUserService, loginUserService, resetUserService } from '../service';

export const registerUser = (user) => {
	return async (dispatch) => {
		console.log('auth action user info ', user);
		const data = await registerUserService(user);
		console.log('data from auth action ', data);
		dispatch(registerUserAction(data));
	};
};

export const registerUserAction = (data) => ({
	type: Actions.REGISTER_USER,
	payload: data
});

export const loginUser = (user) => {
	return async (dispatch) => {
		const data = await loginUserService(user);
		dispatch(loginUserAction(data));
	};
};

export const loginUserAction = (data) => ({
	type: Actions.REGISTER_USER,
	payload: data
});

export const resetUserPassword = (user) => {
	return async (dispatch) => {
		const data = await resetUserService(user);
		dispatch(resetUserPasswordAction(data));
	};
};

export const resetUserPasswordAction = (data) => ({
	type: Actions.REGISTER_USER,
	payload: data
});
