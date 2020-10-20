import React from "react";
import { StyleSheet } from "react-native";
import { Block, Text, theme } from "galio-framework";
import Icon from 'react-native-vector-icons/FontAwesome';
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';



import argonTheme from "../constants/Theme";

class DrawerItem extends React.Component {
  renderIcon = () => {
    const { title, focused } = this.props;

    switch (title) {
      case "Home":
        return (
          <Icon name="home" size={30} color="#999999" />
        );
      case "Reservations":
        return (
          <MatIcon name="bike" size={30} color="#999999" />
        );
      case "Navigation":
        return (
          <MatIcon name="google-maps" size={30} color="#999999" />
        );

      case "Blog":
        return (
          <Icon5 name="blog" size={30} color="#999999" />        );

        case "Billing":
          return (
            <Icon name="cc-mastercard" size={30} color="#999999" />
          );
          case "Profile":
            return (
              <Entypo name="user" size={30} color="#999999" />
            );
          case "Logout":
            return (
              <MatIcon name="logout" size={30} color="#999999" />
            );

      default:
        return null;
    }
  };

  render() {
    const { focused, title } = this.props;

    const containerStyles = [
      styles.defaultStyle,
      focused ? [styles.activeStyle, styles.shadow] : null
    ];

    return (
      <Block flex row style={containerStyles}>
        <Block middle flex={0.1} style={{ marginRight: 10 }}>
          {this.renderIcon()}
        </Block>
        <Block row center flex={0.9}>
          <Text
            size={15}
            bold={focused ? true : false}
            color={focused ? "white" : "rgba(0,0,0,0.5)"}
          >
            {title}
          </Text>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  defaultStyle: {
    paddingVertical: 15,
    paddingHorizontal: 14
  },
  activeStyle: {
    backgroundColor: '#7F23D9',
    borderRadius: 4
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 8,
    shadowOpacity: 0.1
  }
});

export default DrawerItem;
