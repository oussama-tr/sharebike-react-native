/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import PropTypes from 'prop-types';
import styles from './Styles/MapStyle'
import {
  View,
  ScrollView,
  Text,
  KeyboardAvoidingView,
  Dimensions,
  Image,
  Picker,
  ActivityIndicator
} from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import { Marker,Callout } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {checkPermission} from 'react-native-android-permissions';
import regions from '../constants/regions'
import { Block } from 'galio-framework'
import MapViewDirections from 'react-native-maps-directions';
import articles from '../constants/articles'
import { Card } from './index'
import CustomCallout from '../Components/CustomCallout';
import { Config } from '../Config/api'
import axios from 'axios'
const {width, height} = Dimensions.get('window')

const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO
const API_URL = Config.API_URL;
export default class Map extends Component {
  // // Prop type warnings

  constructor() {
    super()
    this.state = {
      initialPosition: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 1,
        longitudeDelta: 1,
        country: "Tunisia",
        city: "Hammam Sousse",
      },
      currentState: "Tunis",
      loading: false,
      data: [],
      error: null,
      user:null,
    }
  }
  componentDidMount() {
    this.makeRemoteRequest();
    if (this.props.geolocation){
      checkPermission("android.permission.ACCESS_FINE_LOCATION").then((result) => {
        console.log("Already Granted!");
        console.log(result);
      }, (result) => {
        console.log("Not Granted!");
        console.log(result);
      });
      Geolocation.getCurrentPosition((position) => {
          var lat = parseFloat(position.coords.latitude)
          var long = parseFloat(position.coords.longitude)

          var initialRegion = {
            latitude: lat,
            longitude: long,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }
          console.log(position)
          this.setState({initialPosition: initialRegion})
        },
        (error) => {alert(JSON.stringify(error) )},
        {enableHighAccuracy: false, timeout: 20000});
    }
    if (this.props.stationSelected){
      var initialRegion = {
        latitude: this.props.stationSelected.latitude,
        longitude: this.props.stationSelected.longitude,
        latitudeDelta: this.props.stationSelected.latitudeDelta,
        longitudeDelta: this.props.stationSelected.longitudeDelta,
      }
      this.setState({initialPosition: initialRegion})
    }
  }
  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.stationSelected !== prevProps.stationSelected) {
      var initialRegion = {
        latitude: this.props.stationSelected.latitude,
        longitude: this.props.stationSelected.longitude,
        latitudeDelta: this.props.stationSelected.latitudeDelta,
        longitudeDelta: this.props.stationSelected.longitudeDelta,
      }
      this.setState({initialPosition: initialRegion})
    }
  }

  handleRegionChange(item){
    this.setState({currentState: item})
    this.setState({initialPosition: item})
    this.mapp.animateToRegion(item,1000);

  }
  makeRemoteRequest = () => {
    const url = API_URL+"/stations";
    this.setState({ loading: true });

    axios.get(url)
      .then(res => {
        this.setState({
          data: res.data,  //res.results
          error: res.error || null,
          loading: false,
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({ error, loading: false });
      });
  };

  renderMarkers =()=> {
    console.log("rendering");
    if (this.props.markers){
      return(
        this.state.data.map((item, imgIndex) => (
          <Marker
            draggable
            coordinate={{
              latitude: parseFloat(item.alt),
              longitude: parseFloat(item.lng),
            }}
            onPress={(e) => {e.stopPropagation(); this.props.selectFromMap(item)}}
            onDragEnd={(e) => {alert(JSON.stringify(e.nativeEvent.coordinate));}}
            title={item.title}
            description={item.etat + " : " +item.numberOfBikesAvailable+"/"+item.numberOfBikesCapacity}
          >

            <Image source={require('../assets/imgs/logo2.png')} style={{height: 50, width:50 }} />
          </Marker>
        ))
      );
    }


  }
  render () {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator />
        </View>
      );
    }
    var mapStyle=[{"elementType": "geometry", "stylers": [{"color": "#242f3e"}]},{"elementType": "labels.text.fill","stylers": [{"color": "#746855"}]},{"elementType": "labels.text.stroke","stylers": [{"color": "#242f3e"}]},{"featureType": "administrative.locality","elementType": "labels.text.fill","stylers": [{"color": "#d59563"}]},{"featureType": "poi","elementType": "labels.text.fill","stylers": [{"color": "#d59563"}]},{"featureType": "poi.park","elementType": "geometry","stylers": [{"color": "#263c3f"}]},{"featureType": "poi.park","elementType": "labels.text.fill","stylers": [{"color": "#6b9a76"}]},{"featureType": "road","elementType": "geometry","stylers": [{"color": "#38414e"}]},{"featureType": "road","elementType": "geometry.stroke","stylers": [{"color": "#212a37"}]},{"featureType": "road","elementType": "labels.text.fill","stylers": [{"color": "#9ca5b3"}]},{"featureType": "road.highway","elementType": "geometry","stylers": [{"color": "#746855"}]},{"featureType": "road.highway","elementType": "geometry.stroke","stylers": [{"color": "#1f2835"}]},{"featureType": "road.highway","elementType": "labels.text.fill","stylers": [{"color": "#f3d19c"}]},{"featureType": "transit","elementType": "geometry","stylers": [{"color": "#2f3948"}]},{"featureType": "transit.station","elementType": "labels.text.fill","stylers": [{"color": "#d59563"}]},{"featureType": "water","elementType": "geometry","stylers": [{"color": "#17263c"}]},{"featureType": "water","elementType": "labels.text.fill","stylers": [{"color": "#515c6d"}]},{"featureType": "water","elementType": "labels.text.stroke","stylers": [{"color": "#17263c"}]}];
    return (

      <View style={styles.container}>
        <MapView
          ref={(mapp) => { this.mapp = mapp; }}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={this.state.initialPosition}
        >

          {this.renderMarkers()}

        </MapView>
        <Picker
          selectedValue={this.state.currentState}
          style={{height: 50, width: 500,backgroundColor: '#ffffff',alignItems: 'center'}}
          onValueChange={(itemValue, itemIndex) =>
            this.handleRegionChange(itemValue)
          }>
          {regions.map((item) => {
            return (
              <Picker.Item label={item.city} value={item} />
            );
          })}
        </Picker>
      </View>);
  }
}
