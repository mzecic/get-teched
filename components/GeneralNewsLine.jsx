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
import { color } from "react-native-reanimated";

export default function GeneralNewsLine({
  data,
  lastVisitedScreen,
  setLastVisitedScreen,
  isDarkMode,
  arrayLength,
}) {
  async function onPressHandler() {
    let result = await WebBrowser.openBrowserAsync(data.item.url);
    return result;
  }
  return (
    <View
      style={[
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
                : "0%"
              : "0%",
          paddingBottom:
            lastVisitedScreen === "SearchScreen" &&
            data.index === arrayLength - 1
              ? "25%"
              : 0,
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
                : colors.colors.white,
              flexDirection:
                data.index % 2 === 0 && data.index !== 0
                  ? "row-reverse"
                  : data.index % 2 !== 0
                  ? "row"
                  : "column",
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
            <Text
              style={[
                data.index === 0 ? styles.headlineTitle : styles.lineItem,
                {
                  color:
                    isDarkMode && data.index === 0
                      ? colors.colors.white
                      : data.index === 0
                      ? colors.colors.white
                      : isDarkMode
                      ? colors.colors.white
                      : colors.colors.black,
                },
              ]}
            >
              {data.item.title}
            </Text>
            <Text
              style={[
                data.index === 0
                  ? styles.headlineArticleSource
                  : styles.articleSource,
                {
                  color:
                    isDarkMode && data.index !== 0
                      ? colors.colors.secondaryHighlight
                      : colors.colors.white,
                },
              ]}
            >
              {data.item.source.name}
            </Text>
            {data.index === 0 ? (
              <Image
                style={data.index === 0 ? styles.headlineImage : styles.image}
                source={{ uri: data.item.image }}
              />
            ) : (
              <></>
            )}
          </View>
          {data.index !== 0 ? (
            <Image
              style={data.index === 0 ? styles.headlineImage : styles.image}
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
  lineItem: {
    fontFamily: "Caslon",
    alignSelf: "flex-start",
    textAlign: "left",
    width: "100%",
    padding: 12,
    fontSize: 17,
  },
  titleContainer: {
    width: "50%",
  },
  headlineTitleContainer: {
    flexDirection: "column-reverse",
  },
  headlineTitle: {
    position: "absolute",
    fontFamily: "CaslonBold",
    zIndex: 110,
    margin: 12,
    marginVertical: 52,
    fontSize: 30,
  },
  headlineArticleSource: {
    position: "absolute",
    fontFamily: "CaslonBold",
    zIndex: 110,
    bottom: 12,
    right: 12,
    fontSize: 20,
    color: colors.colors.white,
  },
  headlineImage: {
    width: "100%",
    height: 300,
    zIndex: 100,
  },
  lineItemContainer: {
    elevation: 4,
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 4,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
    justifyContent: "space-between",
    border: "2px solid black",
    backgroundColor: "rgb(235, 235, 235)",
  },
  articleSource: {
    fontFamily: "CaslonBold",
    fontSize: 14,
    paddingHorizontal: 12,
    zIndex: 200,
  },
  image: {
    width: "50%",
    height: 200,
    // borderTopRightRadius: 16,
    // borderBottomRightRadius: 16,
  },
  button: {
    flex: 1,
  },
  buttonPressed: {
    opacity: 0.5,
  },
});
