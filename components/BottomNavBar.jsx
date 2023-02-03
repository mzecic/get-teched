import { View, Pressable, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NavigationContainer } from "@react-navigation/native";

export default function BottomNavBar({ setLastVisitedScreen, setShowNavBar }) {
  const navigation = useNavigation();

  return (
    <View style={styles.innerContainer}>
      <View style={styles.navContainer}>
        <View style={styles.pressableContainer}>
          <Pressable
            onPress={() => {
              navigation.navigate("HomeScreen");
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
            </View>
          </Pressable>
        </View>
        <View style={styles.pressableContainer}>
          <Pressable
            onPress={() => navigation.navigate("GamingNewsScreen")}
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
            </View>
          </Pressable>
        </View>
        <View style={styles.pressableContainer}>
          <Pressable
            onPress={() => navigation.navigate("AudioNewsScreen")}
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
            </View>
          </Pressable>
        </View>
        <View style={styles.pressableContainer}>
          <Pressable
            onPress={() => navigation.navigate("MobileNewsScreen")}
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
            </View>
          </Pressable>
        </View>
        <View style={styles.pressableContainer}>
          <Pressable
            onPress={() => {}}
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
  //   buttonContainer: {
  //     backgroundColor: "blue",
  //   },
  pressableContainer: {
    borderRadius: 16,
    margin: 8,
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
});
