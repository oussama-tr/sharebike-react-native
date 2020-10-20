/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

export default class Card extends Component {

  constructor(props) {
  super(props);
       this.state = {
          card: null,
       }
  }

  componentDidMount() {
    this.setState({
          card: this.props.navigation.state.params.card,
        });
    }

  render() {
    return (
      <View style={styles.container}>
        <Text>I'm the Card component</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
