import React, { Component } from 'react'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
// Styles
import styles from './Styles/ShareBikeReservationModalStyle'
import { ScrollView, Text, Image, View, TouchableOpacity } from 'react-native'
import { Images } from '../../ignite/DevScreens/DevTheme'
import ButtonBox from '../../ignite/DevScreens/ButtonBox'
import { createStackNavigator, createAppContainer } from 'react-navigation'

// Screens
import ModalDatePickerScreen from './ModalDatePickerScreen'
import Map from '../Components/Map'
import ShareBikeMapBox from '../Components/ShareBikeMapBox'
import Home from '../Containers/Home'
import regions from '../constants/regions'
// Styles
const markers = [
  {
    latitude: 37.78828,
    longitude: -122.4324,
    description: "yo",
    title: "Title1"
  },
  {
    latitude: 37.78826,
    longitude: -122.4327,
    description: "yo",
    title: "Title3"
  },
  {
    latitude: 37.78823,
    longitude: -122.4322,
    description: "yo",
    title: "Title4"
  },
  {
    latitude: 37.421995,
    longitude: -122.094,
    description: "yo",
    title: "geolocation"
  },
  {
    latitude: 37.78825,
    longitude: -122.4324,
    description: "blasa mizyena ",
    title: "Title2"
  },
];

class ShareBikeReservationModal extends Component {


  openUsage = () => {

    if (this.state.modifying)
    this.props.navigation.navigate('ModalDatePickerScreen',{ item: this.state.currentStation,modifying:this.state.modifying,reservationId:this.props.screenProps.reservation._id,nav:this.props.screenProps.nav, })
    else
    this.props.navigation.navigate('ModalDatePickerScreen',{ item: this.state.currentStation,modifying:this.state.modifying,reservation:this.props.screenProps.reservation,nav:this.props.screenProps.nav,  })
    // this.props.screenProps.nav.navigate('Home');
  }




  constructor (props) {
    super(props)
    this.map = React.createRef();
    this.state = {
      currentStation: {title:"Google Plex",etat:"Disponible"},
      modifying:false,
    }
  }

  selectFromMap = (station) => {
    if (station != null){
      this.setState({   currentStation : station },()=>{ console.log( this.state.currentStation)});
    }

  }
  componentDidMount() {
    console.log(this.props.screenProps.reservation.station);
    if (this.props.screenProps.reservation.station!=null){
      this.setState({currentStation:{
          latitude: parseFloat(this.props.screenProps.reservation.station.alt),
          longitude: parseFloat(this.props.screenProps.reservation.station.lng),
          title: this.props.screenProps.reservation.station.title,
          etat: this.props.screenProps.reservation.station.etat,
          country: "Tunisia",
          city: "Sfax",
          latitudeDelta: 2,
          longitudeDelta: 2,
        },
        modifying:true,
      })
      console.log("iyiiiiiiiih");
    }
    else {this.setState({currentStation: regions[7]});      console.log("hmmmmmmmmmmmm");
    }


  }

  render () {
    return (
      <View style={styles.mainContainer2}>
        <Image source={Images.background} style={styles.backgroundImage2} resizeMode='stretch' />
        <TouchableOpacity onPress={this.props.screenProps.toggle} style={{
          position: 'absolute',
          paddingTop: 30,
          paddingHorizontal: 10,
          zIndex: 10
        }}>
          <Image source={Images.closeButton} />
        </TouchableOpacity>
        <TouchableOpacity onPress={this.openUsage} style={{
          position: 'absolute',
          right:1,
          paddingTop: 30,
          paddingHorizontal: 35,
          zIndex: 15
        }}>
          <Image source={Images.chevronRight} />
        </TouchableOpacity>
        <ScrollView showsVerticalScrollIndicator={false} bounces={false} style={styles.container}>


          <Text style={styles.sectionText}>
          Current Station Name : {this.state.currentStation==null?this.props.screenProps.reservation.station.title:this.state.currentStation.title+"                                                                         "}
          Etat : {this.state.currentStation==null?this.props.screenProps.reservation.station.etat:this.state.currentStation.etat}

        </Text>

          <View style={styles.buttonsContainer2}>

            {

              <Map ref={this.map} selectFromMap={this.selectFromMap} stationSelected={this.state.currentStation
              }
                   markers={markers} />
            }

          </View>


        </ScrollView>
        <View style={styles.banner}>
          <Text style={styles.bannerLabel}>Made with ❤️ by ShareBike</Text>
        </View>
      </View>
    )
  }
}
const stackNavigator = createStackNavigator({
  ShareBikeReservationModal: {screen: ShareBikeReservationModal},
  ModalDatePickerScreen: {screen: ModalDatePickerScreen},
}, {
  cardStyle: {
    opacity: 1,
    backgroundColor: '#3e243f'
  },
  initialRouteName: 'ShareBikeReservationModal',
  headerMode: 'none',
  // Keeping this here for future when we can make
  navigationOptions: {
    header: {
      left: (
        <TouchableOpacity onPress={() => window.alert('pop')} ><Image source={Images.closeButton} style={{marginHorizontal: 10}} /></TouchableOpacity>
      ),
      style: {
        backgroundColor: '#3e243f'
      }
    }
  }
})



export default createAppContainer(stackNavigator);
