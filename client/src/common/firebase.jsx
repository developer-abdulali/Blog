// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCl-k3plKoNEejYO6TU3doeDEHp2O4tTa4",
  authDomain: "mern-blog-website-37e90.firebaseapp.com",
  projectId: "mern-blog-website-37e90",
  storageBucket: "mern-blog-website-37e90.appspot.com",
  messagingSenderId: "680707217892",
  appId: "1:680707217892:web:478cbe8af1224c2a230ff1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// google auth
const provider = new GoogleAuthProvider();
const auth = getAuth();

export const authWithGoogle = async () => {
  let user = null;

  await signInWithPopup(auth, provider)
    .then((result) => {
      user = result.user;
    })
    .catch((err) => {
      console.log(err);
    });

  return user;
};
