export type Observer = { render: () => void } & HTMLElement;

export type AppState = {
	screen: string;
	products: [];
	user: {};
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
	'SETUSERCREDENTIALS' = 'SETUSERCREDENTIALS',
	'GETUSERNAME' = 'GETUSERNAME'
}