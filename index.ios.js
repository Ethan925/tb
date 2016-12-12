'use strict';
import {
  AppRegistry,
  Text,
  View,
  Navigator,
  AsyncStorage
} from 'react-native';

import React, {
  Component,
} from 'react';

import Signup from './app/SignUp';
import Account from './app/Account';

import Header from './app/components/Header';

import styles from './app/util/styles.js';
import app from './app/util/firebase.js';

class tb extends Component {

  constructor(props){
    super(props);
    this.state = {
      component: null,
      loaded: false,
      hello: 'world',
    };
  }

  componentWillMount(){


    AsyncStorage.getItem('user_data').then((user_data_json) => {
      let user_data = JSON.parse(user_data_json);
      let component = {component: Signup};
      if(user_data != null){
        app.authWithCustomToken(user_data.token, (error, authData) => {
          if(error){
            this.setState(component);
          }else{
            this.setState({component: Account});
          }
        });
      }else{
        this.setState(component);
        console.log('else', component)
      }
    });

  }

  render(){

    if(this.state.component){
      return (
        <Navigator
          initialRoute={{component: this.state.component}}
          configureScene={() => {
            return Navigator.SceneConfigs.FloatFromRight;
          }}
          renderScene={(route, navigator) => {
            if(route.component){
              return React.createElement(route.component, { navigator });
            }
          }}
        />
      );
    }else{
      return (
        <View style={styles.container}>
          <Header text="React Native Firebase Auth" loaded={this.state.loaded} />
          <View style={styles.body}></View>
        </View>
      );
    }

  }

}

AppRegistry.registerComponent('tb', () => tb);
