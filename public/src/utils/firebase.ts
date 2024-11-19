import { appState } from '../store';
import { getAuth } from 'firebase/auth';

let db: any;
let auth: any;
let storage: any;

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
		const q = query(ref, where('userUid', '==', appState.user));
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
			userUid: appState.user,
		};
		await addDoc(where, registerPost);
		console.log('Succesfully added');
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
	const { storage } = await getFirebaseInstance();
	const { ref, getDownloadURL } = await import('firebase/storage');

	const storageRef = ref(storage, 'imagesProfile/' + id);
	const urlImg = await getDownloadURL(ref(storageRef))
		.then((url) => {
			return url;
		})
		.catch((error) => {
			console.error(error);
		});
	return urlImg;
};
