export type Observer = { render: () => void } & HTMLElement;

export type AppState = {
	screen: string;
	posts: [];
	user: {
        username: string,
        name: string,
		userId: string
    },
	userPosts: [];
	postsByUser: [];
	currentStateProfile: [];
	currentUserPosts: [];
};

export enum Screens {
	'REGISTER' = 'REGISTER',
	'LOGIN' = 'LOGIN',
	'DASHBOARD' = 'DASHBOARD',
	'PROFILE' = 'PROFILE',
	'MYLIBRARY' = 'MYLYBRARY',
	'CATEGORIES' = 'CATEGORIES',
	'PUBLISH' = 'PUBLISH',
	'SEARCH' = 'SEARCH',
	'EDITPROFILE' = 'EDITPROFILE',
	'CATEGORY' = 'CATEGORY',
	'PLAYER' = 'PLAYER',
}

export enum Actions {
	'NAVIGATE' = 'NAVIGATE',
	'GETUSERS' = 'GETUSERS',
	'GETPOSTSINFO' = 'GETPOSTSINFO',
	'GETPOSTSBYUSER' = 'GETPOSTSBYUSER',
	'SETUSERCREDENTIALS' = 'SETUSERCREDENTIALS',
	'GETUSERNAME' = 'GETUSERNAME',
	'GETCURRENTUSERPROFILE' = 'GETCURRENTUSERPROFILE',
	'GETPOSTSFORCURRENTUSER' = 'GETPOSTSFORCURRENTUSER',
	'GETUSERGENRE' = 'GETUSERGENRE',
	
}