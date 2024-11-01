let db: any;
let auth: any;

export const getFirebaseInstance = async () => {
    if (!db) {
        const { initializeApp } = await import('firebase/app');
        const { getFirestore } = await import('firebase/firestore');
        const { getAuth } = await import('firebase/auth');

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
    }
    return { db, auth };
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

export const registerUser = async (credentials: any) => {
	try {
		const { auth, db } = await getFirebaseInstance();
		const { createUserWithEmailAndPassword } = await import('firebase/auth');
		const { doc, setDoc } = await import('firebase/firestore');

		const userCredential = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);

		const where = doc(db, 'users', userCredential.user.uid);
		const data = {
			username: credentials. username,
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