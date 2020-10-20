import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, ImageBackground } from 'react-native';
import Background from '../../assets/imgs/curved_background_3.png';
import PhoneImage from '../../assets/imgs/otp_sent.png';
import ButtonNext from '../../Components/ButtonNext';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import { googleSignup, localSignup, facebookSignup } from '../../Services/api/authService';

export default class OTPVerification extends Component {
	state = {
		code: ''
	};

	_onTextChange = code => {
		this.setState({ code: code });
		code.length === 6
			? this.nextButton._enable(true)
			: this.nextButton._enable(false);
	};

	_onPressButton = () => {
		if (this.state.code == this.props._getOtp())
		{
			switch(this.props._getSignupMethod())
			{
				case 'local':
					localSignup(this.props._getCurrentDetails())
					.then((rsp) => {
						console.log(rsp.data.token);
						this.props._nextStep(3);
					})
					.catch((err) => {
						console.log(err);
					})
				break;

				case 'google':
					googleSignup(this.props._getCurrentDetails())
					.then((rsp) => {
						console.log(rsp.data.token);
						this.props._nextStep(3);
					})
					.catch((err) => {
						console.log(err);
					})
				break;

				case 'facebook':
				facebookSignup(this.props._getCurrentDetails())
				.then((rsp) => {
					console.log(rsp.data.token);
					this.props._nextStep(3);
				})
				.catch((err) => {
					console.log(err);
				})
				break;
			}
		}
		else {
			this.pinInput.shake();
			this.setState({ code: '' });
			this.nextButton._enable(false);
		}

	};

	render() {
		const { code } = this.state;

		return (
			<View style={styles.container}>
				<ImageBackground source={Background} style={{ flex: 1 }}>
					<View style={{ marginTop: 20, marginLeft: 20, marginRight: 40 }}>
						<Text style={styles.header}>I still don't trust you.</Text>
						<Text style={styles.header}>
							Tell me something that only the two of us know.
						</Text>
					</View>
					<View
						style={{
							marginVertical: 30,
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<Image
							source={PhoneImage}
							style={{ marginRight: 35, marginBottom: 20 }}
						/>
						<Text style={styles.text}>A 6 -digit code has been sent to</Text>
						<Text style={[styles.text_bold, { marginBottom: 20 }]}>
							(+216) {this.props._getCurrentDetails().number}
							<Text>   </Text>
							<Text style={[styles.text, styles.link]}>Send again</Text>
						</Text>

						<SmoothPinCodeInput
							ref={pinInput => {
								this.pinInput = pinInput;
							}}
							textStyleFocused={{
								color: '#8CCBFF',
							}}
							codeLength={6}
							cellSpacing={10}
							cellSize={38}
							textStyle={styles.pin}
							cellStyle={{
								borderBottomWidth: 2,
								borderColor: '#fff',
							}}
							cellStyleFocused={{
								borderColor: '#8CCBFF',
							}}
							value={code}
							onTextChange={this._onTextChange}
						/>

						<ButtonNext
							text="Confirm"
	            customStyles={{ marginTop: 78 }}
							ref={nextButton => {
								this.nextButton = nextButton;
							}}
							_onPressButton={this._onPressButton}
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
	text: {
		color: '#fff',
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 5,
	},
	text_bold: {
		color: '#8CCBFF',
		fontSize: 20,
		marginBottom: 5,
		fontWeight: 'bold',
	},
	header: {
		color: '#fff',
		fontFamily: 'google_sans_bold',
		fontSize: 22,
		fontWeight: '300',
	},
	pin: {
		color: '#fff',
		fontSize: 25,
		fontWeight: 'bold',
	},
	link: {
		marginTop: 15,
		marginBottom: 2,
		color: '#D2F5FF',
		fontSize: 18,
		textDecorationLine: 'underline',
		fontSize: 18,
		textDecorationLine: 'underline',
	},
});
