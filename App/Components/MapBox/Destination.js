// @flow
import React from 'react';
import { Image, StyleSheet, View } from 'react-native'
import MapboxGL from '@react-native-mapbox-gl/maps';
import Images from '../../constants/Images'
const ANNOTATION_SIZE = 45;
const styles = {
  annotationContainer: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
  },
  annotationFill: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'orange',
    transform: [{ scale: 0.6 }],
  },
};

const Destination = ({coords}) => (
  <MapboxGL.PointAnnotation
    key="pointAnnotation"
    id="pointAnnotation"
    ref={ref => (this.annotationRef = ref)}
    coordinate={[coords.longitude, coords.latitude]}
  >
    <View style={styles.annotationContainer}>
      <Image
        source={Images.Logo}
        style={{width: ANNOTATION_SIZE, height: ANNOTATION_SIZE,borderRadius: 15, transform: [{ scale: 0.6 }],}}
        onLoad={() => this.annotationRef.refresh()}
      />
    </View>
    <MapboxGL.Callout title="Ending Point" />
  </MapboxGL.PointAnnotation>
);

export default Destination;
