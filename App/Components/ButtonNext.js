import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import React, { Component } from 'react';
import Colors from '../res/colors';

export default class ButtonNext extends Component {
	state = {
		enabled: false,
	};

	_enable = value => {
		this.setState({ enabled: value });
	};

	_onPressButton = () => {
		this.props._onPressButton();
	};

	render() {
		const {customStyles, text} = this.props;

		return (
			<TouchableHighlight
				disabled={this.state.enabled ? false : true}
				onPress={this._onPressButton}
				style={[styles.submitContainer, customStyles,
					this.state.enabled ? { backgroundColor: Colors.columbiaBlue }: { backgroundColor: Colors.dustyGray }]}>
				<View>
					<Text style={styles.submitText}>{text}</Text>
				</View>
			</TouchableHighlight>
		);
	}
}

const styles = StyleSheet.create({
	submitContainer: {
		fontSize: 16,
		borderRadius: 40,
		paddingVertical: 12,
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 100,
	},
	submitText: {
		color: '#fff',
		fontWeight: '600',
		fontSize: 20,
		textAlign: 'center',
		fontFamily: 'google_sans_bold',
	},
});
