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

export default function TechGridTileSmall({
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
                ? 12
                : data.index === 0 && !isGeneralVisible
                ? 12
                : 12
              : 12,
          backgroundColor: isDarkMode
            ? colors.colors.black
            : colors.colors.white,
          // borderBottomWidth: 1.5,
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
          <View style={styles.titleInnerContainer}>
            {data.item.title.length > 90 ? (
              <Text
                style={[
                  styles.title,
                  {
                    color: isDarkMode
                      ? colors.colors.white
                      : colors.colors.black,
                  },
                ]}
              >
                {data.item.title.slice(0, 90)}...
              </Text>
            ) : (
              <Text
                adjustsFontSizeToFit={true}
                style={[
                  styles.title,
                  {
                    color: isDarkMode
                      ? colors.colors.white
                      : colors.colors.black,
                  },
                ]}
              >
                {data.item.title}
              </Text>
            )}
          </View>
          <View style={styles.articleSourceContainer}>
            <Text
              style={[
                styles.articleSourceText,
                {
                  color: isDarkMode ? colors.colors.white : colors.colors.black,
                },
              ]}
            >
              {data.item.source.name}
            </Text>
          </View>
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
    width: "42%",
    height: 250,
    borderRadius: 12,
    marginVertical: 18,
    marginHorizontal: "4%",
    elevation: 4,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 6,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  imageContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    height: 150,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  button: {
    height: "100%",
    flexDirection: "column-reverse",
  },
  buttonPressed: {
    opacity: 0.5,
  },
  titleContainer: {
    height: 100,
  },
  titleInnerContainer: {
    height: 110,
    padding: 6,
    overflow: "hidden",
  },
  title: {
    fontFamily: "Display",
    fontSize: 13,
  },
  articleSourceContainer: {
    width: "100%",
    padding: 4,
    position: "absolute",
    bottom: 1,
  },
  articleSourceText: {
    fontFamily: "Display",
    fontSize: 11,
    textAlign: "right",
  },
});
