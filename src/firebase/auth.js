import { authentication } from "./firebase";
import firebase from "firebase";

// Sign Up
export const doCreateUserWithEmailAndPassword = (email, password) =>
  authentication.createUserWithEmailAndPassword(email, password);

// Sign In
export const doSignInWithEmailAndPassword = (email, password) =>
  authentication.signInWithEmailAndPassword(email, password);

// Sign out
export const doSignOut = () => authentication.signOut();

///// FireBase DataBase//////
export const dbsavedata = payload => {
  let id = payload.id;
  let store = {
    Topic: payload.Topic,
    Information: payload.Information
  };

  // console.log("Here daata to save in firebase is", datatosave);

  var ref = firebase.database().ref(`/users/` + id);
  ref.push(store);
};

///Firebase database data retrieved////
export const retriveDataFromFirebase = id => {
  return firebase
    .database()
    .ref("users/" + id)
    .once("value")
    .then(snapshot => {
      let data = snapshot.val();
      let keys = (data && Object.keys(data)) || [];
      return (keys && keys.map(i => data[i])) || [];
    });
};

///Firebase Delete the data from firebase database array
export const deleteDataFromFirebase = (id, index) => {
  firebase
    .database()
    .ref("users/" + id)
    .once("value")
    .then(snapshot => {
      // console.log(snapshot.val());
      let data = snapshot.val();
      let keys = (data && Object.keys(data)) || [];
      let result = keys.map(i => data[i]);
      // console.log(result);
      result.splice(index, 1);
      // console.log("NEw result are:", result);
      var ref = firebase.database().ref(`/users/` + id);
      ref.set(result);
    });
};

///Firebase Edit Datta in list

export const editDataInFirebase = (index, item, id) => {
  firebase
    .database()
    .ref("users/" + id)
    .once("value")
    .then(snapshot => {
      console.log(snapshot.val());
      let data = snapshot.val();
      let keys = (data && Object.keys(data)) || [];
      let result = keys.map(i => data[i]);
      console.log("Before result are", result);
      result[index].Information = item;
      console.log(" After result are", result);
      var ref = firebase.database().ref(`/users/` + id);
      ref.set(result);
    });
};
