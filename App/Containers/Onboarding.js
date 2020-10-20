import React from "react";
import {
  ImageBackground,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions
} from "react-native";
import { Block, Button, Text, theme } from "galio-framework";
import jwtDecode  from 'jwt-decode';
const { height, width } = Dimensions.get("screen");

import argonTheme from "../constants/Theme";
import Images from "../constants/Images";
import {AsyncStorage} from 'react-native';

class Onboarding extends React.Component {

  constructor(props) {
  super(props);
       this.state = {
          name: ''
       }
  }

  componentDidMount() {
      AsyncStorage.getItem('jwt').then((token) => {
      const user = jwtDecode(token).user;
      console.log(user);
      switch (user.method) {
        case 'local':
        console.log('local');
          this.setState({
            name: user.local.fullname,
          });
          break;
        case 'google':
        console.log('google');
          this.setState({
            name: user.google.fullname,
          });
          break;
        case 'facebook':
        console.log('facebook');
          this.setState({
            name: user.facebook.fullname,
          });
          break;
        default:
          break;
      }

      });
    }

  render() {
    const { navigation } = this.props;

    return (
      <Block flex style={styles.container}>
        <StatusBar hidden />
        <Block flex center>
        <ImageBackground
            source={Images.Onboarding}
            style={{ height, width, zIndex: 1 }}
          />
        </Block>
        <Block center>
          <Image source={Images.LogoOnboarding} style={styles.logo} />
        </Block>
        <Block flex space="between" style={styles.padded}>
            <Block flex space="around" style={{ zIndex: 2 }}>
              <Block style={styles.title}>
                <Block>
                  <Text color="white" size={32}>
                    Welcome
                  </Text>
                </Block>
                <Block>
                  <Text color="white" size={48}>
                    {this.state.name}
                  </Text>
                </Block>
                <Block style={styles.subTitle}>
                  <Text color="white" size={16}>
                    We are happy to see you again
                  </Text>
                </Block>
              </Block>
              <Block center>
                <Button
                  style={styles.button}
                  color={argonTheme.COLORS.SECONDARY}
                  onPress={() => navigation.navigate("Home")}
                  textStyle={{ color: argonTheme.COLORS.BLACK }}
                >
                  Continue to the application
                </Button>
              </Block>
          </Block>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.BLACK
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    position: "relative",
    bottom: theme.SIZES.BASE,
    zIndex: 2,
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0
  },
  logo: {
    width: 200,
    height: 60,
    zIndex: 2,
    position: 'absolute',
    marginTop: '-50%'
  },
  title: {
    marginTop:'-5%'
  },
  subTitle: {
    marginTop: 20
  }
});

export default Onboarding;
