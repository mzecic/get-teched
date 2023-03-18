import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  Pressable,
} from "react-native";

import * as WebBrowser from "expo-web-browser";
import * as colors from "../assets/colors/primaryColors";

export default function GeneralNewsLine({
  data,
  lastVisitedScreen,
  setLastVisitedScreen,
  isDarkMode,
  arrayLength,
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
        styles.outerContainer,
        {
          marginTop:
            Platform.OS === "ios"
              ? data.index === 0 &&
                Platform.OS === "ios" &&
                lastVisitedScreen !== "HomeScreen" &&
                lastVisitedScreen !== "SearchScreen" &&
                lastVisitedScreen !== "ProfileScreen"
                ? "15%"
                : data.index === 0
                ? "5%"
                : 12
              : "0%",
          paddingBottom:
            lastVisitedScreen === "SearchScreen" &&
            data.index === arrayLength - 1
              ? "25%"
              : 0,
          borderBottomWidth: 0,
          borderColor: isDarkMode ? colors.colors.white : colors.colors.black,
        },
      ]}
    >
      <Pressable
        onPress={onPressHandler}
        style={({ pressed }) => [
          styles.button,
          pressed ? styles.buttonPressed : null,
        ]}
      >
        <View
          style={[
            data.index === 0 && Platform.OS === "ios"
              ? styles.headlineContainer
              : styles.lineItemContainer,
            {
              backgroundColor: isDarkMode
                ? colors.colors.black
                : data.index !== 0
                ? colors.colors.secondaryHighlight
                : colors.colors.white,
              flexDirection: "row-reverse",
              shadowColor: isDarkMode
                ? colors.colors.white
                : colors.colors.black,
            },
          ]}
        >
          <View
            style={
              data.index === 0
                ? styles.headlineTitleContainer
                : styles.titleContainer
            }
          >
            <View
              style={
                data.index === 0
                  ? styles.headlineTitleInnerContainer
                  : styles.lineItem
              }
            >
              <Text
                style={[
                  data.index === 0 ? styles.headlineTitle : styles.title,
                  {
                    color: isDarkMode
                      ? colors.colors.white
                      : colors.colors.white,
                  },
                ]}
              >
                {data.item.title}
              </Text>
            </View>
            <View style={styles.articleSourceContainer}>
              <Text
                style={[
                  data.index === 0
                    ? styles.headlineArticleSource
                    : styles.articleSource,
                  {
                    color:
                      isDarkMode && data.index !== 0
                        ? colors.colors.white
                        : data.index !== 0
                        ? colors.colors.white
                        : isDarkMode
                        ? colors.colors.white
                        : colors.colors.black,
                  },
                ]}
              >
                {data.item.source.name}
              </Text>
            </View>
            {data.index === 0 ? (
              <Image
                style={[styles.headlineImage, {}]}
                source={{ uri: data.item.image }}
              />
            ) : (
              <></>
            )}
          </View>
          {data.index !== 0 ? (
            <Image
              style={[styles.image, { borderRadius: 12 }]}
              source={{ uri: data.item.image }}
            />
          ) : (
            <></>
          )}
        </View>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  outerContainer: {
    marginHorizontal: 16,
    marginVertical: 12,
    borderRadius: 12,
  },
  headlineContainer: {
    flex: 1,
  },
  lineItem: {
    fontFamily: "Display",
    fontSize: 20,
  },
  titleContainer: {
    position: "absolute",
    width: "100%",
    borderRadius: 12,
    height: 130,
    padding: 12,
  },
  title: {
    fontFamily: "Display",
    fontSize: 18,
    zIndex: 200,
    borderRadius: 12,
  },
  headlineTitleContainer: {
    flexDirection: "column-reverse",
  },
  headlineTitle: {
    fontFamily: "Display",
    fontSize: 28,
  },
  headlineTitleInnerContainer: {
    borderColor: "white",
    zIndex: 110,
    top: 0,
    padding: 12,
    height: 160,
  },
  headlineArticleSource: {
    fontFamily: "Display",
    zIndex: 110,
    bottom: 4,
    right: 8,
    fontSize: 16,
  },
  headlineImage: {
    width: "100%",
    height: 300,
    zIndex: 100,
  },
  lineItemContainer: {
    elevation: 4,
    borderRadius: 12,
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 4,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
    backgroundColor: "rgb(235, 235, 235)",
  },
  articleSourceContainer: {
    position: "absolute",
    bottom: 4,
    right: 4,
    borderRadius: 12,
  },
  articleSource: {
    fontFamily: "Display",
    fontSize: 14,
    zIndex: 200,
    borderRadius: 12,
  },
  image: {
    opacity: 0.65,
    width: "100%",
    height: 130,
    zIndex: -1,
  },
  button: {
    flex: 1,
  },
  buttonPressed: {
    opacity: 0.5,
  },
});
