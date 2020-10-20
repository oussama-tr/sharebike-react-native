import React from 'react';
import { StyleSheet, Dimensions, ScrollView, Button, View, ActivityIndicator } from 'react-native'
import { Block, theme } from 'galio-framework';
import { Card } from '../Components';
import articles from '../constants/articles';
import stations from '../constants/Stations'
import axios from 'axios';
import { Config } from '../Config/api'
const { width } = Dimensions.get('screen');
const serverIp="192.168.1.12";
const API_URL = Config.API_URL;

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.map = React.createRef();
    this.state = {
      loading: false,
      data: [],
      error: null,

    };
    this.arrayholder = [];
  }

  componentDidMount() {
    this.makeRemoteRequest();

  }
  makeRemoteRequest = () => {
    const url = API_URL+"/events";
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


  renderArticles = () => {

    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}>
        <Block flex>
          {this.state.data.map((item) => {
            return (
              <Card event item={item} full />
            );
          })}
        </Block>
      </ScrollView>
    )
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <Block flex center style={styles.home}>
        {this.renderArticles()}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    width: width,
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
});

export default Home;
