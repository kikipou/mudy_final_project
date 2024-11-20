export type Observer = { render: () => void } & HTMLElement;

export type AppState = {
	screen: string;
	posts: [];
	
	user: '';
	userPost:string [];
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
	'GETPOSTS' = 'GETPOSTS',
	'GETPOSTSBYUSER' = 'GETPOSTSBYUSER',
	'SETUSERCREDENTIALS' = 'SETUSERCREDENTIALS',
	'GETUSERNAME' = 'GETUSERNAME'
}