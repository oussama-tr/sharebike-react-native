/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable semi */
/* eslint-disable prettier/prettier */
import React from "react";
import { createAppContainer } from 'react-navigation'
import BikeReservationScreen from '../Containers/BikeReservationScreen'
import FindMyWayScreen from '../Containers/FindMyWayScreen'
import StripeScreen from '../Containers/StripeScreen'
import ModalDatePickerScreen from '../Containers/ModalDatePickerScreen'
import ShareBikeReservationModal from '../Containers/ShareBikeReservationModal'
import SingleEventScreen from '../Containers/SingleEventScreen'
import ShareBikeMapScreen from '../Containers/ShareBikeMapScreen'
import { createStackNavigator } from 'react-navigation-stack';
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'
import Menu from "./Menu";

import {
  createDrawerNavigator,
} from "react-navigation";

import { Block } from "galio-framework";

// screens
import Splash from '../Containers/Splash';
import Auth from '../Containers/Auth';
import SignUp from '../Containers/Signup/index';
import Home from "../Containers/Home";
import Onboarding from "../Containers/Onboarding";
import Pro from "../Containers/Pro";
import Profile from "../Containers/Profile";
import Register from "../Containers/Register";
import Elements from "../Containers/Elements";
import Articles from "../Containers/Articles";
import Logout from "../Containers/Logout";
import Mycards from "../Containers/scenes/Billing/Mycards";
import Card from "../Containers/scenes/Billing/Card";

// drawer
import DrawerItem from "../Components/DrawerItem";

// header for screens
import Header from "../Components/Header";

// Manifest of possible screens
const PrimaryNav = createStackNavigator({
  BikeReservationScreen: { screen: BikeReservationScreen },
  FindMyWayScreen: { screen: FindMyWayScreen },
  StripeScreen: { screen: StripeScreen },
  ModalDatePickerScreen: { screen: ModalDatePickerScreen },
  ShareBikeReservationModal: { screen: ShareBikeReservationModal },
  SingleEventScreen: { screen: SingleEventScreen },
  ShareBikeMapScreen: { screen: ShareBikeMapScreen },
  LaunchScreen: { screen: LaunchScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'LaunchScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

const transitionConfig = (transitionProps, prevTransitionProps) => ({
  transitionSpec: {
    duration: 400,
    easing: Easing.out(Easing.poly(4)),
    timing: Animated.timing
  },
  screenInterpolator: sceneProps => {
    const { layout, position, scene } = sceneProps;
    const thisSceneIndex = scene.index;
    const width = layout.initWidth;

    const scale = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
      outputRange: [4, 1, 1]
    });
    const opacity = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
      outputRange: [0, 1, 1]
    });
    const translateX = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex],
      outputRange: [width, 0]
    });

    const scaleWithOpacity = { opacity };
    const screenName = "Search";

    if (
      screenName === transitionProps.scene.route.routeName ||
      (prevTransitionProps &&
        screenName === prevTransitionProps.scene.route.routeName)
    ) {
      return scaleWithOpacity;
    }
    return { transform: [{ translateX }] };
  }
});

const FindMyWayStack = createStackNavigator({
  FindMyWayScreen: {
    screen: FindMyWayScreen,
    navigationOptions: ({ navigation }) => ({
      header: <Header search options title="FindMyWayScreen" navigation={navigation} />
    })
  }
},{
  cardStyle: {
    backgroundColor: "#F8F9FE"
  },
  transitionConfig
});

const ArticlesStack = createStackNavigator({
  Articles: {
    screen: Articles,
    navigationOptions: ({ navigation }) => ({
      header: <Header title="Articles" navigation={navigation} />
    })
  }
},{
  cardStyle: {
    backgroundColor: "#F8F9FE"
  },
  transitionConfig
});
const ProfileStack = createStackNavigator({
  Profile: {
    screen: Profile,
    navigationOptions: ({ navigation }) => ({
      header: (
        <Header left={<Block />} white transparent title="Profile" navigation={navigation} />
      ),
      headerTransparent: true
    })
  }
},{
  cardStyle: {
    backgroundColor: "#F8F9FE"
  },
  transitionConfig
});


const BillingStack = createStackNavigator({
  Billing: {
    screen: Mycards,
    navigationOptions: ({ navigation }) => ({
      header: <Header title="Billing" navigation={navigation} />
    })
  },
  Card: {
    screen: Card,
    navigationOptions: {
      headerShown: false,
    }
  }
},{
  cardStyle: {
    backgroundColor: "#F8F9FE"
  },
  transitionConfig
});

const LogoutStack = createStackNavigator(
  {
    Logout: {
      screen: Logout,
      navigationOptions: ({ navigation }) => ({
        header: (
          <Header white transparent title="Logout" iconColor={'#FFF'} navigation={navigation} />
        ),
        headerTransparent: true
      })
    }
  },
  {
    cardStyle: { backgroundColor: "#FFFFFF" },
    transitionConfig
  }
);

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: ({ navigation }) => ({
        header: <Header search options title="Home" navigation={navigation} />
      })
    },
    Pro: {
      screen: Pro,
      navigationOptions: ({ navigation }) => ({
        header: (
          <Header left={<Block />} white transparent title="" navigation={navigation} />
        ),
        headerTransparent: true
      })
    },
    SingleEventScreen: {
      screen: SingleEventScreen,
      navigationOptions: ({ navigation }) => ({
        header: <Header search options title="SingleEvent" navigation={navigation} />
      })
    }
  },
  {
    cardStyle: {
      backgroundColor: "#F8F9FE"
    },
    transitionConfig
  }
);
const authStack = createStackNavigator(
  {
    Splash: {
      screen: Splash,
      navigationOptions: {
        headerShown: false,
      }
    },
    Auth: {
      screen: Auth,
      navigationOptions: {
        headerShown: false,
      }
    },
    Signup: {
      screen: SignUp,
      navigationOptions: {
        headerShown: false,
      }
    },
  },
  {
    cardStyle: {
      backgroundColor: "#F8F9FE"
    },
    transitionConfig
  }
);

const MapStack = createStackNavigator({
  ShareBikeMapScreen: {
    screen: ShareBikeMapScreen,
    navigationOptions: ({ navigation }) => ({
      header: <Header search options title="ShareBikeMapScreen" navigation={navigation} />
    })
  },
  ShareBikeReservationModal: {
    screen: ShareBikeReservationModal,
    navigationOptions: ({ navigation }) => ({
      header: (
        <Header left={<Block />} white  title="ShareBikeReservationModal" navigation={navigation} />
      ),
    })
  },ModalDatePickerScreen: {
    screen: ModalDatePickerScreen,
    navigationOptions: ({ navigation }) => ({
      header: (
        <Header left={<Block />} white transparent title="ModalDatePickerScreen" navigation={navigation} />
      ),
    })
  },Pro: {
    screen: Pro,
    navigationOptions: ({ navigation }) => ({
      header: (
        <Header left={<Block />} white transparent title="" navigation={navigation} />
      ),
      headerTransparent: true
    })
  },
  BikeReservationScreen: {
    screen: BikeReservationScreen,
    navigationOptions: ({ navigation }) => ({
      header: <Header search options title="BikeReservation" navigation={navigation} />
    })
  }


},{
  cardStyle: {
    backgroundColor: "#F8F9FE"
  },
  transitionConfig
});
// divideru se baga ca si cum ar fi un ecrna dar nu-i nimic duh
const AppStack = createDrawerNavigator(
  {
    Auth: {
      screen: authStack,
      navigationOptions: {
        drawerLabel: () => {}
      }
    },
    Onboarding: {
      screen: Onboarding,
      navigationOptions: {
        drawerLabel: () => {}
      }
    },
    Home: {
      screen: HomeStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} title="Home" />
        )
      })
    },
    ShareBikeMap: {
      screen: MapStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="ShareBikeMapScreen" title="Reservations" />
        )
      })
    },
    FindMyWayStack: {
      screen: FindMyWayStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="FindMyWayScreen" title="Navigation" />
        )
      })
    },
    Profile: {
      screen: ProfileStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="Profile" title="Profile" />
        )
      })
    },
    Billing: {
      screen: BillingStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="Billing" title="Billing" />
        )
      })
    },
    Logout: {
      screen: LogoutStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="Logout" title="Logout" />
        )
      })
    },
  },
  Menu
);

export default createAppContainer(AppStack)
