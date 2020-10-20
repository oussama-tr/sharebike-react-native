import React from 'react'
import {Calendar} from 'react-native-calendars';
import { createStackNavigator, createAppContainer } from 'react-navigation'
import { TouchableOpacity, ScrollView, Text, KeyboardAvoidingView, View, Image, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import { Config } from '../Config/api'
import { Root, Popup } from 'popup-ui'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
const API_URL = Config.API_URL;

// Styles
import styles from './Styles/ModalDatePickerScreenStyle'
import { Images } from '../../ignite/DevScreens/DevTheme'
import ExamplesRegistry from '../Services/ExamplesRegistry'
import Map from '../Components/Map'
import RoundedButton from '../Components/RoundedButton'
import stripe from 'tipsi-stripe'
import testID from './utils/testID'
import axios from 'axios'
import * as QueryString from 'querystringify'
import jwtDecode from 'jwt-decode'
stripe.setOptions({
  publishableKey : 'pk_test_dqleOMbjKQssMiy1iFDpcvdO00yYpf2PTz',
})

let singleItem=null;
let modifying=null;
let reservationId=null;
let nav=null;
class ModalDatePickerScreen extends React.Component {
   constructor (props) {
     super(props)
     this.state = {dates : {
         '2020-05-24': {selected: true, marked: true, selectedColor: 'blue'},
         loading: false,
         token: null,
         selectedDate:null,
         station:null,
         modifying:false,
         Etat: "",
       }}
      singleItem = this.props.navigation.getParam('item', null);
    // console.log(singleItem);
      modifying = this.props.navigation.getParam('modifying', null);
    // console.log(modifying);
     reservationId = this.props.navigation.getParam('reservationId', null);
     nav = this.props.navigation.getParam('nav', null);
    //console.log(reservationId);

   }
   componentDidMount (){
     const promise =this.getUser();

   }

  doPayment = async () => {
     this.setState({loading:'true'});
      axios({
      method: 'POST',
      url:'https://us-central1-avid-rope-272622.cloudfunctions.net/completePaymentWithStripe',
      data: {
        amount: 100,
        currency: 'usd',
        token: this.state.token
      },
    })
      .then(response =>  {
        this.setState({loading:'false'});
        this.makeRemoteRequestReservation()
      })
      .catch((error) => {
        console.error(error);
      });
  };
  handleCardPayPress = async () => {
    if (modifying){

      this.makeRemoteRequestReservation();

    }
    else{
    try {
      this.setState({ loading: true, token: null })
      const token = await stripe.paymentRequestWithCardForm({
        // Only iOS support this options
        smsAutofillDisabled: true,
        requiredBillingAddressFields: 'full',
        prefilledInformation: {
          billingAddress: {
            name: 'Gunilla Haugeh',
            line1: 'Canary Place',
            line2: '3',
            city: 'Macon',
            state: 'Georgia',
            country: 'US',
            postalCode: '31217',
            email: 'ghaugeh0@printfriendly.com',
          },
        },
      })

      this.setState({ loading: false, token })
      this.makeRemoteRequestReservation();
    } catch (error) {
      this.setState({ loading: false })
    }
    }
    //console.log("going");
  }
  async getUser  ()  {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem('jwt').then((token) => {
        const user = jwtDecode(token).user;
        //console.log(user);
        switch (user.method) {
          case 'local':
            console.log('local');
            this.setState({
              user: user,
            });
            break;
          case 'google':
            console.log('google');
            this.setState({
              user: user,
            });
            break;
          case 'facebook':
            console.log('facebook');
            this.setState({
              user: user,
            });
            break;
          default:
            break;
        }

      })
    });
  }
  makeRemoteRequestReservation = () => {
    if (!modifying){
    const url = API_URL+"/reservations/add";

    axios.post(url, QueryString.stringify({
      dateReservation: this.state.selectedDate,
      station: singleItem._id,
      user: this.state.user._id,
    }), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      }
    }).then(response => {
      console.log(response.data);
    }).catch(err => console.log("api Erorr: ", err.response))
    }
    else{
      const url = API_URL+"/reservations/update/"+reservationId;
      axios.put(url, {
        dateReservation: this.state.selectedDate,
        station: singleItem._id,
        user: this.state.user._id,
      })
        .then(response => {
          console.log(response);
          this.setState({etat : "Modified"})
        })
        .catch(error => {
          console.log(err);
        });
    }
    nav.navigate('Home');

  };

  addDate = (day) => {
     this.setState({dates: { '2020-03-15': {selected: true, marked: true, selectedColor: 'blue'},}})
    this.setState({selectedDate:day.dateString},()=>  {console.log('selected day', this.state.selectedDate);}  );
  }

  render () {
    const { loading, token } = this.state
    return (
      <View style={styles.mainContainer2}>
        <Image source={Images.background} style={styles.backgroundImage2} resizeMode='stretch' />
        <TouchableOpacity onPress={() => this.props.navigation.goBack(null)} style={{
          position: 'absolute',
          paddingTop: 30,
          paddingHorizontal: 5,
          zIndex: 10
        }}>
          <Image source={Images.backButton} />
        </TouchableOpacity>

        <ScrollView showsVerticalScrollIndicator={false} bounces={false} style={styles.container}>

          <Text style={styles.sectionText}>Please Select a date !</Text>

          <View style={styles.buttonsContainer2}>

            {
              <Calendar
                onDayPress={(day) => {this.addDate(day); this.setState({dates: { [day.dateString]: {selected: true, marked: true, selectedColor: 'blue'},}})}}
                markedDates={this.state.dates}
                // Specify style for calendar container element. Default = {}
                style={{
                  borderWidth: 1,
                  borderColor: 'gray',
                  height: 350
                }}
                // Specify theme properties to override specific styles for calendar parts. Default = {}
                theme={{
                  backgroundColor: '#ffffff',
                  calendarBackground: '#ffffff',
                  textSectionTitleColor: '#b6c1cd',
                  selectedDayBackgroundColor: '#00adf5',
                  selectedDayTextColor: '#ffffff',
                  todayTextColor: '#00adf5',
                  dayTextColor: '#2d4150',
                  textDisabledColor: '#d9e1e8',
                  dotColor: '#00adf5',
                  selectedDotColor: '#ffffff',
                  arrowColor: 'orange',
                  disabledArrowColor: '#d9e1e8',
                  monthTextColor: 'blue',
                  indicatorColor: 'blue',
                  textDayFontFamily: 'monospace',
                  textMonthFontFamily: 'monospace',
                  textDayHeaderFontFamily: 'monospace',
                  textDayFontWeight: '300',
                  textMonthFontWeight: 'bold',
                  textDayHeaderFontWeight: '300',
                  textDayFontSize: 16,
                  textMonthFontSize: 16,
                  textDayHeaderFontSize: 16
                }}
              />

            }

          </View>

          <View style={{marginTop: 50}}></View>

          <RoundedButton loading={loading}
                         onPress={this.handleCardPayPress}
                         {...testID('cardFormButton')} >
            Confirm reservation
          </RoundedButton>
          <Text style={{flex:1,alignSelf:"center",color:"white",fontSize:36}}>{this.state.etat}</Text>
        </ScrollView>

        <View style={styles.banner}>

          <Text style={styles.bannerLabel}>Made with ❤️ by ShareBike</Text>
        </View>
      </View>
    )
  }
}




const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalDatePickerScreen)
