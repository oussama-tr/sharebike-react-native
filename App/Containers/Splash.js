import React, { Component } from 'react';
import {
	View,
	Text,
	Image,
	StyleSheet,
	Animated,
	ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors from '../res/colors';
import Logo from '../assets/imgs/Logo.png';

export default class Splash extends Component {
	state = {
		LogoAnime: new Animated.Value(0),
		LogoText: new Animated.Value(0),
	};

	componentDidMount() {
		const { LogoAnime, LogoText } = this.state;
		Animated.parallel([
			Animated.spring(LogoAnime, {
				toValue: 1,
				tension: 10,
				friction: 2,
				duration: 1000,
			}).start(),

			Animated.timing(LogoText, {
				toValue: 1,
				duration: 1200,
			}),
		]).start(() => {
      // Go to authentication screen after delay
			setTimeout(() => this.props.navigation.navigate('Auth'), 1500);
		});
	}

	render() {
		return (
			<View style={styles.container}>
				<Animated.View
					style={{
						opacity: this.state.LogoAnime,
						top: this.state.LogoAnime.interpolate({
							inputRange: [0, 1],
							outputRange: [80, 0],
						}),
					}}
				>
					<Image source={Logo} style={{marginBottom: 20}} />
				</Animated.View>
				<Animated.View style={{ opacity: this.state.LogoText }}>
					<Text style={styles.logoText}> Bikeaholic </Text>
				</Animated.View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.blueViolet,
		justifyContent: 'center',
		alignItems: 'center',
	},
	logoText: {
		color: Colors.white,
		fontFamily: 'google_sans_bold',
		fontSize: 30,
		fontWeight: '300',
	},
});
