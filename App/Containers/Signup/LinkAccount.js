import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground
} from 'react-native';
import Background from '../../assets/imgs/curved_background_2.png';
import InputTextField from '../../Components/InputTextField';
import PhoneImage from '../../assets/imgs/phone.png';
import ButtonNext from '../../Components/ButtonNext';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import { sendOtp } from '../../Services/api/authService';

export default class LinkAccount  extends Component{

  constructor () {
    super()
    this.state = {
      number: ""
    }
  }

  _generateRandomOtp = () => {
    return Math.floor(100000 + Math.random() * 900000);
  }

  _onTextChange = (number) => {
      this.setState({number: number});
      number.length === 8 ? this.nextButton._enable(true) : this.nextButton._enable(false);
  };

  _onPressButton = () => {
    const user_details = {...this.props._getCurrentDetails(), number: this.state.number};
    this.props._updateState(user_details);

    const randomOtp = this._generateRandomOtp();
    console.log('this is the generated otp in case u didn\'t recieve an sms');
    console.log(randomOtp);
    this.props._setOtp(randomOtp);

    // sms logic here
  /*  sendOtp({ to: '+216'.concat(this.state.number), body: "To verify your account , please use the following password : ".concat(randomOtp)})
    .then((rsp) => {
		})
		.catch((err) => {
		    console.log(err);
		})*/
    this.props._nextStep(2);
  }


  render () {
    const { number } = this.state;
    const {fullname} = this.props._getCurrentDetails();

    return (
      <View style={styles.container}>
        <ImageBackground source={Background} style={{flex: 1}}>
          <View style={{marginTop: 20, marginLeft: 20, marginRight: 60}}>
            <Text style={styles.text}>You're cute,</Text>
            <Text style={styles.textColored}>{fullname}</Text>
            <Text style={styles.text}>Can I have your number ?</Text>
          </View>
          <View style={{paddingHorizontal: 60, marginVertical: 30, justifyContent: 'center', alignItems: 'center'}}>
          <Image source={PhoneImage} style = {{marginBottom: 30}}/>
          <SmoothPinCodeInput
          ref={number => {
            this.number = number;
          }}
            textStyleFocused = {{
        color: '#8CCBFF'
        }}
        codeLength  = {8}
          value = {number}
            cellSpacing = {5}
            cellSize = {40}
            textStyle = {styles.pin}
            cellStyle={{
              borderWidth: 1,
              borderColor: '#fff',
            }}
            cellStyleFocused={{
              borderWidth: 2,
              borderColor: '#8CCBFF',
            }}
            onTextChange= {this._onTextChange}
            />

            <View style = {{marginTop: 40}}>

          <ButtonNext text="Next"
            customStyles={{ marginTop: 34 }}
            ref={nextButton => {this.nextButton = nextButton}}
            _onPressButton = {this._onPressButton}/>
            </View>
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
  pin: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  text: {
    color: "#fff",
    fontFamily: 'google_sans_bold',
    fontSize: 22,
    fontWeight: '300',
  },
  textColored: {
    color: '#8CCBFF',
    fontFamily: 'google_sans_bold',
    fontSize: 22,
    fontWeight: '300',
  }
});
