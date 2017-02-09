'use strict';
import _ from 'lodash';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Picker,
  ListView,
} from 'react-native';

import React, {
  Component,
} from 'react';

import Header from './components/Header';

import styles from './util/styles.js';

import app from './util/firebase.js';


export default class Explore extends Component {

   constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: this.ds.cloneWithRows([
        <Text>Loading...</Text>,
      ])
    };
  }

  componentWillMount(){

    app.database().ref('users/').orderByChild('talent').equalTo('guitar').once('value').then((snapshot) => {
      console.log(snapshot.val())
      const users = snapshot.val();
      this.setState({
        ...this.state,
        dataSource: this.ds.cloneWithRows(_.map(users, (user) => {
          return  <View style={{paddingBottom: 10}}>
                    <Text>{user.displayName}</Text>
                    <Text>{user.talent}</Text>
                    <Text>{user.bio}</Text>
                  </View>;
        }))
      })
    });
  }

  render(){

    return (
      <View style={{flex: 1, paddingTop: 22}}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <View>{rowData}</View>}
        />
      </View>
    );
  }

}

const page_styles = StyleSheet.create({

});
