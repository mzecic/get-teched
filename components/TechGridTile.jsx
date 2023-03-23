import {
  View,
  Pressable,
  Text,
  StyleSheet,
  Platform,
  Image,
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as colors from "../assets/colors/primaryColors";
import Animated, { SlideInLeft } from "react-native-reanimated";

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
    <Animated.View
      entering={SlideInLeft}
      style={[
        styles.gridItem,
        {
          marginTop:
            Platform.OS === "ios"
              ? data.index === 0 && Platform.OS === "ios"
                ? 124
                : data.index === 0
                ? "15%"
                : 12
              : 12,
          backgroundColor: isDarkMode
            ? colors.colors.black
            : colors.colors.white,
          backgroundColor: isDarkMode
            ? colors.colors.black
            : colors.colors.white,
          borderBottomWidth: 1.5,
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
            {data.item.title.length > 100
              ? data.item.title.slice(0, 101) + "..."
              : data.item.title}
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
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  gridItem: {
    height: 330,
    width: "94.7%",
    borderRadius: 12,
    marginHorizontal: "2.5%",
    marginVertical: "2.5%",
    elevation: 4,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  imageContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    flex: 1,
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
    fontFamily: "Oswald",
    textAlign: "left",
    fontSize: 16,
  },
  articleSourceText: {
    fontFamily: "OswaldMedium",
    position: "absolute",
    right: 12,
    bottom: 12,
  },
});
