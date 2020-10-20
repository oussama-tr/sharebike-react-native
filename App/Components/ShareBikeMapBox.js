import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text } from 'react-native'
import styles from './Styles/ShareBikeMapBoxStyle'
import MapboxGL from "@react-native-mapbox-gl/maps";
import  MapView  from './MapBox/MapView';
MapboxGL.setAccessToken("pk.eyJ1IjoiZ29nZXRzdSIsImEiOiJjazgwNTB5c2YwMXF2M2tvZG50enZua3BoIn0.wyu1plc3NpFxjdpknePvMA");
const api_key="pk.eyJ1IjoiZ29nZXRzdSIsImEiOiJjazgwNTB5c2YwMXF2M2tvZG50enZua3BoIn0.wyu1plc3NpFxjdpknePvMA"
export default class ShareBikeMapBox extends Component {

  constructor(props) {
    super(props);

    this.state = {
      startingPoint: this.props.startingPoint,
      endingPoint: this.props.endingPoint,
    };
    this.arrayholder = [];
  }
  changePoint = (latitude,longitude)=>{
    console.log(latitude+0);
    console.log(longitude+0);
    var latitudeF = parseFloat(latitude)
    var longitudeF = parseFloat(longitude)
    this.mapRef.changePoints(latitudeF,longitudeF);
  };
  moveCamera = () => {
    this.mapRef.moveCamera();
  }

  componentDidMount() {
    this.moveCamera();
  }

  render () {
    return (
      <View style={styles.page}>
        <View style={styles.container}>
          <MapView
            mapBoxApiKey={api_key}
            navigationMode="Course" // Or "Global"
            ref={instance => this.mapRef = instance}
            startingPoint={this.state.startingPoint}
            endingPoint={this.state.endingPoint}
            color="green"
          />
        </View>
      </View>
    )
  }
}
