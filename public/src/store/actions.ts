import { Actions, Screens } from '../types/store';
import { getUser } from '../utils/firebase';

export const navigate = (screen: Screens) => {
	return {
		action: Actions.NAVIGATE,
		payload: screen,
	};
};

export const getUsersAction = async () => {
	const products = await getUser(); //Firestore
	return {
		action: Actions.GETPRODUCTS,
		payload: products,
	};
};

export const setUserCredentials = (user: string) => {
	return {
		action: Actions.SETUSERCREDENTIALS,
		payload: user,
	};
};