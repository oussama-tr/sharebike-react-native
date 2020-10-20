import React, { Component } from 'react'
import { AppRegistry, StyleSheet, View, Text, Animated } from 'react-native'
import ViewPager from '@react-native-community/viewpager';

import StepIndicator from 'react-native-step-indicator';
import Icon from 'react-native-vector-icons/Ionicons';

import PersonalDelails from './PersonalDelails';
import LinkAccount from './LinkAccount';
import OTPVerification from './OTPVerification';
import RegistrationComplete from './RegistrationComplete';

const indicatorStyles = {
  stepIndicatorSize: 55,
  currentStepIndicatorSize: 80,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#7F23D9',
  stepStrokeWidth: 2,
  separatorStrokeFinishedWidth: 5,
  stepStrokeFinishedColor: '#7F23D9',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#7F23D9',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#7F23D9',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 15,
  currentStepIndicatorLabelFontSize: 15,
  stepIndicatorLabelCurrentColor: '#7F23D9',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 16,
  currentStepLabelColor: '#7F23D9'
}


const stepCount = 4;
const getStepIndicatorIconConfig = ({ position, stepStatus }) => {
  const iconConfig = {
    name: 'feed',
    color: stepStatus === 'finished' ? '#ffffff' : '#7F23D9',
    size:  stepStatus === 'finished' ? 34: 40
  }
  switch (position) {
    case 0: {
      iconConfig.name = 'ios-person'
      break
    }
    case 1: {
      iconConfig.name = 'ios-phone-portrait'
      break
    }
    case 2: {
      iconConfig.name = 'md-finger-print'
      break
    }
    case 3: {
      iconConfig.name = 'ios-rocket'
      break
    }
    default: {
      break
    }
  }
  return iconConfig
}

const RegisterContext = React.createContext('register');


export default class SignUp extends Component {
  constructor () {
    super()
    this.state = {
    currentPage: 0,
    userInfo: {},
    method: 'local',
    otp: '',
    }
  }

  componentDidMount()
  {
    this.viewPager.setScrollEnabled(false);
    const { socialSignup, userInfo, method } = this.props.navigation.state.params;
    if (socialSignup)
    {
      this._nextStep(1);
      this._updateState(userInfo);
      this.setState({ method: method });
    }
  }

  _updateState = (value) => {
    this.setState({ userInfo: value });
  }

  _setOtp = (value) => {
    this.setState({ otp: value });
  }

  _getCurrentDetails = () => {
    return this.state.userInfo;
  }

  _getOtp = () => {
  return this.state.otp;
  }

  _getSignupMethod = () => {
    return this.state.method;
  }

  _nextStep = position => {
    this.setState({ currentPage: position })
    this.viewPager.setPage(position)
  }


  render () {
  return (
    <View style={styles.container}>
      <ViewPager
        style={{ flexGrow: 1 }}
        ref={viewPager => {
          this.viewPager = viewPager
        }}>
      <View key="1">
        <PersonalDelails
          _updateState = {this._updateState}
          _getCurrentDetails = {this._getCurrentDetails}
          _nextStep = {this._nextStep}/>
      </View>
      <View key="2">
        <LinkAccount
          _updateState = {this._updateState}
          _getCurrentDetails = {this._getCurrentDetails}
          _nextStep = {this._nextStep}
          _setOtp = {this._setOtp}/>
      </View>
      <View key="3">
        <OTPVerification
          _getCurrentDetails = {this._getCurrentDetails}
          _nextStep = {this._nextStep}
          _getSignupMethod = {this._getSignupMethod}
          _getOtp = {this._getOtp}/>
      </View>
      <View key="4">
        <RegistrationComplete/>
      </View>
      </ViewPager>
      <View style={styles.stepIndicator}>
        <StepIndicator
        stepCount={4}
          renderStepIndicator={this.renderStepIndicator}
          customStyles={indicatorStyles}
          currentPosition={this.state.currentPage}
          labels={[
            'Create\naccount',
            'Link account\nto phone',
            'Verify\naccount',
            'Registration\ncomplete'
          ]}
        />
      </View>
    </View>
  )
}

  renderStepIndicator = params => (
    <Icon {...getStepIndicatorIconConfig(params)} />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  stepIndicator: {
    marginVertical: 10
  },
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  stepLabel: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
    color: '#999999'
  }
})
