'use strict';
import _ from 'lodash';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Picker,
  ListView,
  Button,
} from 'react-native';

import React, {
  Component,
} from 'react';

import Header from './components/Header';

import styles from './util/styles.js';

import app from './util/firebase.js';


export default class Detail extends Component {

   constructor(props) {
    super(props);
    console.log(props);
    this.state = {
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

  render(){
    if(this.state.component) {
      return (
        <Navigator
          initialRoute={{component: this.state.component}}
          configureScene={() => {
            return Navigator.SceneConfigs.FloatFromRight;
          }}
          renderScene={(route, navigator) => {
            console.log(route, navigator);
            if(route.component){
              return React.createElement(route.component, { navigator });
            }
          }}
          custom={{hello: 'there'}}
        />
      );
    } else {
      return (
        <View style={{flex: 1, paddingTop: 22}}>
          <Text>{this.props.navigator.props.user.displayName}</Text>
        </View>
      );
    }
  }

}

const page_styles = StyleSheet.create({

});
