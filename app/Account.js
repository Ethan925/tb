'use strict';
import {
  AppRegistry,
  Text,
  View,
  Navigator,
  AsyncStorage,
  StyleSheet,
  Image,
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
      let user_data = JSON.parse(user_data_json);
      console.log(1, user_data, this.state);
      this.setState({
        // user: {
        //   name: 'ethan',
        //   email: 'ethan@gmail.com',
        // },
        loaded: true,
      });
      console.log(2, user_data, this.state);

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

  render(){

    return (
      <View style={styles.container}>
        <Header text="Account" loaded={this.state.loaded} />
        <Text>x{this.state.user}x</Text>
        <Button
          text="Logout"
          onpress={this.logout.bind(this)}
          button_styles={styles.primary_button}
          button_text_styles={styles.primary_button_text}
        />
        <View style={styles.body}>
        {
          this.state.user &&
            <View style={styles.body}>
              <View style={page_styles.email_container}>
                <Text style={page_styles.email_text}>{this.state.user.email}</Text>
              </View>

              <Button
                text="Logout"
                onpress={this.logout.bind(this)}
                button_styles={styles.primary_button}
                button_text_styles={styles.primary_button_text}
              />
            </View>
        }
        </View>
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
