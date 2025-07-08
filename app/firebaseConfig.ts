// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAoOhXi3SUIIWNDL-zaV4M-COXvrZz-A8c",
  authDomain: "elderease-4f585.firebaseapp.com",
  projectId: "elderease-4f585",
  storageBucket: "elderease-4f585.firebasestorage.app",
  messagingSenderId: "13931355520",
  appId: "1:13931355520:web:1e0f6ee5fe763388777565"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export { firebaseApp };
