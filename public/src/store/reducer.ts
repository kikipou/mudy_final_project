import { Actions } from '../types/store';

export const reducer = (currentAction: any, currentState: any) => {
	const { action, payload } = currentAction;

	switch (action) {
		case Actions.NAVIGATE:
			return {
				...currentState,
				screen: payload,
			};

		case Actions.GETUSERS:
			return {
				...currentState,
				users: payload,
			};

		case Actions.GETPOSTSINFO:
			return {
				...currentState,
				products: payload,
			};
	
		case Actions.GETPOSTSBYUSER:
			return {
				...currentState,
				productsByUser: payload,
			};

		case Actions.SETUSERCREDENTIALS:
			return {
				...currentState,
				user: payload,
			};

		case Actions.GETUSERNAME:
				return {
					...currentState,
					user: payload,
				};

		case Actions.GETCURRENTUSERPROFILE:
			return {
				...currentState,
				user: payload,
			};

		case Actions.GETPOSTSFORCURRENTUSER:
		return {
			...currentState,
			user: payload,
		};

		case Actions.GETUSERGENRE:
		return {
			...currentState,
			user: payload,
		};

		default:
			return currentState;
	}
};