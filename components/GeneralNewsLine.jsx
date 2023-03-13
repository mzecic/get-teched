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
                lastVisitedScreen !== "SearchScreen"
                ? "15%"
                : data.index === 0
                ? "5%"
                : "5%"
              : "5%",
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
            styles.lineItemContainer,
            {
              backgroundColor: isDarkMode
                ? colors.colors.black
                : colors.colors.white,
            },
          ]}
        >
          <Text
            style={[
              styles.lineItem,
              {
                color: isDarkMode ? colors.colors.white : colors.colors.black,
                fontWeight: 400,
              },
            ]}
          >
            {data.item.title}
          </Text>
          <Image style={styles.image} source={{ uri: data.item.image }} />
        </View>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  lineItem: {
    alignSelf: "center",
    textAlign: "center",
    width: "80%",
    padding: 12,
  },
  lineItemContainer: {
    elevation: 4,
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 4,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
    flexDirection: "row",
    justifyContent: "space-between",
    border: "2px solid black",
    borderRadius: 16,
    backgroundColor: "rgb(235, 235, 235)",
    marginHorizontal: 20,
    marginVertical: 4,
  },
  image: {
    width: 75,
    height: 75,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
  },
  button: {
    flex: 1,
  },
  buttonPressed: {
    opacity: 0.5,
  },
});
