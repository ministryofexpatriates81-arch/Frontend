import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCYH0ZSeLjH_T3HJ9hVQ84afB5KyAEZi2Y",
    authDomain: "my-sc-tools.firebaseapp.com",
    databaseURL: "https://my-sc-tools-default-rtdb.firebaseio.com",
    projectId: "my-sc-tools",
    storageBucket: "my-sc-tools.appspot.com",
    messagingSenderId: "285986090017",
    appId: "1:285986090017:web:9d872b9bb5c472bcb74760"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
