import { StatusBar } from 'expo-status-bar';
import { Settings, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ThemeContextProvider from './contexts/ThemeContext';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from'./src/screens/LoginScreen';
import AnaSayfa from './pages/AnaSayfa';
import DiziSayfasi from './pages/DiziSayfasi';
import FilmSayfasi from './pages/FilmSayfasi';
import FavoriteSayfasi from './pages/FavoriteSayfasi';
import AyarlarSayfasi from './pages/AyarlarSayfasi';
import Movie from './models/Movie';
import { useFonts } from 'expo-font';
const Stack = createNativeStackNavigator();

export default function App() {

  let [fontsLoaded]=useFonts({
    Poppins: require("../rafproje/assets/fonts/Poppins-Regular.ttf"),
    PoppinsLight: require("../rafproje/assets/fonts/Poppins-Light.ttf"),
    PoppinsSBold: require("../rafproje/assets/fonts/Poppins-SemiBold.ttf"),
    PoppinsBold: require("../rafproje/assets/fonts/Poppins-Bold.ttf"),

  })


  if(!fontsLoaded){
    <View></View>
  }
  return (
    <ThemeContextProvider>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name='Home' component={HomeScreen}/>
        <Stack.Screen name='AnaSayfa' component={AnaSayfa}/>
        <Stack.Screen name='Dizi' component={DiziSayfasi}/>
        <Stack.Screen name='Film' component={FilmSayfasi}/>
        <Stack.Screen name='Favori' component={FavoriteSayfasi}/>
        <Stack.Screen name='Ayarlar' component={AyarlarSayfasi}/>


        
      </Stack.Navigator>
    </NavigationContainer>
    </ThemeContextProvider>

  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
