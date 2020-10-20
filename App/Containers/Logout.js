
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import {AsyncStorage} from 'react-native';

export default class MyComponent extends Component {

  componentDidMount() {
    this.removeItem('jwt');
    this.props.navigation.navigate('Auth',{ item: this.state })
  }

  async removeItem(item) {
    try {
      await AsyncStorage.removeItem(item);
    } catch (error) {
          console.error('AsyncStorage error: ' + error.message);
    }
  }

  render() {
    return (
      <View style={styles.container}>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
