import { appState, dispatch } from '../store';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { navigate, setUserCredentials } from '../store/actions';
import { Screens } from '../types/store';


let db: any;
let auth: any;
let storage: any;

export interface UserProfile {
    uid: string;
    email: string | null;
    name?: string;
    username?: string | null;
    avatarUrl?: string;
    [key: string]: any; // Esto permite agregar otros campos dinámicos desde Firestore
}

export const getFirebaseInstance = async () => {
    if (!db) {
        const { initializeApp } = await import('firebase/app');
        const { getFirestore } = await import('firebase/firestore');
        const { getAuth } = await import('firebase/auth');
        const { getStorage } = await import('firebase/storage');

        const firebaseConfig = {
        apiKey: "AIzaSyD7vRWGFDuTK5STpcVSlINpHk-ZNirv0n8",
        authDomain: "mudy-final-project.firebaseapp.com",
        projectId: "mudy-final-project",
        storageBucket: "mudy-final-project.firebasestorage.app",
        messagingSenderId: "320311462670",
        appId: "1:320311462670:web:289bc7d946ddb66741a55f",
        measurementId: "G-VQ2SFGPGDF"
    };

        const app = initializeApp(firebaseConfig);
        db = getFirestore(app);
        auth = getAuth(app);
        storage = getStorage();

        onAuthStateChanged(auth, async (user) => {
			if (user) {
			 // Si el usuario está autenticado, ejecutamos este bloque.
			    console.log("Usuario autenticado:", user);
			    console.log('data in appState', appState.user);
		
			  // Obtener datos adicionales del usuario desde Firestore
                const { doc, getDoc } = await import('firebase/firestore');
                const userRef = doc(db, 'users', user.uid);
                console.log ('id del user' , user.uid)
                const userDoc = await getDoc(userRef);
                console.log ('userDoc' , userDoc)
		
			if (userDoc.exists()) {
				// Si el documento existe, extraemos y guardamos los datos del usuario.
                const userData: any = userDoc.data();
                localStorage.setItem('user', JSON.stringify(userData));// Guardamos datos en `localStorage`.
                console.log("Nombre de usuario:", userData.username);
                dispatch(setUserCredentials(userData))// Actualizamos el estado de la aplicación con datos del usuario.
                console.log('user in appState', appState.user);
                
                dispatch(navigate(Screens.DASHBOARD))
			}
		    } else {
			    // Usuario no está autenticado se va al login
			    console.log("No hay usuario autenticado.");
			    localStorage.removeItem('user');
			    dispatch(navigate(Screens.LOGIN)); // Navega a la pantalla de login
		    }
		});
    }

    return { db, auth, storage };
};

export const registerUser = async (credentials: any) => {
	try {
		const { auth, db } = await getFirebaseInstance();
		const { createUserWithEmailAndPassword } = await import('firebase/auth');
		const { doc, setDoc } = await import('firebase/firestore');

		const userCredential = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);

		const where = doc(db, 'users', userCredential.user.uid);
		const data = {
			username: credentials.username,
			name: credentials.name,
            musicgenre: credentials.musicgenre,
            profiledesc: credentials.profiledesc,
		};

		await setDoc(where, data);
		return true;
	} catch (error) {
		console.error(error);
		return false;
	}
};

export const loginUser = async (email: string, password: string) => {
    try {
        const { auth } = await getFirebaseInstance();
        const { signInWithEmailAndPassword, setPersistence, browserLocalPersistence } = await import('firebase/auth');
        
        setPersistence(auth, browserLocalPersistence)
        .then(() => {
            return signInWithEmailAndPassword(auth, email, password);
        })
        .catch((error: any) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });

    }   catch (error) {
        console.error(error);
    }
};

export const addUser = async (user: any) => {
    try {
        const { db } = await getFirebaseInstance();
        const { collection, addDoc } = await import ('firebase/firestore');

        const where = collection(db, 'users');
        await addDoc(where, user);
        console.log('Succesfully added');
    }   catch (error) {
        console.error('Error adding document', error);
    }
};

export const getUser = async () => {
    try {
        const { db } = await getFirebaseInstance();
        const { collection, getDocs } = await import ('firebase/firestore');

        const where = collection(db, 'users');
        const querySnapshot = await getDocs(where);
        const data: any[] = [];

        querySnapshot.forEach((doc) => {
            data.push(doc.data());
        });

        return data;
    }   catch (error) {
        console.error('Error getting documents', error);
    }
};

export const signOutUser = async () => {
    const auth = getAuth();
    try {
        await auth.signOut();
        console.log("Session successfully closed");
        // Aquí puedes redirigir al usuario a una pantalla de login, por ejemplo
    } catch (error) {
        console.error("Error logging out:", error);
    }
};

export const logOut = async () => {
    const { auth } = await getFirebaseInstance();
    const { signOut } = await import('firebase/auth');

    try {
        await signOut(auth); 
        console.log("Succesfully log out");
    } catch (error) {
        console.error("Error logging out:", error);
    }
};

export const getUserName = async () => {
	try {
		const { db } = await getFirebaseInstance();
		const { collection, getDocs } = await import('firebase/firestore');

		const where = collection(db, 'users');
		const querySnapshot = await getDocs(where);
		const data: any[] = [];

		querySnapshot.forEach((doc) => {
			data.push(doc.data());
		});

		return data;
	} catch (error) {
		console.error('Error getting documents', error);
	}
};

export const getPostsByUser = async () => {
	try {
		const { db } = await getFirebaseInstance();
		const { collection, getDocs, query, where } = await import('firebase/firestore');

		const ref = collection(db, 'posts');
		const q = query(ref, where('userUid', '==', appState.user.userId));
		const querySnapshot = await getDocs(q);
		const data: any[] = [];

		querySnapshot.forEach((doc) => {
			data.push(doc.data());
		});

		return data;
	} catch (error) {
		console.error('Error getting documents', error);
	}
};

export const getPostsInfo = async () => {
	try {
		const { db } = await getFirebaseInstance();
		const { collection, getDocs } = await import('firebase/firestore');

		const where = collection(db, 'posts');
		const querySnapshot = await getDocs(where);
		const data: any[] = [];

		querySnapshot.forEach((doc) => {
			data.push(doc.data());
		});

		return data;
	} catch (error) {
		console.error('Error getting documents', error);
	}
};

export const uploadPost = async (file: File, userId: string, uniqueFileName: string) => {
    const { storage } = await getFirebaseInstance();
    const { ref, uploadBytes } = await import('firebase/storage');

    // Crea la referencia en Firebase Storage con el nombre único
    const storageRef = ref(storage, uniqueFileName);

    try {
        // Sube el archivo a Firebase Storage
        await uploadBytes(storageRef, file);
        console.log('File uploaded successfully:', uniqueFileName);
    } catch (error) {
        console.error('Error uploading file:', error);
    }
};

export const addPost = async (post: any) => {
	try {
		const { db } = await getFirebaseInstance();
		const { collection, addDoc } = await import('firebase/firestore');

        let imageUrl = ''

        if (post.coverimg) {
			// Si el post contiene una imagen, la subimos a Firebase Storage.
			const { ref, uploadBytes, getDownloadURL } = await import('firebase/storage');
			const storageRef = ref(storage, `images/${appState.user}/${post.title}`);
			await uploadBytes(storageRef, post.coverimg); // Subimos la imagen.
			imageUrl = await getDownloadURL(storageRef); // Obtenemos la URL de descarga de la imagen.
			console.log('img url', imageUrl);
		}

		const where = collection(db, 'posts');
		const registerPost = {
			title: post.title,
			genre: post.genre,
			tags: post.tags,
			coverimg: imageUrl,
            username: appState.user.username,
            userUid: appState.user.userId,
		};
        
        
		const docRef = await addDoc(where, registerPost);
		console.log('Documento creado con ID:', docRef.id);

		// Si deseas guardar el UID en el documento mismo:
		const { updateDoc } = await import('firebase/firestore');
		await updateDoc(docRef, { uid: docRef.id });
		console.log('UID añadido al documento:', docRef.id);

		// Agregamos el post a Firestore.
		
		console.log('Documento creado con ID:', docRef.id);

	} catch (error) {
		console.error('Error adding document', error);
	}
};

export const getPost = async (fileName: string) => {
    const { storage } = await getFirebaseInstance();
    const { ref, getDownloadURL } = await import('firebase/storage');

    // Referencia a la imagen subida, utilizando el nombre de archivo único
    const storageRef = ref(storage, fileName);

    try {
        // Obtiene la URL de descarga del archivo
        const urlImg = await getDownloadURL(storageRef);
        return urlImg;
    } catch (error) {
        console.error('Error getting image URL:', error);
    }
};

export const uploadFile = async (file: File, id: string) => {
	const { storage } = await getFirebaseInstance();
	const { ref, uploadBytes } = await import('firebase/storage');

	const storageRef = ref(storage, 'imagesProfile/' + id);
	uploadBytes(storageRef, file).then((snapshot) => {
		console.log('File uploaded');
	});
};

export const getFile = async (id: string) => {
	const {storage} = await getFirebaseInstance();
	const {ref, getDownloadURL} = await import ('firebase/storage');
	const storageRef = ref(storage, 'imagesProfile/' + id);
	const urlImg= await getDownloadURL(ref(storageRef)).then ((url) => {
		return url;
	}).catch((error) => {
		console.error(error);
	});
	return urlImg;
}

export const getCurrentUserProfile = async (): Promise<UserProfile> => {
    try {
        const { auth, db } = await getFirebaseInstance();
        const { onAuthStateChanged } = await import('firebase/auth');
        const { doc, getDoc } = await import('firebase/firestore');

        return new Promise<UserProfile>((resolve, reject) => {
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    // Obtener información del usuario desde Firestore
                    const userDocRef = doc(db, 'users', user.uid);
                    const userDoc = await getDoc(userDocRef);

                    if (userDoc.exists()) {
                        const userData: UserProfile = {
                            uid: user.uid,
                            email: user.email,
                            username: user.username,
                            
                            ...userDoc.data(),
                        };
                        console.log('Usuario autenticado:', userData);
                        resolve(userData);
                    } else {
                        console.error('No se encontró el perfil del usuario en Firestore');
                        reject('Perfil no encontrado');
                    }
                } else {
                    console.log('No hay usuario autenticado');
                    reject('Usuario no autenticado');
                }
            });
        });
    } catch (error) {
        console.error('Error obteniendo el usuario actual:', error);
        throw error;
    }
};

export const getPostsForCurrentUser = async () => {
    try {
        const { auth, db } = await getFirebaseInstance();
        const { onAuthStateChanged } = await import('firebase/auth');
        const { collection, query, where, getDocs } = await import('firebase/firestore');

        return new Promise((resolve, reject) => {
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    // Filtrar los posts por el UID del usuario autenticado
                    const postsCollection = collection(db, 'posts');
                    const userPostsQuery = query(postsCollection, where('userUid', '==', user.uid));
                    const querySnapshot = await getDocs(userPostsQuery);

                    const userPosts: any[] = [];
                    querySnapshot.forEach((doc) => {
                        userPosts.push({ id: doc.id, ...doc.data() });
                    });

                    console.log('Posts del usuario:', userPosts);
                    resolve(userPosts);
                } else {
                    console.log('No hay usuario autenticado');
                    reject('Usuario no autenticado');
                }
            });
        });
    } catch (error) {
        console.error('Error obteniendo los posts del usuario:', error);
        throw error;
    }
};

export const getUserGenre = async (userId: string) => {
    try {
        const { db } = await getFirebaseInstance();
        const { collection, getDocs, query, where } = await import('firebase/firestore');

        // Crear una consulta para encontrar el documento del usuario específico
        const usersCollection = collection(db, 'users');
        const userQuery = query(usersCollection, where('uid', '==', userId));
        const querySnapshot = await getDocs(userQuery);

        // Extraer los datos del usuario
        let genre = null;
        querySnapshot.forEach((doc) => {
            genre = doc.data().favoriteGenre || null; // Obtén el género musical si existe
        });

        return genre;
    } catch (error) {
        console.error('Error getting the music genre', error);
        return null;
    }
};

export const saveUserGenre = async (userId: string, genre: string) => {
    try {
        const { db } = await getFirebaseInstance();
        const { doc, setDoc } = await import('firebase/firestore');

        // Ruta al documento del usuario
        const userDocRef = doc(db, 'users', userId);

        // Guardar o actualizar el género musical
        await setDoc(userDocRef, { favoriteGenre: genre }, { merge: true });

        console.log('Music genre succesfully added');
    } catch (error) {
        console.error('Error adding the music genre', error);
    }
};





