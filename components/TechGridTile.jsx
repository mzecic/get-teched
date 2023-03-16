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

export default function TechGridTile({
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
            Platform.OS === "ios"
              ? data.index === 0 &&
                Platform.OS === "ios" &&
                lastVisitedScreen !== "HomeScreen"
                ? "15%"
                : data.index === 0 && !isGeneralVisible
                ? 12
                : 12
              : 12,
          backgroundColor: isDarkMode
            ? colors.colors.black
            : colors.colors.white,
          backgroundColor: isDarkMode
            ? colors.colors.black
            : colors.colors.white,
          borderBottomWidth: 3,
          borderColor: isDarkMode ? colors.colors.white : colors.colors.black,
          shadowColor: isDarkMode ? colors.colors.white : colors.colors.black,
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
    height: 300,
    width: "94.5%",
    marginHorizontal: 11,
    marginVertical: 8,
    elevation: 4,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
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
    flex: 1,
    flexDirection: "column-reverse",
  },
  buttonPressed: {
    opacity: 0.5,
  },
  titleContainer: {
    padding: 12,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    height: 90,
  },
  title: {
    fontFamily: "Display",
    textAlign: "left",
    fontSize: 17,
  },
  articleSourceText: {
    fontFamily: "Display",
    position: "absolute",
    right: 12,
    bottom: 12,
  },
});
