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
}) {
  async function onPressHandler() {
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
                ? "5%"
                : "5%"
              : "5%",
          backgroundColor: isDarkMode
            ? colors.colors.black
            : colors.colors.white,
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
    height: 300,
    marginVertical: 16,
    marginHorizontal: 16,
    borderRadius: 18,
    elevation: 8,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 6,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  imageContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderBottomEndRadius: 16,
    borderBottomStartRadius: 16,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  button: {
    flex: 1,
  },
  buttonPressed: {
    opacity: 0.5,
  },
  titleContainer: {
    flex: 1 / 5,
    padding: 16,
    borderRadius: 8,
    justifyContent: "flex-start",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontWeight: "400",
    textAlign: "center",
    fontSize: 16,
  },
});
