import React, { Component } from 'react'
import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableHighlight
} from 'react-native';

import Logo from '../assets/imgs/facebook_logo.png';

export default class FacebookSignInButton extends Component {



  render () {

    return (
      <TouchableHighlight
        underlayColor = "#EEEEEE"
        onPress={this.props.onPress}
        style = {styles.container}>
        <View style = {styles.socialButton}>
          <Image source={Logo} style={styles.socialLogo} />
          <Text style={styles.text}>Facebook login</Text>
        </View>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: .96,
    marginTop: 4.4,
    marginBottom: 4.4,
    flexDirection: 'row',
		borderWidth: 1,
		borderColor: 'rgba(173, 100, 189, 0.35)',
		borderRadius: 2,
    elevation: 7,
		backgroundColor: '#fff',

  },
	socialButton: {
		flexDirection: 'row',
	},
  text: {
    paddingTop: 14,
    fontFamily: 'google_sans_bold',
    fontWeight: 'bold',
    color: '#1D2029',
    fontSize: 14
  },
  socialLogo: {
    marginLeft: 6,
    marginTop: 9,
    width: 28,
    height: 28,
    marginRight: 7
  },
});
