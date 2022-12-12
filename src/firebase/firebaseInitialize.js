import firebase from '@react-native-firebase/app';


const firebaseConfig = {
    clientId: '1038999746664-3c7u5u0t2vlpp89k47s6v8r1jto7ras8.apps.googleusercontent.com',
    appId: '1:1038999746664:android:db167882928da0fcc063dd',
    apiKey: 'AIzaSyCWzM6Kh14ix9waku42gqpXiCb-NbN0DN0',
    storageBucket: 'testtodoapp-10207.appspot.com',
    messagingSenderId: '1038999746664',
    databaseURL: 'https://testtodoapp-10207-default-rtdb.asia-southeast1.firebasedatabase.app/',
    projectId: 'testtodoapp-10207',

    persistence: true,
};

export const app = firebase.initializeApp(firebaseConfig);

// Import the functions you need from the SDKs you need

// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth"
// import { getAnalytics } from "firebase/analytics";

// // TODO: Add SDKs for Firebase products that you want to use

// // https://firebase.google.com/docs/web/setup#available-libraries


// // Your web app's Firebase configuration

// // For Firebase JS SDK v7.20.0 and later, measurementId is optional

// const firebaseConfig = {
//     apiKey: "AIzaSyDe0IL_8oBziOSwibFLAl6DNjml72oXdb4",
//     authDomain: "testtodoapplication.firebaseapp.com",
//     projectId: "testtodoapplication",
//     storageBucket: "testtodoapplication.appspot.com",
//     messagingSenderId: "719447148101",
//     appId: "1:719447148101:web:c5637d4f61580c8ed9c52c",
//     measurementId: "G-L9DGW1FN2G"
// };
// // Initialize Firebase

// export const app = initializeApp(firebaseConfig);
// // export const analytics = getAnalytics(app);
// export const auth = getAuth(app)