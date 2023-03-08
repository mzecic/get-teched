import { View, Text, StyleSheet, Image, Pressable, Switch } from "react-native";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import * as colors from "../assets/colors/primaryColors";

export default function MenuScreen({
  lastVisitedScreen,
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
        <View
          style={[
            styles.itemContainer,
            {
              backgroundColor: isDarkMode
                ? colors.colors.black
                : colors.colors.backgroundLightMode,
            },
          ]}
        >
          <Switch
            style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
            trackColor={{ false: "#767577", true: "grey" }}
            thumbColor={isDarkMode ? "rgb(190, 190, 190)" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isDarkMode}
          />
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
        </View>
        <View
          style={[
            styles.itemContainer,
            {
              backgroundColor: isDarkMode
                ? colors.colors.black
                : colors.colors.backgroundLightMode,
            },
          ]}
        >
          <Text
            style={[
              styles.itemLabel,
              {
                paddingHorizontal: 12,
                color: isDarkMode ? colors.colors.white : colors.colors.black,
              },
            ]}
          >
            Feedback
          </Text>
        </View>
        <View
          style={[
            styles.itemContainer,
            {
              backgroundColor: isDarkMode
                ? colors.colors.black
                : colors.colors.backgroundLightMode,
            },
          ]}
        >
          <Text
            style={[
              styles.itemLabel,
              {
                paddingHorizontal: 12,
                color: isDarkMode ? colors.colors.white : colors.colors.black,
              },
            ]}
          >
            Profile
          </Text>
        </View>
        <View
          style={[
            styles.itemContainer,
            {
              backgroundColor: isDarkMode
                ? colors.colors.black
                : colors.colors.backgroundLightMode,
            },
          ]}
        >
          <Text
            style={[
              styles.itemLabel,
              {
                paddingHorizontal: 12,
                color: isDarkMode ? colors.colors.white : colors.colors.black,
              },
            ]}
          >
            Item 4
          </Text>
        </View>
      </View>
      <View style={styles.closeMenuContainer}>
        <Pressable
          onPress={() => {
            navigation.navigate(lastVisitedScreen);
            setIsMenu(false);
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
    justifyContent: "space-around",
    alignItems: "center",
  },
  closeIconContainer: {
    transform: [{ scale: 0.9 }],
    justifySelf: "center",
    alignSelf: "center",
  },
  optionsContainer: {
    width: "80%",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
  itemLabel: {
    fontSize: 16,
  },
  itemContainer: {
    width: "38%",
    margin: 16,
    height: 100,
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 24,
  },
});
