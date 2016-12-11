/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import * as firebase from 'firebase';
// import ReactNative from 'react-native';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView
} from 'react-native';

const StatusBar = require('./components/StatusBar');
const styles = require('./styles.js');

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyATXL8waxCWCSWQRALbpG39yBA4WiIsKy4",
  authDomain: "<your-auth-domain>",
  databaseURL: "https://talentbase-b2a57.firebaseio.com/",
  storageBucket: "gs://talentbase-b2a57.appspot.com",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const provider = new firebase.auth.FacebookAuthProvider();


export default class tb extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.itemsRef = firebaseApp.database().ref();
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log('signed in', user);
      } else {
        console.log('not signed in', user);
      }
    });

    // firebase.auth().signOut();

    // this.itemsRef.push({ title: 'heyyyyyy' });

    // firebase.auth().createUserWithEmailAndPassword('elong925@gmail.com', 'password1!').catch(function(error) {
    //   // Handle Errors here.
    //   console.log(error)
    //   var errorCode = error.code;
    //   var errorMessage = error.message;
    // });
  }
  render() {
    return (
      <View style={styles.container}>

        <StatusBar title="Fuck bitches get money" />

      </View>
    );
  }
  _renderItem(item) {
    return (
      <ListItem item="{item}" />
    );
  }

}

AppRegistry.registerComponent('tb', () => tb);
