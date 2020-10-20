import React from "react";
import { DrawerItems } from "react-navigation";
import colors from '../res/colors'
import {
  Animated,
  Text
} from 'react-native'
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  Image
} from "react-native";
import { Block, theme } from "galio-framework";

import Images from "../constants/Images";

const { width } = Dimensions.get("screen");

const Drawer = props => (
  <Block style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
    <Block flex={0.05} style={styles.header}>
      <Image styles={styles.logo} source={Images.Logo} />
      <Text style={styles.logoText}> Bikeaholic </Text>
    </Block>
    <Block flex>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <DrawerItems {...props} />
      </ScrollView>
    </Block>
  </Block>
);

const Menu = {
  contentComponent: props => <Drawer {...props} />,
  drawerBackgroundColor: "white",
  drawerWidth: width * 0.8,
  contentOptions: {
    activeTintColor: "white",
    inactiveTintColor: "#000",
    activeBackgroundColor: "transparent",
    itemStyle: {
      width: width * 0.75,
      backgroundColor: "transparent"
    },
    labelStyle: {
      fontSize: 18,
      marginLeft: 12,
      fontWeight: "normal"
    },
    itemsContainerStyle: {
      paddingVertical: 16,
      paddingHorizonal: 12,
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      overflow: "hidden"
    }
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: colors.blueViolet,
    paddingBottom: theme.SIZES.BASE*5,
    paddingTop: theme.SIZES.BASE * 5,
    justifyContent: 'center',
    alignItems:  'center',
  },
  logoText: {
    color: colors.white,
    fontFamily: 'google_sans_bold',
    fontSize: 26,
    fontWeight: '300',
  }
});

export default Menu;
