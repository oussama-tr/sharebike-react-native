import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity
} from 'react-native';
import {AsyncStorage} from 'react-native';
import Button from './components/Button';
import stripe from 'tipsi-stripe'
import { addCard, removeCard, getCards, getCustomer } from '../../../Services/api/paymentService';
import logo from '../../../assets/imgs/mastercard.png';

export default class Mycards extends Component {

  constructor(props) {
  super(props);
       this.getListCall= this.getListCall.bind(this);
       this.state = {
          JSONResult: "",
          loading: false,
          token: null,
          customer: null,
       }
  }


  handleCardPayPress = async () => {

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

      addCard({token: token}, this.state.jwt)
  			.then(rsp => {
  				console.log(rsp.data);
          this.getListCall();
          this._getCustomer();
  			})
  			.catch(err => {
  				console.log(err);
  			});



    } catch (error) {
      this.setState({ loading: false })
    }
  }

  componentDidMount() {
      AsyncStorage.getItem('jwt').then((token) => {
        this.state.jwt = token;
        this.getListCall();
        this._getCustomer();
      });
    }

  _onPressRemove = (id) => {
    removeCard({card_id: id}, this.state.jwt)
      .then(rsp => {
        console.log(rsp.data);
        this.getListCall();
        this._getCustomer();
      })
      .catch(err => {
        console.log(err);
      });
  }

  _getCustomer = () => {
    getCustomer(this.state.jwt)
      .then(rsp => {
        this.setState({
              customer: rsp.data,
            });
      })
      .catch(err => {
        console.log(err);
      });
  }

  _onPressDetails = (item) => {
    //this.props.navigation.navigate('Card',{ card: item })


  }

  getListCall = () => {
    getCards(this.state.jwt)
      .then(rsp => {
        this.setState({
              JSONResult: rsp.data.data,
            });
      })
      .catch(err => {
        console.log(err);
      });
  }

  _renderListItem = (item) => {
    return(
      <View style = {styles.listItem}>
      <Image
             style={styles.logo}
             source={logo}
           />
      <Text style={styles.listText}>****{'     ' + item.last4}</Text>
      <Text style={styles.listText}>{item.exp_month} { '/' + item.exp_year} </Text>
      <TouchableOpacity
        style={styles.remove_btn}
        onPress={() => this._onPressRemove(item.id)}
      >
        <Text style={styles.btn_text}>remove</Text>

      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button }
        onPress={() => this._onPressDetails(item)}
      >
        <Text >set default</Text>
      </TouchableOpacity>

      </View>

    )
  }

  render() {
    const { loading, token } = this.state

    return (
      <View style={styles.container}>
      <Button
        text="Enter a new credit card"
        loading={loading}
        onPress={this.handleCardPayPress}
      />

      <FlatList
          data={ this.state.JSONResult }
          renderItem={({item}) => this._renderListItem(item)}

        />


      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instruction: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  token: {
    height: 20,
  },
  logo: {
    width: 86,
    height: 56.1,
  },

  listItem: {
    flexDirection: 'row',
    marginHorizontal: 10,
    justifyContent: 'space-between'
  },
  listText: {
    alignSelf: 'center'

  },
 button: {
   alignSelf: 'center'
 },
 remove_btn: {
   alignSelf: 'center',
   backgroundColor: '#DC143C',
   borderRadius: 6,
   padding: 6
 },
 btn_text: {
   color: '#ffffff'
 }
})

// import jwtDecode  from 'jwt-decode';
//	const {user} = jwtDecode(rsp.data.token);
