import firebase from "firebase/app";
import "firebase/auth";

const prodConfig = {
  apiKey: "AIzaSyBlBKarDOVCm41Ilr2zR0QvvBt9QVIqAis",
  authDomain: "codesaver-11a4e.firebaseapp.com",
  databaseURL: "https://codesaver-11a4e.firebaseio.com",
  projectId: "codesaver-11a4e",
  storageBucket: "codesaver-11a4e.appspot.com",
  messagingSenderId: "341477315436"
};

const devConfig = {
  apiKey: "AIzaSyBlBKarDOVCm41Ilr2zR0QvvBt9QVIqAis",
  authDomain: "codesaver-11a4e.firebaseapp.com",
  databaseURL: "https://codesaver-11a4e.firebaseio.com",
  projectId: "codesaver-11a4e",
  storageBucket: "codesaver-11a4e.appspot.com",
  messagingSenderId: "341477315436"
};

const config = process.env.NODE_ENV === "production" ? prodConfig : devConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const authentication = firebase.auth();

export { authentication };
