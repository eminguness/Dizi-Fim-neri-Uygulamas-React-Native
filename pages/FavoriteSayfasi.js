import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Constants from "expo-constants";


const FavoriteSayfasi = () => {
  return (
    <View >
      <Text style={styles.container}>meg</Text>
    </View>
  )
}

export default FavoriteSayfasi;

const styles = StyleSheet.create({
  container:{
    marginTop:Constants.statusBarHeight,

  }
})