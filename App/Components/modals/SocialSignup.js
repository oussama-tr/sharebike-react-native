import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image  } from 'react-native';
import Modal from 'react-native-modal/dist/index';
import Google from '../../assets/imgs/googlex48.png';
import Facebook from '../../assets/imgs/facebookx48.png';

const modalWidth = Math.round(Dimensions.get('window').width) - 80;
const modalHeight = Math.round(Dimensions.get('window').height) / 3.2;


export default function SocialSignup({isVisible, toggleModal, socialAccount, proceed}) {

	function onProceed() {
		toggleModal();
		proceed();
	}

	return (
    <View style= {[styles.container]}>
      <Modal
      isVisible={isVisible}
      backdropColor="#999999"
      backdropOpacity={0.6}
      animationIn="zoomInDown"
      animationOut="zoomOutUp"
      animationInTiming={300}
      animationOutTiming={300}
      backdropTransitionInTiming={300}
      backdropTransitionOutTiming={300}
      style = {{marginHorizontal: 40}}>

        {/* modal content*/}
        <View   style = {{width: modalWidth, height: modalHeight , backgroundColor: '#fff'}}>

          {/* Icon + text*/}
          <View style = {{ flex: 1, alignItems: 'center', marginVertical: 10,  padding: 30 ,}}>
            <Image source =  {socialAccount === 'google' ? Google: Facebook} />
            <Text style = {{  marginVertical:20, fontSize: 14, justifyContent: 'center',alignItems: 'center', textAlign: 'center',}}>
              <Text>Sorry ! We could not find a Bikeaholic account linked to your {socialAccount} account.</Text>
              <Text> Proceed with creating one ?</Text>
            </Text>
          </View>

          {/* separator*/}

            <View style={{ borderWidth: StyleSheet.hairlineWidth, width: modalWidth,borderColor:'#595959',}}/>

          {/* Buttons*/}
          <View style = {{flexDirection: 'row', paddingHorizontal: 30, height: modalHeight / 7,justifyContent: "space-around",
          }}>
          <TouchableOpacity style = {{justifyContent: 'center',alignItems: 'center'}} onPress = {onProceed}>
            <Text style = {{ fontSize: 14}}>Proceed</Text>
          </TouchableOpacity>
          <View style={{ borderWidth: StyleSheet.hairlineWidth, borderColor:'#595959'}}/>

          <TouchableOpacity
 					style = {{justifyContent: 'center',alignItems: 'center'}}
          onPress = {toggleModal}  >
            <Text style = {{ fontSize: 14, alignItems: 'center'}}>Dismiss</Text>
          </TouchableOpacity>
          </View>

          <View style={{ borderWidth: StyleSheet.hairlineWidth, width: modalWidth,borderColor:'#595959',}}/>


        </View>
      </Modal>
    </View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
    color: '#fff',

	},
});

/*
<View style = {{flexDirection: 'row', alignSelf: 'flex-end'}}>
  <TouchableOpacity onPress={toggleModal} style = {{alignSelf: 'flex-start'}}>
    <View>
      <Text style={[{color: '#000', fontWeight: "600", fontSize: 16, flex:.5}]}>Proceed</Text>
    </View>
  </TouchableOpacity>
  <TouchableOpacity onPress={toggleModal} style = {{alignSelf: 'flex-end', flex:.5}}>
    <View>
      <Text style={[{color: '#000', fontWeight: "600", fontSize: 16}]}>Dismiss</Text>
    </View>
  </TouchableOpacity>
</View> */
