import { View, Text, StyleSheet, Image } from "react-native";

export default function MenuScreen() {
  return (
    <View style={styles.mainContainer}>
      <Text>This is a menu screen</Text>
      <View>
        <Image
          style={styles.closeIconContainer}
          source={require("../assets/close-icon.png")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  closeIconContainer: {
    justifySelf: "center",
    alignSelf: "center",
    marginTop: "30%",
  },
});
