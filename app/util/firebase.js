import * as firebase from 'firebase';
const firebaseConfig = {
  apiKey: "AIzaSyATXL8waxCWCSWQRALbpG39yBA4WiIsKy4",
  authDomain: "talentbase-b2a57.firebaseapp.com",
  databaseURL: "https://talentbase-b2a57.firebaseio.com",
  storageBucket: "talentbase-b2a57.appspot.com",
  messagingSenderId: "362797496015",
};
let app = firebase.initializeApp(firebaseConfig, 'talentBase');

module.exports = app;
