import * as firebase from "firebase/app";
import 'firebase/auth';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

export const firebaseConfig = {
    apiKey: "AIzaSyA7e7n-4HuiJNPMPXQh1ZHUzIFKCwzOliY",
    authDomain: "whatsapp-clone-35268.firebaseapp.com",
    projectId: "whatsapp-clone-35268",
    storageBucket: "whatsapp-clone-35268.appspot.com",
    messagingSenderId: "698538062488",
    appId: "1:698538062488:web:42ac1d805ff51f189216ed"
};

export const app = firebase.initializeApp(firebaseConfig);


export const auth = getAuth(app);

const provider = new GoogleAuthProvider();
// provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => signInWithPopup(auth, provider);
