import { View, Pressable, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NavigationContainer } from "@react-navigation/native";

export default function BottomNavBar() {
  const navigation = useNavigation();

  return (
    <View style={styles.innerContainer}>
      <View style={styles.navContainer}>
        <View>
          <Pressable
            onPress={() => navigation.navigate("HomeScreen")}
            style={({ pressed }) => [
              styles.button,
              pressed ? styles.buttonPressed : null,
            ]}
            android_ripple={{ color: "ccc" }}
          >
            <Image
              style={styles.navIcon}
              source={require("../assets/home-icon.png")}
            />
          </Pressable>
        </View>
        <View>
          <Pressable
            onPress={() => navigation.navigate("GamingNewsScreen")}
            style={({ pressed }) => [
              styles.button,
              pressed ? styles.buttonPressed : null,
            ]}
            android_ripple={{ color: "ccc" }}
          >
            <Image
              style={styles.navIcon}
              source={require("../assets/gaming-icon.png")}
            />
          </Pressable>
        </View>
        <View>
          <Pressable
            onPress={() => navigation.navigate("AudioNewsScreen")}
            style={({ pressed }) => [
              styles.button,
              pressed ? styles.buttonPressed : null,
            ]}
            android_ripple={{ color: "ccc" }}
          >
            <Image
              style={styles.navIcon}
              source={require("../assets/audio-icon.png")}
            />
          </Pressable>
        </View>
        <View>
          <Pressable
            onPress={() => navigation.navigate("MobileNewsScreen")}
            style={({ pressed }) => [
              styles.button,
              pressed ? styles.buttonPressed : null,
            ]}
            android_ripple={{ color: "ccc" }}
          >
            <Image
              style={styles.navIcon}
              source={require("../assets/mobile-icon.png")}
            />
          </Pressable>
        </View>
        <View>
          <Pressable
            onPress={() => {
              return;
            }}
            style={({ pressed }) => [
              styles.button,
              pressed ? styles.buttonPressed : null,
            ]}
            android_ripple={{ color: "ccc" }}
          >
            <Image
              style={styles.navIcon}
              source={require("../assets/menu-icon.png")}
            />
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
  buttonPressed: {
    opacity: 0.5,
  },
});
