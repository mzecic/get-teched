import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  Pressable,
} from "react-native";

import * as WebBrowser from "expo-web-browser";

export default function GeneralNewsLine({ data, lastVisitedScreen }) {
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
                lastVisitedScreen !== "HomeScreen"
                ? "15%"
                : data.index === 0
                ? "2%"
                : "5%"
              : "5%",
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
        <View style={styles.lineItemContainer}>
          <Text style={styles.lineItem}>{data.item.title}</Text>
          <Image style={styles.image} source={{ uri: data.item.image }} />
        </View>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  lineItem: {
    justifySelf: "center",
    alignSelf: "start",
    textAlign: "center",
    width: "80%",
    padding: 12,
  },
  lineItemContainer: {
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
