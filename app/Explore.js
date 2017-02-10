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
        <Text>Please select a talent</Text>,
      ]),
      talent: undefined,
      loaded: false,
    };
  }

  componentWillMount(){

    app.database().ref('talents/').once('value').then((snapshot) => {
      const talents = snapshot.val();
      this.talentOptions = _.map(talents, (talent) => {
        return <Picker.Item label={talent} key={talent} value={talent} />;
      });
      this.setState({
        ...this.state,
        loaded: true,
      })
    });
  }

  filterUsers(talent) {
    this.setState({
      ...this.state,
      talent,
      dataSource: this.ds.cloneWithRows([
        <Text>Loading...</Text>,
      ])
    });
    app.database().ref('users/').orderByChild('talent').equalTo(talent).once('value').then((snapshot) => {
      console.log(snapshot.val())
      const users = snapshot.val();
      if (users) {
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
      } else {
        this.setState({
          ...this.state,
          dataSource: this.ds.cloneWithRows([
            <Text>Nobody currently matches '{talent}'</Text>,
          ])
        });
      }
    });
  }

  render(){

    return (
      <View style={{flex: 1, paddingTop: 22}}>
        <Picker
          selectedValue={this.state.talent}
          onValueChange={
            (talent) => {
              this.filterUsers(talent);
            }
          }
          mode="dropdown"
        >
          <Picker.Item label="Select a talent" value="Select a talent" />
          {this.talentOptions}
        </Picker>
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
