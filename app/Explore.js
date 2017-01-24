'use strict';
import _ from 'lodash';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Picker,
} from 'react-native';

import React, {
  Component,
} from 'react';

import Button from './components/Button';
import Header from './components/Header';

import Login from './Login';

import styles from './util/styles.js';

import app from './util/firebase.js';


export default class Explore extends Component {

  constructor(props){

    super(props);
    this.state = {
      loaded: false,
    }

  }

  componentWillMount(){

    app.database().ref('talents/').once('value').then((snapshot) => {
      const talents = snapshot.val();
      this.talentOptions = _.map(talents, (talent) => {
        return <Picker.Item label={talent} key={talent} value={talent} />;
      });
    });
  }

  render(){

    return (
      <View style={styles.container}>
        <Header text="Explore" loaded={this.state.loaded} />
        <Text>Here</Text>
      </View>
    );
  }

}

const page_styles = StyleSheet.create({

});
