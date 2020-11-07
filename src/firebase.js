/*
    notes:
    * change db rules: https://console.firebase.google.com/u/0/project/jj-todo-app/firestore/rules
    * if you get the ['DEFAULT'] firebase error, try restarting npm run start
 */

import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCvKE81YMfQ2CniZggnSzqRMr97jL0Owkg",
    authDomain: "jj-todo-app.firebaseapp.com",
    databaseURL: "https://jj-todo-app.firebaseio.com",
    projectId: "jj-todo-app",
    storageBucket: "jj-todo-app.appspot.com",
    messagingSenderId: "235258480463",
    appId: "1:235258480463:web:dce9c8be2acea2cbbf273a"
});

const db = firebaseApp.firestore();

export default db;
