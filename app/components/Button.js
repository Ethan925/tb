'use strict';
import {
  AppRegistry,
  Text,
  View,
  Navigator,
  AsyncStorage,
  TouchableHighlight,
} from 'react-native';

import React, {
  Component,
} from 'react';

class Button extends Component {

  render(){
    return (
      <View>
        <TouchableHighlight underlayColor={"#E8E8E8"} onPress={this.props.onpress} style={this.props.button_styles}>
          <View>
              <Text style={this.props.button_text_styles}>{this.props.text}</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}


module.exports = Button;
