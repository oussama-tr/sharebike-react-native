import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, Modal, Dimensions, View, Image, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import Gallery from 'react-native-image-gallery';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/BikeReservationScreenStyle'
import { Block, theme } from 'galio-framework'
import RoundedButton from '../Components/RoundedButton'
import ShareBikeMapBox from '../Components/ShareBikeMapBox'
import ShareBikeReservationModal from './ShareBikeReservationModal'
import { checkPermission } from 'react-native-android-permissions'
import Geolocation from '@react-native-community/geolocation'
import stations from '../constants/Stations'
const thumbMeasure = (width - 48 - 32) / 3;
const cardWidth = width - theme.SIZES.BASE * 2;
const { width } = Dimensions.get("screen");
class BikeReservationScreen extends Component {

  constructor (props) {
    super(props);
    this.reservation = this.props.navigation.getParam('reservation', null);
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
        }
        console.log(position)
        this.setState({startingPoint:initialRegion})
        this.setState({loading:false})
      },
      (error) => {alert(JSON.stringify(error) )},
      {enableHighAccuracy: false, timeout: 20000});

    const images = this.reservation.station.bikes.map((bike) => {
      return bike
    }
  );
    console.log(images);
    this.state = {
      index: 0,
      loading:true,
      endingPoint: {
        latitude: 37.491998,
        longitude:  -122.044000,
      },
     images: images,

    };


    this.onChangeImage = this.onChangeImage.bind(this);

    // this.addImages();
    // this.removeImages();
    // this.removeImage(2, 3000);
  }
  componentDidMount() {
  }


  get caption () {
    const { images, index } = this.state;
    return (
      <View style={{ bottom: 0, height: 65, backgroundColor: 'rgba(0, 0, 0, 0.7)', width: '100%', position: 'absolute', justifyContent: 'center' }}>
        <Text style={{ textAlign: 'center', color: 'white', fontSize: 15, fontStyle: 'italic' }}>{ (images[index] && images[index].caption) || '' } </Text>
      </View>
    );
  }
  get galleryCount () {
    const { index, images } = this.state;
    return (
      <View style={{ top: 0, height: 65, backgroundColor: 'rgba(0, 0, 0, 0.7)', width: '100%', position: 'absolute', justifyContent: 'center' }}>
        <Text style={{ textAlign: 'right', color: 'white', fontSize: 15, fontStyle: 'italic', paddingRight: '10%' }}>{ index + 1 } / { images.length }</Text>
      </View>
    );
  }
  addImages () {
    // Debugging helper : keep adding images at the end of the gallery.
    setInterval(() => {
      const newArray = [...this.state.images, { source: { uri: 'http://i.imgur.com/DYjAHAf.jpg' } }];
      this.setState({ images: newArray });
    }, 5000);
  }

  removeImage (slideIndex, delay) {
    // Debugging helper : remove a given image after some delay.
    // Ensure the gallery doesn't crash and the scroll is updated accordingly.
    setTimeout(() => {
      const newArray = this.state.images.filter((element, index) => index !== slideIndex);
      this.setState({ images: newArray });
    }, delay);
  }

  removeImages () {
    // Debugging helper : keep removing the last slide of the gallery.
    setInterval(() => {
      const { images } = this.state;
      console.log(images.length);
      if (images.length <= 1) {
        return;
      }
      const newArray = this.state.images.filter((element, index) => index !== this.state.images.length - 1);
      this.setState({ images: newArray });
    }, 2000);
  }

  onChangeImage (index) {

    this.setState({ index });
  }

  unlockBike = ()=>{
   // console.log(this.testVarible)
    console.log(this.reservation.station.bikes[this.state.index]);
  }

  renderError () {
    return (
      <View style={{ flex: 1, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: 'white', fontSize: 15, fontStyle: 'italic' }}>This image cannot be displayed...</Text>
        <Text style={{ color: 'white', fontSize: 15, fontStyle: 'italic' }}>... but this is fine :)</Text>
      </View>
    );
  }


  render () {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator />
        </View>
      );
    }
    const reservation = this.props.navigation.getParam('reservation', null);
    const horizontal = true;
    const navigation = this.props.navigation;
    const cardContainer = [styles.card, styles.shadow, {paddingRight: theme.SIZES.BASE, }];
    const imgContainer = [styles.imageContainer,
      horizontal ? styles.horizontalStyles : styles.verticalStyles,
      styles.shadow
    ];

    return (
      <ScrollView style={ {paddingRight: theme.SIZES.BASE/2, }} >




        <Block row={false} card flex style={cardContainer}>
          <Block flex style={imgContainer}>
            <Gallery
              style={{flex: 1, backgroundColor: '#696969',height:400}}
              images={this.state.images}
              errorComponent={this.renderError}
              onPageSelected={this.onChangeImage}
              initialPage={0}
            />
            { this.galleryCount }
            { this.caption }


          </Block>
          <Text style={{fontSize:30,color:"#999999",marginLeft:20}}>{reservation.station.title}</Text>

          <Block flex style={{alignItems: "center"}}>
            <Image source={{uri : reservation.station.images[0]}} style={{height:100,width:300,marginTop:10}} />
          </Block>
          <Text style={{fontSize:20,marginLeft: 20}}>{reservation.station.cta}</Text>
          <Text style={{fontSize:20,marginLeft: 20}}>{reservation.station.country}</Text>


          <Block style={{flexDirection:'row-reverse'}}>
          <Text style={{color:"grey"}} >{reservation.date}</Text>
          </Block>




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

export default connect(mapStateToProps, mapDispatchToProps)(BikeReservationScreen)
