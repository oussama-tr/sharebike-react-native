import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  ImageBackground
} from 'react-native';

import Background from '../../assets/imgs/curved_background_1.png';
import PhoneImage from '../../assets/imgs/otp_sent.png';
import ButtonNext from '../../Components/ButtonNext';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import { Button } from '../../../App/Components'
import { Block, theme } from 'galio-framework'

export default class RegistrationComplete extends Component{

  state = {
    code: '',
  };

  render()
  {
    const { code } = this.state;

    return (
      <View style={styles.container}>
        <ImageBackground source={Background} style={{flex: 1}}>
          <View style={{marginTop: 20, marginLeft: 20, marginRight: 40}}>
            <Text style={styles.header}>Congratulations!</Text>
            <Text style={styles.header}>You are now a Bikeaholic, here are some guidelines to get you started.</Text>

          </View>

        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5
  },
  text_bold: {
    color: '#8CCBFF',
    fontSize: 22,
    marginBottom: 5,
    fontWeight: 'bold'
  },
  header: {
    color: "#fff",
    fontFamily: 'google_sans_bold',
    fontSize: 22,
    fontWeight: '300',
  },
  pin: {
    color: '#fff',
    fontSize: 25,
  },
  link: {
    textDecorationLine:'underline',
    marginTop: 15,
    marginBottom: 12,
    color: "#fff",
    fontSize: 19,
    fontWeight: "bold",
    alignSelf: 'flex-end',
    marginRight: 50
  },
});
