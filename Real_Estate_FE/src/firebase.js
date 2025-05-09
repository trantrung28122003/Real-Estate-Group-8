// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyAvLikKnAD3Fcxr_XC-br8Dm_K5aOmeE-g",
  authDomain: "tensile-nebula-390307.firebaseapp.com",
  projectId: "tensile-nebula-390307",
  storageBucket: "tensile-nebula-390307.appspot.com",
  messagingSenderId: "287389806280",
  appId: "1:287389806280:web:b8ddddaa1afaaedbff7ffd",
  measurementId: "G-K50FQ2VXFJ"
}; 



// Initialize Firebase
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line
const analytics = getAnalytics(app);

import { getStorage } from "firebase/storage";
const storage = getStorage(app);

export { storage }