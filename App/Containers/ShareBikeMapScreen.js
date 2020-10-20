import React, { Component } from 'react'
import {
  Image,
  TouchableWithoutFeedback,
  View,
  Picker,
  Modal,
  ImageBackground,
  ScrollView,
  Dimensions,
  ActivityIndicator
} from 'react-native'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// Styles
import styles from './Styles/ShareBikeMapScreenStyle'
import { Block, Text, theme } from 'galio-framework'
import { argonTheme , Images } from '../constants'
import {BackHandler} from 'react-native';
import RoundedButton from '../../App/Components/RoundedButton'
import ShareBikeReservationModal from './ShareBikeReservationModal'
import { Card } from '../Components'
import articles from '../constants/articles'
import reservations from '../constants/Reservations'
import moment from 'moment'
import axios from 'axios'
import { AsyncStorage } from 'react-native';
import jwtDecode from 'jwt-decode'
import { Config } from '../Config/api';
const { width } = Dimensions.get("screen");
const thumbMeasure = (width - 48 - 32) / 3;
const cardWidth = width - theme.SIZES.BASE * 2;
const API_URL = Config.API_URL;
var date = moment()
  .format('DD/MM/YYYY');

class ShareBikeMapScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showModal: false,
      loading: true,
      data: [],
      error: null,
      user:null,
      selectedReservation:{},
    }

  }


  componentDidUpdate (prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
    this.props.navigation.addListener('willFocus', payload  => {
      console.log(payload);
      this.makeRemoteRequest();
    });
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

    }).then(this.makeRemoteRequest);
     });
  }
  makeRemoteRequest = () => {
    const url = API_URL+"/reservations/user/"+this.state.user._id;

    console.log(this.state.user._id);



    //console.log(this.state.name);
    this.setState({ loading: true });

    axios.get(url)
       .then(res => {
         this.setState({
           data: res.data,  //res.results
           error: res.error || null,
         });
         this.setState({ loading: false});
        // console.log(this.state.data);
         this.arrayholder = res.data;  //res.results

       })
       .catch(error => {
         console.log(error);
         this.setState({ error, loading: true });
       });

  }


  toggleModal = (reservation) => {
    if (reservation != null){
      this.setState({   selectedReservation : reservation },()=>{ this.setState({ showModal: !this.state.showModal })});
    }


    // this.setState({ showModal: !this.state.showModal })

  }
  async componentDidMount() {
    const promise = await this.getUser();



  }

  renderCards = () => {
    if (!this.state.loading)
    return (
      <Block flex style={styles.group}>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          {this.state.data.map((item) => {
            console.log(moment(item.dateReservation).format('DD/MM/YYYY'));
            if (moment(item.dateReservation).format('DD/MM/YYYY') === date)
            {
             // console.log(item);
              item.route= "BikeReservationScreen"//change to unlock bike Screen #bassem note to self
            }
            return (
              <Card screenProps={{ toggle: this.toggleModal }}  item={item} horizontal />
            );
          })}
        </Block>
      </Block>
    );
  };


  render () {
    const horizontal = true;
    const navigation = this.props.navigation;
    const cardContainer = [styles.card, styles.shadow, {paddingRight: theme.SIZES.BASE, }];
    const imgContainer = [styles.imageContainer,
      horizontal ? styles.horizontalStyles : styles.verticalStyles,
      styles.shadow
    ];
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator />
        </View>
      );
    }

    else
    return (
      <ScrollView style={ {paddingRight: theme.SIZES.BASE/2, }} >




        <Block row={false} card flex style={cardContainer}>
          <Block flex style={imgContainer}>
            <RoundedButton onPress={this.toggleModal}>
              Add reservation
            </RoundedButton>
            {this.renderCards()}

          </Block>



          <Modal
            visible={this.state.showModal}
            onRequestClose={this.toggleModal}>
            <ShareBikeReservationModal     screenProps={{ toggle: this.toggleModal,reservation:this.state.selectedReservation,nav:this.props.navigation }} />
          </Modal>

        </Block>
      </ScrollView>    )
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

export default ShareBikeMapScreen
