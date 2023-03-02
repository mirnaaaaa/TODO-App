import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

  const firebaseConfig = {
    apiKey: "AIzaSyDYqMTqnBJyWd06cWlzbuCxWQA2cX4OdtE",
    authDomain: "todo-cfdc2.firebaseapp.com",
    projectId: "todo-cfdc2",
    storageBucket: "todo-cfdc2.appspot.com",
    messagingSenderId: "339783487296",
    appId: "1:339783487296:web:2b7377ecd8b8efe5c934a5",
    measurementId: "G-2FN870Y68X"
  };

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
