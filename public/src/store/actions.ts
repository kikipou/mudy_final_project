import { Actions, Screens } from '../types/store';
import { getUser, getUserName, getCurrentUserProfile, getPostsForCurrentUser } from '../utils/firebase';
import { getPostsInfo, getPostsByUser, getUserGenre } from '../utils/firebase';

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
		action: Actions.GETPOSTSINFO,
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

export const getPostsForCurrentUserAction = async () => {
	const currentUserPosts = await getPostsForCurrentUser(); //Firestore
	return {
		action: Actions.GETPOSTSFORCURRENTUSER,
		payload: currentUserPosts,
	};
};

export const getUserNameAction = async () => {
	const user = await getUserName();
	return {
		action: Actions.GETUSERNAME,
		payload: user,
	};
};

// export const getUserGenreAction = async () => {
// 	const userGenre = await getUserGenre();
// 	return {
// 		action: Actions.GETUSERGENRE,
// 		payload: userGenre,
// 	};
// };

export const setUserCredentials = (user: string) => {
	return {
		action: Actions.SETUSERCREDENTIALS,
		payload: user,
	};
};