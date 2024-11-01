import { Actions, Screens } from '../types/store';
import { getUser } from '../utils/firebase';

export const navigate = (screen: Screens) => {
	return {
		action: Actions.NAVIGATE,
		payload: screen,
	};
};

export const getUsersAction = async () => {
	const users = await getUser(); //Firestore
	return {
		action: Actions.GETUSERS,
		payload: users,
	};
};

export const setUserCredentials = (user: string) => {
	return {
		action: Actions.SETUSERCREDENTIALS,
		payload: user,
	};
};