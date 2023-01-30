import {
  View,
  Pressable,
  Text,
  StyleSheet,
  Platform,
  Image,
  Linking,
  Alert,
} from "react-native";
import * as WebBrowser from "expo-web-browser";

export default function TechGridTile({ data }) {
  console.log(data.item.url);
  async function onPressHandler() {
    let result = await WebBrowser.openBrowserAsync(data.item.url);
    return result;
  }

  return (
    <View style={styles.gridItem}>
      <Pressable
        onPress={onPressHandler}
        android_ripple={{ color: "ccc" }}
        style={({ pressed }) => [
          styles.button,
          pressed ? styles.buttonPressed : null,
        ]}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{data.item.title}</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            style={[{ width: "80%", height: "80%" }, styles.image]}
            source={{ uri: data.item.image }}
          />
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
    backgroundColor: "white",
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowOffset: { width: 4, height: 4 },
    shadowRadius: 12,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    padding: 16,
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
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
