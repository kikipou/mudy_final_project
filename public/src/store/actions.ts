import { Actions, Screens } from '../types/store';
import { getUser, getUserName, getCurrentUserProfile } from '../utils/firebase';
import { getPostsInfo, getPostsByUser } from '../utils/firebase';

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

export const getPostsAction = async () => {
	const posts = await getPostsInfo(); //Firestore
	return {
		action: Actions.GETPOSTS,
		payload: posts,
	};
};

export const getPostsByUserAction = async () => {
	const postsByUser = await getPostsByUser(); //Firestore
	return {
		action: Actions.GETPOSTSBYUSER,
		payload: postsByUser,
	};
};

export const getCurrentUserProfileAction = async () => {
	const currentStateProfile = await getCurrentUserProfile(); //Firestore
	return {
		action: Actions.GETCURRENTUSERPROFILE,
		payload: currentStateProfile,
	};
};

export const setUserCredentials = (user: string) => {
	return {
		action: Actions.SETUSERCREDENTIALS,
		payload: user,
	};
};

export const getUserNameAction = async () => {
	const user = await getUserName();
	return {
		action: Actions.GETUSERNAME,
		payload: user,
	};
};