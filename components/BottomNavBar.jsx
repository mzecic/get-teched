import { View, Pressable, StyleSheet, Image, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function BottomNavBar({
  lastVisitedScreen,
  setLastVisitedScreen,
  setShowNavBar,
}) {
  const navigation = useNavigation();

  return (
    <View style={styles.navContainer}>
      <View>
        <Pressable
          onPress={() => {
            navigation.navigate("HomeScreen");
            setLastVisitedScreen("HomeScreen");
          }}
          style={({ pressed }) => [
            styles.button,
            styles.pressableContainer,
            pressed ? styles.buttonPressed : null,
          ]}
          android_ripple={{ color: "ccc" }}
        >
          <View style={[styles.buttonContainer, { backgroundColor: "yellow" }]}>
            {/* <Image
                style={styles.navIcon}
                source={require("../assets/home-icon.png")}
              /> */}
            <Text
              style={({ fontSize: 38, marginBottom: 24 }, styles.htmlEntity)}
            >
              &#8962;
            </Text>
            <Text style={styles.imageTag}>Home</Text>
          </View>
        </Pressable>
      </View>
      <View
        style={[
          styles.pressableContainer,
          {
            backgroundColor:
              lastVisitedScreen === "GamingNewsScreen"
                ? "rgb(215, 215, 215)"
                : null,
          },
        ]}
      >
        <Pressable
          onPress={() => {
            navigation.navigate("GamingNewsScreen");
            setLastVisitedScreen("GamingNewsScreen");
          }}
          style={({ pressed }) => [
            styles.button,
            styles.pressableContainer,
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
      <View
        style={[
          styles.pressableContainer,
          {
            backgroundColor:
              lastVisitedScreen === "AudioNewsScreen"
                ? "rgb(215, 215, 215)"
                : null,
          },
        ]}
      >
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
      <View
        style={[
          styles.pressableContainer,
          {
            backgroundColor:
              lastVisitedScreen === "MobileNewsScreen"
                ? "rgb(215, 215, 215)"
                : null,
          },
        ]}
      >
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
            <Text style={styles.imageTag}>Menu</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navContainer: {
    height: "10%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "#E6E6E6",
    border: "2px solid black",
    overflow: "hidden",
  },
  // innerContainer: {
  //   backgroundColor: "grey",
  // },
  navIcon: {
    width: 30,
    height: 30,
    padding: 16,
  },
  buttonContainer: {
    // backgroundColor: "rgb(215, 215, 215)",
    width: "100%",
  },
  pressableContainer: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    borderRadius: 16,
  },
  buttonPressed: {
    opacity: 0.5,
    borderRadius: 16,
    backgroundColor: "#ccc",
  },
  imageTag: {
    // position: "absolute",
    alignSelf: "center",
    fontSize: 10,
  },
  htmlEntity: {
    width: 50,
    height: 50,
  },
});
