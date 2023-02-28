import { View, StyleSheet, Image, Pressable, Switch } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import * as colors from "../assets/colors/primaryColors";

export default function MenuScreen({
  lastVisitedScreen,
  setShowNavBar,
  isDarkMode,
  setIsDarkMode,
}) {
  const navigation = useNavigation();
  const toggleSwitch = () => setIsDarkMode((previousState) => !previousState);

  return (
    <View
      style={[
        styles.mainContainer,
        {
          backgroundColor: isDarkMode
            ? colors.colors.backgroundDarkMode
            : colors.colors.white,
        },
      ]}
    >
      <View style={styles.closeMenuContainer}>
        <Pressable
          onPress={() => {
            navigation.navigate(lastVisitedScreen);
            setShowNavBar(true);
          }}
        >
          <Image
            style={[
              styles.closeIconContainer,
              { tintColor: isDarkMode ? "white" : "black" },
            ]}
            source={require("../assets/close-icon.png")}
          />
        </Pressable>
      </View>
      <View style={styles.container}>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isDarkMode ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isDarkMode}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
  },
  closeIconContainer: {
    justifySelf: "center",
    alignSelf: "center",
  },
  closeMenuContainer: {
    flex: 1 / 2,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});
