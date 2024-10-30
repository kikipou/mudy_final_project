import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";

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