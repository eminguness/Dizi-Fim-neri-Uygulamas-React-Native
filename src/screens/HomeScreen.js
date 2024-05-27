import React, { Component } from 'react';
import { StyleSheet, Text, View,Button,ActivityIndicator } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AnaSayfa from '../../pages/AnaSayfa';
import FilmSayfasi from '../../pages/FilmSayfasi';
import DiziSayfasi from '../../pages/DiziSayfasi';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FavoriteSayfasi from '../../pages/FavoriteSayfasi';
import AyarlarSayfasi from '../../pages/AyarlarSayfasi';
import { SafeAreaView } from 'react-native-safe-area-context';




const Tab = createBottomTabNavigator();

class HomeScreen extends Component{

  state={
    isLoading:true,
    genres:[]
  }
  componentDidMount(){
    return fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=802b2c4b88ea1183e50e6b285a27696e')
    .then((response)=> response.json())
    .then((responseJson)=>{
      this.setState({
        isLoading:false,
        genres: responseJson.genres,
      });
    })
    .catch((error)=>console.error(error));
  }
  render(){
    if(this.state.isLoading){
      <SafeAreaView style={{flex:1,justifyContent:"center",alignItems:"center"}}>
        <ActivityIndicator/>
      </SafeAreaView>
    }
    return (
      <Tab.Navigator  screenOptions={{
        tabBarActiveTintColor: '#e91e63',headerShown: false
      }} initialRouteName='AnaSayfa'>
        <Tab.Screen  options={{
            tabBarLabel: 'Ana Sayfa',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }} name="AnaSayfa" component={AnaSayfa} /> 
        
  
        <Tab.Screen  options={{
            tabBarLabel: 'Favorite',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="heart" color={color} size={size} />
            ),
          }} name="Favori" component={FavoriteSayfasi} /> 
        <Tab.Screen  options={{
            tabBarLabel: 'Settings',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="cog" color={color} size={size} />
            ),
          }} name="Ayarlar" component={AyarlarSayfasi} /> 
        
        
      </Tab.Navigator>
    );
  }
}
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});