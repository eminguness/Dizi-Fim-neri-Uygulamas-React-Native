import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Constants from "expo-constants";
const AyarlarSayfasi = () => {
  return (
    <View>
      <Text style={styles.container}>Settings</Text>
    </View>
  )
}

export default AyarlarSayfasi;

const styles = StyleSheet.create({
  container:{
    marginTop:Constants.statusBarHeight,

  }

})