import { View, Text, StyleSheet, Image, Pressable, Switch } from "react-native";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import * as colors from "../assets/colors/primaryColors";

export default function MenuScreen({
  lastVisitedScreen,
  setShowNavBar,
  isDarkMode,
  setIsDarkMode,
  setIsMenu,
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
      <View style={styles.optionsContainer}>
        <View style={styles.switchContainer}>
          <Text
            style={[
              styles.itemLabel,
              {
                paddingHorizontal: 12,
                color: isDarkMode ? colors.colors.white : colors.colors.black,
              },
            ]}
          >
            Dark mode
          </Text>
          <Switch
            trackColor={{ false: "#767577", true: "grey" }}
            thumbColor={isDarkMode ? "rgb(190, 190, 190)" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isDarkMode}
          />
        </View>
      </View>
      <View style={styles.closeMenuContainer}>
        <Pressable
          onPress={() => {
            navigation.navigate(lastVisitedScreen);
            setIsMenu(false);
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
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "space-evenly",
  },
  closeIconContainer: {
    justifySelf: "center",
    alignSelf: "center",
  },
  optionsContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  itemLabel: {
    fontSize: 20,
  },
  switchContainer: {
    width: "70%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
