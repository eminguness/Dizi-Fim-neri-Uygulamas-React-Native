import React, { Component } from "react";
import { View, Switch, Text, StyleSheet, Alert, SafeAreaView } from "react-native";
import Constants from "expo-constants";
import { ThemeContext } from "../contexts/ThemeContext";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GestureHandlerRootView } from "react-native-gesture-handler"; // Değiştirilmiş satır

class AyarlarSayfasi extends Component {
  state = {
    selectedTriggerValue: "15",
  };

  showLicenses = () =>
    Alert.alert(
      "Licenses",
      "xxx",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Ok",
          style: "default",
        },
      ],
      {
        cancelable: true,
      }
    );

  render() {
    return (
      <ThemeContext.Consumer>
        {(context) => {
          const { isDarkMode, light, dark, updateTheme } = context;
          return (
            <SafeAreaView
              style={[
                styles.container,
                { backgroundColor: isDarkMode ? dark.bg : light.bg },
              ]}
            >
              <Text
                style={[
                  styles.title,
                  { color: isDarkMode ? light.bg : dark.bg },
                ]}
              >
                Ayarlar
              </Text>
              <View style={styles.settingsItem}>
                <View style={styles.settingsItem2}>
                  <MaterialCommunityIcons
                    name={isDarkMode ? "weather-night" : "weather-sunny"}
                    size={26}
                    color={isDarkMode ? light.bg : dark.bg}
                  />
                  <Text style={styles.settingText}>Karanlık mod</Text>
                </View>
                <Switch
                  value={isDarkMode}
                  onValueChange={updateTheme}
                  trackColor={{ false: "#f4f3f4", true: "#f4f3f4" }}
                  thumbColor={isDarkMode ? "#26ed7c" : "#f4f3f4"}
                />
              </View>
              <TouchableWithoutFeedback style={styles.listitem} onPress={this.showLicenses}>
                <View style={styles.settingsItem2}>
                  <MaterialCommunityIcons name="book-open-outline" size={26} />
                  <Text style={styles.settingText}>Lisanslar</Text>
                </View>
              </TouchableWithoutFeedback>
              <View style={styles.settingsItem2}>
                <MaterialCommunityIcons name="information-outline" size={26} />
                <View style={styles.settingInfo}>
                  <Text style={styles.settingText}>Sürüm</Text>
                  <Text>v{Constants.manifest.version}</Text>
                </View>
              </View>
            </SafeAreaView>
          );
        }}
      </ThemeContext.Consumer>
    );
  }
}

// `gestureHandlerRootHOC` yerine `gestureHandlerRootView` kullanarak bileşeni sarmalayın.
export default function WrappedAyarlarSayfasi(props) {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AyarlarSayfasi {...props} />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight + 10,
  },
  listitem: {
    marginVertical: 10,
  },
  settingsItem: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  settingsItem2: {
    flexWrap: "wrap",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  settingInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
  settingText: {
    marginLeft: 10,
    fontFamily: "poppins-l",
    fontSize: 15,
  },
  title: {
    paddingLeft: 20,
    fontSize: 22,
    fontFamily: "poppins-sb",
    marginBottom: 20,
  },
});
