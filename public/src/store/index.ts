import { reducer } from './reducer';
import Storage from '../utils/storage';
import { AppState, Observer, Screens } from '../types/store';
import { onAuthStateChanged } from 'firebase/auth';
import { getFirebaseInstance } from '../utils/firebase';
import { navigate, setUserCredentials } from './actions';

const onAuth = async () => {
    const { auth } = await getFirebaseInstance();
    onAuthStateChanged(auth, (user) => {
        if(user){
            user.uid !==null ? dispatch(setUserCredentials(user.uid)) : ''; //Guarda el id del usuario
            dispatch(navigate(Screens.DASHBOARD)) //Para navegar
        }else{
            dispatch(navigate(Screens.LOGIN))
        }
    });
};

onAuth();

//El estado global, appState
const initialState: AppState = {
	screen: 'LOGIN',
	products: [],
    user: {},
};

export let appState = initialState;

let observers: Observer[] = [];


//Crear el dispatch
export const dispatch = (action: any) => {
	const clone = JSON.parse(JSON.stringify(appState));
	const newState = reducer(action, clone);
	appState = newState;

	observers.forEach((o: any) => o.render());
};

//Agregar los observadores para los interesados, los suscritos
export const addObserver = (ref: any) => {
	observers = [...observers, ref];
};