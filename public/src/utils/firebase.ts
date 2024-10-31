import { collection, addDoc } from "firebase/firestore";

let db: any;

const getFirebaseInstance = async () => {
    if (!db) {
        const { initializeApp } = await import("firebase/app");
        const { getFirestore } = await import("firebase/firestore");

        const firebaseConfig = {
        apiKey: "AIzaSyD7vRWGFDuTK5STpcVSlINpHk-ZNirv0n8",
        authDomain: "mudy-final-project.firebaseapp.com",
        projectId: "mudy-final-project",
        storageBucket: "mudy-final-project.firebasestorage.app",
        messagingSenderId: "320311462670",
        appId: "1:320311462670:web:289bc7d946ddb66741a55f",
        measurementId: "G-VQ2SFGPGDF"
    };

// Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    }
    return db;
};

const addUser = async () => {
try {
    const docRef = await addDoc(collection(db, "users"), {
      first: "Ada",
      last: "Lovelace",
      born: 1815
    });

    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

addUser();