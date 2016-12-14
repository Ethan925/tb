'use strict';
import {
  AppRegistry,
  Text,
  View,
  Navigator,
  AsyncStorage,
  TextInput,
} from 'react-native';

import React, {
  Component,
} from 'react';

import Button from './components/Button';
import Header from './components/Header';

import Signup from './SignUp';
import Account from './Account';

import Firebase from 'firebase';

import styles from './util/styles.js';
import app from './util/firebase.js';

export default class Login extends Component {

  constructor(props){
    super(props);

    this.state = {
      email: '',
      password: '',
      loaded: true
    }
  }

  render(){
    return (
      <View style={styles.container}>
        <Header text="Login" loaded={this.state.loaded} />
        <View style={styles.body}>
          <TextInput
            style={styles.textinput}
            onChangeText={(text) => this.setState({email: text})}
            value={this.state.email}
            placeholder={"Email Address"}
          />
          <TextInput
            style={styles.textinput}
            onChangeText={(text) => this.setState({password: text})}
            value={this.state.password}
            secureTextEntry={true}
            placeholder={"Password"}
          />

          <Button
            text="Login"
            onpress={this.login.bind(this)}
            button_styles={styles.primary_button}
            button_text_styles={styles.primary_button_text} />

          <Button
            text="Create New Account"
            onpress={this.goToSignup.bind(this)}
            button_styles={styles.transparent_button}
            button_text_styles={styles.transparent_button_text} />
        </View>
      </View>
    );
  }

  login(){
    this.setState({
      loaded: false
    });

    app.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((user_data) => {
      this.setState({
        loaded: true
      });
      AsyncStorage.setItem('user_data', JSON.stringify(user_data));
        this.props.navigator.push({
          component: Account
        });
    }).catch((error) => {
      console.log(error)
      alert('Login Failed. Please try again');
    });
  }

  goToSignup(){
    this.props.navigator.push({
      component: Signup
    });
  }

}
