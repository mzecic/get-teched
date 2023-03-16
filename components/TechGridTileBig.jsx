import {
  View,
  Pressable,
  Text,
  StyleSheet,
  Platform,
  Image,
} from "react-native";
import { useState, useCallback } from "react";
import * as WebBrowser from "expo-web-browser";
import * as colors from "../assets/colors/primaryColors";

export default function TechGridTileBig({
  data,
  lastVisitedScreen,
  isGeneralVisible,
  isDarkMode,
  playSound,
}) {
  async function onPressHandler() {
    // playSound();
    let result = await WebBrowser.openBrowserAsync(data.item.url);
    return result;
  }

  return (
    <View
      style={[
        styles.gridItem,
        {
          marginTop:
            Platform.OS === "ios" &&
            data.index === 0 &&
            lastVisitedScreen === "HomeScreen"
              ? 114
              : 0,
          backgroundColor: isDarkMode
            ? colors.colors.black
            : colors.colors.white,
          backgroundColor: isDarkMode
            ? colors.colors.black
            : colors.colors.white,
          borderBottomWidth: 3,
          borderColor: isDarkMode ? colors.colors.white : colors.colors.black,
          shadowColor: isDarkMode ? colors.colors.white : colors.colors.black,
          shadowOpacity: 0.4,
          shadowOffset: { width: 2, height: 2 },
          shadowRadius: 12,
          overflow: Platform.OS === "android" ? "hidden" : "visible",
        },
      ]}
    >
      <Pressable
        onPress={onPressHandler}
        android_ripple={{ color: "ccc" }}
        style={({ pressed }) => [
          styles.button,
          pressed ? styles.buttonPressed : null,
        ]}
      >
        <View style={styles.titleContainer}>
          <Text
            adjustsFontSizeToFit={true}
            style={[
              styles.title,
              { color: isDarkMode ? colors.colors.white : colors.colors.black },
            ]}
          >
            {data.item.title}
          </Text>
          <Text
            style={[
              styles.articleSourceText,
              { color: isDarkMode ? colors.colors.white : colors.colors.black },
            ]}
          >
            {data.item.source.name}
          </Text>
        </View>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: data.item.image }} />
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    width: "94.5%",
    marginHorizontal: 11,
    marginVertical: 12,
    elevation: 4,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  imageContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  button: {
    height: 500,
    flexDirection: "column-reverse",
  },
  buttonPressed: {
    opacity: 0.5,
  },
  titleContainer: {
    padding: 12,
  },
  title: {
    fontFamily: "Display",
    textAlign: "left",
    fontSize: 30,
  },
  articleSourceText: {
    fontFamily: "Display",
    alignSelf: "flex-end",
  },
});
