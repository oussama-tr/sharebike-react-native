// @flow
import React, { Component } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native'

import MapboxGL from '@react-native-mapbox-gl/maps';
import MapboxClient from 'mapbox';

import { multiLineString, lineString } from '@turf/helpers';
import distance from '@turf/distance';
const turfPoint = require('turf-point');

import Destination from "./Destination";
import Departure from "./Departure";
import Route from "./Route";
import {checkPermission} from 'react-native-android-permissions';
import Geolocation from '@react-native-community/geolocation';

type NavigationMode = 'Course' | 'Global';
const {width, height} = Dimensions.get('window')

const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO
type Location = {
	latitude: number,
  longitude: number,
};

type MapViewProps = {
	mapBoxApiKey: string,
  navigationMode: NavigationMode,
  startingPoint: Location,
  endingPoint: Location,
  color: string
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default class MapView extends Component<MapViewProps> {

  constructor(props) {
    super(props);

    this.state = {
      startingPoint: props.startingPoint,
      endingPoint: props.endingPoint,
    }
    this.onUserLocationUpdate = this.onUserLocationUpdate.bind(this);

  }

  componentDidMount() {
    MapboxGL.setAccessToken(this.props.mapBoxApiKey);
    this.mapboxClient = new MapboxClient(this.props.mapBoxApiKey);
    this.downloadRoute();
  }

  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps.startingPoint) !== JSON.stringify(this.state.startingPoint) ||
        JSON.stringify(nextProps.endingPoint) !== JSON.stringify(this.state.endingPoint)) {
      this.downloadRoute();
    }
  }
  changePoints = (latitude,longitude)=>{
    this.setState({
      endingPoint: {
        latitude: latitude,
        longitude:  longitude,
      }
    })
    let pomise= this.downloadRoute();
    setTimeout(this.downloadRoute, 1000);
    console.log(pomise)
  }

  renderDestination(): React$Element<*> {
    const { endingPoint } = this.state;

    return(
      <Destination
        lat={parseFloat(company.geoloc.lat)}
        lng={parseFloat(company.geoloc.lng)}
      />
    );
  }

  downloadRoute = async () => {
    const { startingPoint, endingPoint } = this.state;

    try {
      const res = await this.mapboxClient.getDirections(
        [
          {
            latitude: startingPoint.latitude,
            longitude: startingPoint.longitude,
          },
          {
            latitude: endingPoint.latitude,
            longitude: endingPoint.longitude,
          },
        ],
        { profile: "driving", geometry: "polyline6", steps: true },
      );
      const routeData = res.entity.routes[0];

      const steps = routeData.legs[0].steps.map( step => step.geometry.coordinates);

      this.setState({
        globalRoute: lineString(routeData.geometry.coordinates),
        detailedRoute: multiLineString(steps),
        duration: routeData.duration,
        distance: routeData.distance,
        loadingOver: true,
      });
      //this.props.onDirectionChange({duration: routeData.duration, distance: routeData.distance});
      return Promise.resolve(true);

    } catch (err) {
      console.warn({err});
    }
  };

  setMapRef = (ref) => { this.mapRef = ref; };
  setRouteRef = (ref) => { this.routeRef = ref; };

  moveCamera = () => {
    const { navigationMode } = this.props;
    const { currentLocation, startingPoint, endingPoint } = this.state;

    if (navigationMode === 'Course' && currentLocation) {
      this.mapRef.setCamera({
        stops: [
          { centerCoordinate: [currentLocation.longitude, currentLocation.latitude], duration: 100 },
          { zoom: 8, duration: 100 },
          { pitch: 45, duration: 100 },
          { heading: currentLocation.heading, duration: 100 },
        ],
      });
    }
    else if (navigationMode === 'Global') {
      this.mapRef.fitBounds(
        [Math.max(startingPoint.longitude, endingPoint.longitude), Math.max(startingPoint.latitude, endingPoint.latitude)],
        [Math.min(startingPoint.longitude, endingPoint.longitude), Math.min(startingPoint.latitude, endingPoint.latitude)],
        80,
        300,
      );
    }
  };

  onUserLocationUpdate = (location) => {
    //this.moveCamera(location.coords); NOTE TO SELF aaaaaaa  remove comment for tracking
    this.setState({currentLocation: location.coords});
    //console.log(this.state.currentLocation);
  };

  render(): React$Element<*> {
    const { navigationMode, color } = this.props;
    const { detailedRoute, globalRoute, loadingOver,endingPoint } = this.state;

    const mode = navigationMode === 'Course' ?
      MapboxGL.UserTrackingModes.FollowWithCourse :
      MapboxGL.UserTrackingModes.Follow;

    const route = navigationMode === 'Course' ?
      detailedRoute :
      globalRoute;

    return (
      <View style={styles.container}>
        <MapboxGL.MapView
          styleURL={MapboxGL.StyleURL.Street}
          ref={this.setMapRef}
          userTrackingMode={mode}
          style={styles.container}
          localizeLabels
          attributionEnabled={false}
          logoEnabled={false}
        >
          <MapboxGL.UserLocation
            visible={true}
            onUpdate={this.onUserLocationUpdate}
          />
          <MapboxGL.Camera
            zoomLevel={16}
            followUserMode={'normal'}
            followUserLocation
          />
          {
            loadingOver &&
            <Route ref={this.setRouteRef} route={route} lineColor={color} />
          }
          <Departure coords={this.state.startingPoint}/>
          <Destination coords={this.state.endingPoint}/>
        </MapboxGL.MapView>
      </View>
    );
  }
}

