import { View, Pressable, StyleSheet, Image, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function BottomNavBar({ setLastVisitedScreen, setShowNavBar }) {
  const navigation = useNavigation();

  return (
    <View style={styles.innerContainer}>
      <View style={styles.navContainer}>
        <View style={styles.pressableContainer}>
          <Pressable
            onPress={() => {
              navigation.navigate("HomeScreen");
              setLastVisitedScreen("HomeScreen");
            }}
            style={({ pressed }) => [
              styles.button,
              pressed ? styles.buttonPressed : null,
            ]}
            android_ripple={{ color: "ccc" }}
          >
            <View style={styles.buttonContainer}>
              <Image
                style={styles.navIcon}
                source={require("../assets/home-icon.png")}
              />
              <Text style={styles.imageTag}>Home</Text>
            </View>
          </Pressable>
        </View>
        <View style={styles.pressableContainer}>
          <Pressable
            onPress={() => {
              navigation.navigate("GamingNewsScreen");
              setLastVisitedScreen("GamingNewsScreen");
            }}
            style={({ pressed }) => [
              styles.button,
              pressed ? styles.buttonPressed : null,
            ]}
            android_ripple={{ color: "ccc" }}
          >
            <View style={styles.buttonContainer}>
              <Image
                style={styles.navIcon}
                source={require("../assets/gaming-icon.png")}
              />
              <Text style={styles.imageTag}>Gaming</Text>
            </View>
          </Pressable>
        </View>
        <View style={styles.pressableContainer}>
          <Pressable
            onPress={() => {
              navigation.navigate("AudioNewsScreen");
              setLastVisitedScreen("AudioNewsScreen");
            }}
            style={({ pressed }) => [
              styles.button,
              pressed ? styles.buttonPressed : null,
            ]}
            android_ripple={{ color: "ccc" }}
          >
            <View style={styles.buttonContainer}>
              <Image
                style={styles.navIcon}
                source={require("../assets/audio-icon.png")}
              />
              <Text style={styles.imageTag}>Audio</Text>
            </View>
          </Pressable>
        </View>
        <View style={styles.pressableContainer}>
          <Pressable
            onPress={() => {
              navigation.navigate("MobileNewsScreen");
              setLastVisitedScreen("MobileNewsScreen");
            }}
            style={({ pressed }) => [
              styles.button,
              pressed ? styles.buttonPressed : null,
            ]}
            android_ripple={{ color: "ccc" }}
          >
            <View style={styles.buttonContainer}>
              <Image
                style={styles.navIcon}
                source={require("../assets/mobile-icon.png")}
              />
              <Text style={styles.imageTag}>Mobile</Text>
            </View>
          </Pressable>
        </View>
        <View style={styles.pressableContainer}>
          <Pressable
            onPress={() => {
              navigation.navigate("MenuScreen");
              setShowNavBar(false);
            }}
            style={({ pressed }) => [
              styles.button,
              pressed ? styles.buttonPressed : null,
            ]}
            android_ripple={{ color: "ccc", overflow: "hidden" }}
          >
            <View style={styles.buttonContainer}>
              <Image
                style={styles.navIcon}
                source={require("../assets/menu-icon.png")}
              />
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navContainer: {
    height: 90,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "#E6E6E6",
    border: "2px solid black",
    overflow: "hidden",
  },
  innerContainer: {
    backgroundColor: "grey",
  },
  navIcon: {
    width: 30,
    height: 30,
    margin: 16,
  },
  buttonContainer: {
    flexDirection: "column-reverse",
    justifyContent: "space-between",
  },
  pressableContainer: {
    borderRadius: 16,
    margin: 4,
    height: "70%",
    overflow: "hidden",
  },
  button: {
    borderRadius: 16,
    overflow: "hidden",
  },
  buttonPressed: {
    opacity: 0.5,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#ccc",
  },
  imageTag: {
    position: "absolute",
    alignSelf: "center",
    justifySelf: "end",
    fontSize: 12,
  },
});
