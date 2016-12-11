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
const ActionButton = require('./components/ActionButton');
const ListItem = require('./components/ListItem');
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
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };
    this.itemsRef = firebaseApp.database().ref();
  }

  componentDidMount() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows([{ title: 'Pizza' }])
    })
    console.log('did mount', this.itemsRef);
    this.itemsRef.push({ title: 'heyyyyyy' })
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
