import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, Modal, View, Dimensions,FlatList, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { ListItem, SearchBar } from 'react-native-elements';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/FindMyWayScreenStyle'
import { Block, theme } from 'galio-framework'
import RoundedButton from '../Components/RoundedButton'
import ShareBikeReservationModal from './ShareBikeReservationModal'
import ShareBikeMapBox from '../Components/ShareBikeMapBox'
import stations from '../constants/Stations'
import { checkPermission } from 'react-native-android-permissions'
import Geolocation from '@react-native-community/geolocation'
import axios from 'axios'
import { Config } from '../Config/api';
const { width } = Dimensions.get("screen");
const API_URL = Config.API_URL;
const thumbMeasure = (width - 48 - 32) / 3;
const cardWidth = width - theme.SIZES.BASE * 2;
class FindMyWayScreen extends Component {
  constructor(props) {
    super(props);
    this.map = React.createRef();
    this.state = {
      loading: false,
      data: [],
      error: null,

      endingPoint: {
        latitude: 37.491998,
        longitude:  -122.044000,
      }
    };
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
      },
      (error) => {alert(JSON.stringify(error) )},
      {enableHighAccuracy: false, timeout: 20000});
    this.arrayholder = [];
  }

  componentDidMount() {
    this.makeRemoteRequest();

  }
  makeRemoteRequest = () => {
    const url = API_URL + `/stations`;
    this.setState({ loading: true });

    axios.get(url)
      .then(res => {
        this.setState({
          data: res.data,  //res.results
          error: res.error || null,
          loading: false,
        });
        console.log(this.state.data);
        this.arrayholder = res.data;  //res.results
      })
      .catch(error => {
        console.log(error);
        this.setState({ error, loading: false });
      });
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%',
        }}
      />
    );
  };

  searchFilterFunction = text => {
    this.setState({
      value: text,
    });
    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.title.toUpperCase()} ${item.etat.toUpperCase()} `;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData,
    });
  };
  renderHeader = () => {
    return (
      <SearchBar
        placeholder="Type Here..."
        lightTheme
        round
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
        value={this.state.value}
      />
    );
  };


  render () {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator />
        </View>
      );
    }
    const horizontal = true;
    const navigation = this.props.navigation;
    const cardContainer = [styles.card, styles.shadow, {marginRight: theme.SIZES.BASE },{alignItems: "center" }];
    const imgContainer = [styles.imageContainer,
      horizontal ? styles.horizontalStyles : styles.verticalStyles,
      styles.shadow
    ];
    return (
      <ScrollView style={ {paddingRight: theme.SIZES.BASE/2, }}>


        <Block row={false} card flex style={cardContainer}>

          <Block flex style={imgContainer}>

            <View style={{height:300,width:400}}>

              { <ShareBikeMapBox ref={this.map}  startingPoint={this.state.startingPoint}
                               endingPoint={this.state.endingPoint}/>}
            </View>
            <View style={{ flex: 2, marginTop:0, }}>
              <FlatList
                data={this.state.data}
                renderItem={({ item }) => (
                  <ListItem
                    button onPress={() => { this.map.current.changePoint(item.alt,item.lng) } }
                    leftAvatar={{ source: { uri: "http://192.168.1.12:4000/"+item.image } }}
                    title={` ${item.title}`}
                    subtitle={item.etat}
                  />
                )}
                keyExtractor={item => item.title}
                ItemSeparatorComponent={this.renderSeparator}
                ListHeaderComponent={this.renderHeader}
              />
            </View>
          </Block>





        </Block>
      </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(FindMyWayScreen)
