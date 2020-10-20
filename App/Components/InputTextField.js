import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
//this.field.state.value
export default function InputTextField({title, style, placeholderText, placeholderTextColor, isSecure, isVisible, _toggleVisibility, _onTextChange}) {
  return(
    <View style={[styles.container, style]}>
      <TextInput
        onChangeText={text => _onTextChange(text)}
        placeholder={placeholderText}
        placeholderTextColor={ placeholderTextColor}
        secureTextEntry={isSecure && !isVisible}
        style={styles.input}>
      </TextInput>

      {isSecure || isVisible?
        <TouchableOpacity
        onPress = {_toggleVisibility}
        style = {{marginRight: 15,
          paddingTop: 10,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'flex-start'}}>
          {isVisible?
          <Icon name="eye-with-line" size={26} color="#595959" family={"MaterialIcons"} /> :
          <Icon name="eye" size={26} color="#595959" family={"MaterialIcons"} />}
        </TouchableOpacity>
        : null
      }

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#595959",
    flexDirection: 'row'
  },
  input: {
    paddingVertical: 10,
    maxWidth: 300,
    minWidth: 300,
    paddingHorizontal: 20,
    color: "#595959",
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'neo_sans',
  },
});
