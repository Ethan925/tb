'use strict';
import _ from 'lodash';
import {
  AppRegistry,
  Text,
  View,
  Navigator,
  AsyncStorage,
  StyleSheet,
  Image,
  TextInput,
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


export default class Account extends Component {

  constructor(props){

    super(props);
    this.state = {
      loaded: false,
    }

  }

  componentWillMount(){
    AsyncStorage.getItem('user_data').then((user_data_json) => {
      const user = JSON.parse(user_data_json);
      app.database().ref('users/' + user.uid).once('value').then((snapshot) => {
        const dbUser = snapshot.val();
        this.setState({
          user,
          dbUser,
          loaded: true,
        });
      });
    });

    app.database().ref('talents/').once('value').then((snapshot) => {
      const talents = snapshot.val();
      this.talentOptions = _.map(talents, (talent) => {
        return <Picker.Item label={talent} key={talent} value={talent} />;
      });
    });
  }


  logout(){
    AsyncStorage.removeItem('user_data').then(() => {
      app.auth().signOut().then(() => {
        this.props.navigator.push({
          component: Login,
        });
      }, (error) => {
       console.log('error logging out', error)
      });
    });
  }

  updateUser() {
    app.database().ref('users/' + this.state.dbUser.uid).set(this.state.dbUser)
  }

  render(){

    return (
      <View style={styles.container}>
        <Header text="Account" loaded={this.state.loaded} />
        {
          this.state.user &&
            <View style={styles.body}>

              <View style={page_styles.email_container}>
                <Text style={page_styles.email_text}>email: {this.state.user.email}</Text>
                <Text style={page_styles.email_text}>name: {this.state.user.name}</Text>
                <Text style={page_styles.email_text}>talent: {this.state.dbUser.talent}</Text>
                <TextInput
                  style={styles.textinput}
                  value={this.state.dbUser.displayName}
                  placeholder={"displayName"}
                  onChangeText={
                    (text) => this.setState({
                      dbUser: {
                        ...this.state.dbUser,
                        displayName: text,
                      }
                    })
                  }
                />
                <TextInput
                  style={styles.textinput}
                  value={this.state.dbUser.bio}
                  placeholder={"Bio"}
                  onChangeText={
                    (text) => this.setState({
                      dbUser: {
                        ...this.state.dbUser,
                        bio: text,
                      }
                    })
                  }
                />
                <Picker
                  selectedValue={this.state.dbUser.talent}
                  onValueChange={
                    (talent) => {
                      this.setState({
                        dbUser: {
                          ...this.state.dbUser,
                          talent: talent,
                        }
                      })
                    }
                  }
                  mode="dropdown"
                >
                  <Picker.Item label="Select a talent" value="Select a talent" />
                  {this.talentOptions}
                </Picker>
              </View>
              <Button
                text="Save"
                onpress={this.updateUser.bind(this)}
                button_styles={styles.primary_button}
                button_text_styles={styles.primary_button_text}
              />
              <Button
                text="Logout"
                onpress={this.logout.bind(this)}
                button_styles={styles.primary_button}
                button_text_styles={styles.primary_button_text}
              />
            </View>
        }
      </View>
    );
  }

}

const page_styles = StyleSheet.create({
  email_container: {
    padding: 20
  },
  email_text: {
    fontSize: 18
  }
});
