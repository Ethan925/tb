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

import Login from './Login';

import styles from './util/styles.js';
import app from './util/firebase.js';


class SignUp extends Component {

  constructor(props){
    super(props);
    console.log(props.hello)
    this.state = {
      loaded: true,
      email: '',
      password: ''
    };
  }

  signup(){

    this.setState({
      loaded: false
    });

    app.auth().createUserWithEmailAndPassword(
      this.state.email,
      this.state.password
      ).then((userData) => {
        alert('Your account was created!');
        console.log(userData);
      }).catch((error) => {

        switch(error.code){

          case "EMAIL_TAKEN":
            alert("The new user account cannot be created because the email is already in use.");
          break;

          case "INVALID_EMAIL":
            alert("The specified email is not a valid email.");
          break;

          default:
            alert("Error creating user:");
        }
      });


      this.setState({
        email: '',
        password: '',
      });

  }

  goToLogin(){
    this.props.navigator.push({
      component: Login
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Header text="Signup" loaded={this.state.loaded} />
        <View style={styles.body}>
<Text>{this.state.email}</Text>
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
            text="Signup"
            onpress={this.signup.bind(this)}
            button_styles={styles.primary_button}
            button_text_styles={styles.primary_button_text} />

          <Button
            text="Have an Account?"
            onpress={this.goToLogin.bind(this)}
            button_styles={styles.transparent_button}
            button_text_styles={styles.transparent_button_text} />
        </View>
      </View>
    );
  }
}

module.exports = SignUp;
