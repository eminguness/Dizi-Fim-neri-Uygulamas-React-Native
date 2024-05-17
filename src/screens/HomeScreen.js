import React from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AnaSayfa from '../../pages/AnaSayfa';
import FilmSayfasi from '../../pages/FilmSayfasi';
import DiziSayfasi from '../../pages/DiziSayfasi';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FavoriteSayfasi from '../../pages/FavoriteSayfasi';
import AyarlarSayfasi from '../../pages/AyarlarSayfasi';



const Tab = createBottomTabNavigator();


const HomeScreen = ({navigation}) => {
  return (
    <Tab.Navigator  screenOptions={{
      tabBarActiveTintColor: '#e91e63',
    }} initialRouteName='AnaSayfa'>
      <Tab.Screen  options={{
          tabBarLabel: 'Ana Sayfa',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }} name="AnaSayfa" component={AnaSayfa} /> 
      <Tab.Screen  options={{
          tabBarLabel: 'Diziler',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="movie" color={color} size={size} />
          ),
        }} name="Dizi" component={DiziSayfasi} />
      <Tab.Screen  options={{
          tabBarLabel: 'Filmler',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="movie-roll" color={color} size={size} />
          ),
        }} name="Filim" component={FilmSayfasi} />

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
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});