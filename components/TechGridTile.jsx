import {
  View,
  Pressable,
  Text,
  StyleSheet,
  Platform,
  Image,
} from "react-native";

export default function TechGridTile({ data }) {
  console.log(data.item.image);
  return (
    <View style={styles.gridItem}>
      <Pressable
        android_ripple={{ color: "ccc" }}
        style={({ pressed }) => [
          styles.button,
          pressed ? styles.buttonPressed : null,
        ]}
        // onPress={onPress}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{data.item.title}</Text>
        </View>
        <View style={styles.imageContainer}>
          <Text>This is the image</Text>
          <Image
            style={{ width: "100%", height: "100%" }}
            source={{ url: data.item.image }}
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
    width: "90%",
    marginHorizontal: "5%",
    marginVertical: 16,
    borderRadius: 8,
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
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
