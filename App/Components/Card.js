import React from 'react';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import { StyleSheet, Dimensions, Image, TouchableWithoutFeedback, Modal } from 'react-native'
import { Block, Text, theme } from 'galio-framework';

import { argonTheme } from '../constants';
import ShareBikeReservationModal from '../Containers/ShareBikeReservationModal'
import moment from 'moment'
const Edit = require("../assets/imgs/editv1.png");
const getBike = require("../assets/imgs/getbike.png");
class Card extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showModal: false
    }
  }
  render() {
    const { navigation, item, horizontal, full, style, ctaColor, imageStyle } = this.props;

    const imageStyles = [
      full ? styles.fullImage : styles.horizontalImage,
      imageStyle
    ];
    const cardContainer = [styles.card, styles.shadow, style];
    const imgContainer = [styles.imageContainer,
      horizontal ? styles.horizontalStyles : styles.verticalStyles,
      styles.shadow
    ];
    let icon = item.route==="BikeReservationScreen" ? getBike : Edit;


    if (this.props.event)
    return (
      <Block row={horizontal} card flex style={cardContainer}>
        <TouchableWithoutFeedback onPress={() => navigation.navigate("SingleEventScreen",{ item: item })}>
          <Block flex style={imgContainer}>
            <Image source={{uri: "http://192.168.1.12:4000/"+item.image}} style={imageStyles} />
          </Block>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => navigation.navigate("SingleEventScreen",{ item: item })}>
          <Block flex space="between" style={styles.cardDescription}>

            <Text size={14} muted={!ctaColor} color={ctaColor || argonTheme.COLORS.ACTIVE} style={styles.cardTitle}>{item.title}</Text>
            <Text size={12}  bold>{item.description.substring(0,190) +"..."}</Text>
          </Block>
        </TouchableWithoutFeedback>
      </Block>
    );
    else
      return (

        <Block row={horizontal} card flex style={cardContainer}>

          <TouchableWithoutFeedback onPress={() =>{
            if (item.route==="BikeReservationScreen")
              navigation.navigate(item.route,{ reservation: item })
          else{
              this.props.screenProps.toggle(item)
            }
          }
          }>
            <Block flex style={imgContainer}>
              <Image source={{uri: "http://192.168.1.12:4000/"+item.station.image}} style={imageStyles} />
            </Block>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() =>{
            if (item.route==="BikeReservationScreen")
              navigation.navigate(item.route,{ reservation: item })
            else{
              this.props.screenProps.toggle(item)
            }
          }
          }>
            <Block flex space="between" style={styles.cardDescription}>

              <Text size={25} muted={!ctaColor} color={ctaColor || argonTheme.COLORS.ACTIVE} style={styles.cardTitle}>{item.station.title}</Text>
              <Text size={18}  bold>{item.station.etat}</Text>
              <Text size={16} color={"#FE2472"}   bold>{moment(item.dateReservation).format('DD/MM/YYYY')}</Text>

              <Image source={icon} style={{width:40,height:40,marginLeft:120}} />
            </Block>
          </TouchableWithoutFeedback>
        </Block>

      );
  }
}

Card.propTypes = {
  item: PropTypes.object,
  horizontal: PropTypes.bool,
  full: PropTypes.bool,
  ctaColor: PropTypes.string,
  imageStyle: PropTypes.any,
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
    marginBottom: 10
  },
  cardTitle: {
    flex: 1,
    flexWrap: 'wrap',
    paddingBottom: 6
  },
  cardDescription: {
    padding: theme.SIZES.BASE / 2
  },
  imageContainer: {
    borderRadius: 3,
    elevation: 1,
    overflow: 'hidden',
  },
  image: {
    // borderRadius: 3,
  },
  horizontalImage: {
    height: 122,
    width: 'auto',
  },
  horizontalStyles: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  verticalStyles: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0
  },
  fullImage: {
    height: 215
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
});

export default withNavigation(Card);
