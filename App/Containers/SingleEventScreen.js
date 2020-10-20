import React, { Component } from 'react'
import {
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
  Dimensions,
  Image,
  StyleSheet, ImageBackground
} from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import SparkButton from 'react-native-sparkbutton';

// Styles
import { Block, theme } from 'galio-framework'
import {  argonTheme } from "../constants/";
import moment from 'moment'


const { width } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;
const cardWidth = width - theme.SIZES.BASE * 2;
import Icon from '../assets/imgs/love.png';

class SingleEventScreen extends Component {

  state = {
    checked: false
  }

  renderProduct = (item) => {
    const { navigation } = this.props;

    return (
      <TouchableWithoutFeedback
        style={{ zIndex: 3 }}
        key={`product-${item}`}
        onPress={() => navigation.navigate("Pro", { product: item })}
      >
        <Block center style={styles.productItem}>
          <Image
            resizeMode="cover"
            style={styles.productImage}
            source={{ uri: "http://192.168.1.12:4000/"+item.image }}
          />

        </Block>
      </TouchableWithoutFeedback>
    );
  };
  renderCards = () => {
    const singleItem = this.props.navigation.getParam('item', null);
    const day = moment(singleItem.dateStart).format('DD/MM/YYYY');
    const cardContainer = [styles.card, styles.shadow, {marginRight: theme.SIZES.BASE }];
    return (
      <Block row={false} card flex style={cardContainer}>




        <Block center flex card style={styles.group}>
          <Text h1 bold size="50" style={styles.title}>
            {singleItem.title}
          </Text>
          <Block flex>

            <Block flex style={{ marginTop: theme.SIZES.BASE / 2 }}>
              <ScrollView
                horizontal={true}
                pagingEnabled={true}
                decelerationRate={0}
                scrollEventThrottle={16}
                snapToAlignment="center"
                showsHorizontalScrollIndicator={false}
                snapToInterval={cardWidth + theme.SIZES.BASE * 0.375}
                contentContainerStyle={{
                  paddingHorizontal: theme.SIZES.BASE / 2
                }}
              >
                {
                  this.renderProduct(singleItem)
                }
              </ScrollView>
              <Block  style={{ paddingHorizontal: theme.SIZES.BASE }}>


                <View style={{flexDirection: 'row', flex: 1, justifyContent: 'space-between', marginVertical: 10}}>

                  <Text
                    size={50}
                    style={styles.productPrice}

                  >
                    type : {singleItem.type}
                  </Text>

                  <SparkButton
                    style={{ width: 40, height: 40, marginHorizontal: 20}}
                    activeImageSrc={Icon}
                    inactiveImageTint={'rgba(255,255,255,0.8)'}
                    primaryColor={"yellow"}
                    secondaryColor={"red"}
                    animationSpeed={1}
                    checked={this.state.checked}
                    onCheckedChange={(checked) => this.setState({ checked })} />

                </View>




                <Text
                  size={50}
                  style={styles.productPrice}

                >
                  {moment(singleItem.dateStart).format('DD/MM/YYYY')+" - "+moment(singleItem.dateEnd).format('DD/MM/YYYY') }
                </Text>

                <Text
                  center
                  size={16}
                  color={theme.COLORS.MUTED}
                  style={styles.productDescription}
                >
                  {singleItem.description}

                </Text>



              </Block>
            </Block>
          </Block>
        </Block>
      </Block>
    );
  }
  render() {
    return (
      <Block flex center>
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          {this.renderCards()}
        </ScrollView>
      </Block>
    );
  }
}
const styles = StyleSheet.create({
  title: {
    paddingBottom: theme.SIZES.BASE/2,
    paddingHorizontal: theme.SIZES.BASE * 2,
    marginTop: 22,
    color: argonTheme.COLORS.ACTIVE,
    fontSize: 40,
  },
  group: {
    paddingTop: 0
  },
  card: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 200,
    minWidth: 375,
    marginBottom: 16,
    marginHorizontal: 10
  },
  albumThumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: "center",
    width: thumbMeasure,
    height: thumbMeasure
  },
  category: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE / 2,
    borderWidth: 0
  },
  categoryTitle: {
    height: "100%",
    paddingHorizontal: theme.SIZES.BASE,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center"
  },
  imageBlock: {
    overflow: "hidden",
    borderRadius: 4
  },
  productItem: {
    width: cardWidth - theme.SIZES.BASE * 2,
    marginHorizontal: theme.SIZES.BASE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 7 },
    shadowRadius: 10,
    shadowOpacity: 0.2
  },
  productImage: {
    width: cardWidth - theme.SIZES.BASE,
    height: cardWidth - theme.SIZES.BASE*2,
    borderRadius: 3
  },
  productPrice: {
    paddingTop: theme.SIZES.BASE,
    color: argonTheme.COLORS.LABEL
  },
  productDescription: {
    paddingVertical: theme.SIZES.BASE,
    // paddingBottom: theme.SIZES.BASE * 2,
  }
});

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleEventScreen)
