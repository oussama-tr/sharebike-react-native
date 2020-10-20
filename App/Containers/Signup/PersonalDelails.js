import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import Background from '../../assets/imgs/curved_background_1.png';
import ButtonNext from '../../Components/ButtonNext';
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Fumi } from 'react-native-textinput-effects';
import BouncyCheckbox from '../../Components/BouncyCheckbox';
import { RNToasty } from 'react-native-toasty'

export default class PersonalDelails extends Component {

  _checkEmailValid = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  _checkPasswordValid = (password) => {
    var re = /^(?=.{8,20})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/;
    return re.test(String(password));
  }

	_checkFormValid = () => {
    return (this._checkEmailValid(this.email.state.value) && this._checkPasswordValid(this.password.state.value) && this.fullName.state.value != null);
  }

  _onPress = () => {
    this.checkbox.state.checked? this.nextButton._enable(true) : this.nextButton._enable(false);
  }

  _onPressButton = () => {
    if(this._checkFormValid())
    {
      const user_details = {
        fullname: this.fullName.state.value,
        email: this.email.state.value,
        password: this.password.state.value
      };
      this.props._updateState(user_details);
      this.props._nextStep(1);
    }
    else {
      const error = <Icon name="error" size={24} color="#cc0000" family={"MaterialIcons"} />;
      let errorMessage;
      if(!this._checkEmailValid(this.email.state.value)) errorMessage = 'Please verify your email !';
      else if(!this._checkPasswordValid(this.password.state.value)) errorMessage = 'Please verify your password !';
      else errorMessage = 'Please verify you name';

      RNToasty.Show({ title: errorMessage, titleSize: 17, titleColor: '#cc0000', withIcon: true, duration: 1, tintColor: '#FFCCCC', icon: error });
    }
  }

	render() {
		return (
			<View style={styles.container}>
				<ImageBackground source={Background} style={{ flex: 1 }}>
					<View style={{ margin: 20 }}>
						<Text style={styles.header}>Hello there !</Text>
						<Text style={styles.header}>I want to learn more about you.</Text>
					</View>
					<View style={{ marginHorizontal: 40 }}>
						<Fumi
              ref={fullName => {
                this.fullName = fullName;
              }}
							selectionColor={'#99999'}
							label={'Full name'}
							iconName={'user'}
							style={{ backgroundColor: null }}
							labelStyle={{ color: '#fff' }}
							iconClass={Entypo}
							iconColor={'#fff'}
							passiveIconColor={'#fff'}
							iconSize={30}
							height={55}
							iconWidth={50}
							inputPadding={16}
						/>
						<Fumi
              ref={email => {
                this.email = email;
              }}
							label={'Email'}
							iconName={'email'}
							style={{ backgroundColor: null }}
							labelStyle={{ color: '#fff' }}
							iconClass={Entypo}
							iconColor={'#fff'}
							passiveIconColor={'#fff'}
							iconSize={30}
							height={55}
							iconWidth={50}
							inputPadding={16}
						/>
						<Fumi
              ref={password => {
                this.password = password;
              }}
							secureTextEntry={true}
							label={'Password'}
							iconName={'lock'}
							style={{ backgroundColor: null }}
							labelStyle={{ color: '#fff' }}
							iconClass={Entypo}
							iconColor={'#fff'}
							passiveIconColor={'#fff'}
							iconSize={30}
							height={55}
							iconWidth={50}
							inputPadding={16}
						/>
					</View>
					<View style={{ marginHorizontal: 60 }}>
						<Text style={styles.text}>
							Your password must be between
							<Text style={styles.textColored}> 8 and 20 characters</Text>, must
							contain at least one
							<Text style={styles.textColored}> uppercase letter </Text>and one
							<Text style={styles.textColored}> special character</Text>
						</Text>
						<BouncyCheckbox
              onPress = {this._onPress}
              ref={checkbox => {
                this.checkbox = checkbox;
              }}
              text="I agree to the Bikeaholic Terms of Service and Privacy Policy" />
					</View>
					<View style={{ marginHorizontal: 70 }}>
						<ButtonNext
							customStyles={{ marginTop: 45 }}
							text="Next"
							ref={nextButton => {
								this.nextButton = nextButton;
							}}
              _onPressButton = {this._onPressButton}
						/>
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
	header: {
		color: '#fff',
		fontFamily: 'google_sans_bold',
		fontSize: 22,
		fontWeight: '300',
	},
	text: {
		color: '#fff',
		fontSize: 16,
	},
	textColored: {
		color: '#8CCBFF',
		fontWeight: 'bold',
		fontSize: 16,
	},
});
