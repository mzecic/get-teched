import { View, Pressable, StyleSheet, Image, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import primaryColors from "../assets/colors/primaryColors";

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
          style={({ pressed }) => [styles.button, styles.pressableContainer]}
        >
          <View style={[styles.buttonContainer]}>
            <Image
              style={[
                styles.navIcon,
                {
                  tintColor:
                    lastVisitedScreen === "HomeScreen"
                      ? primaryColors.colors.primaryBlue
                      : "black",
                },
              ]}
              source={require("../assets/home-icon.png")}
            />
            <Text
              style={[
                styles.imageTag,
                {
                  color:
                    lastVisitedScreen === "HomeScreen"
                      ? primaryColors.colors.primaryBlue
                      : "black",
                },
              ]}
            >
              Home
            </Text>
          </View>
        </Pressable>
      </View>
      <View>
        <Pressable
          onPress={() => {
            navigation.navigate("GamingNewsScreen");
            setLastVisitedScreen("GamingNewsScreen");
          }}
          style={({ pressed }) => [styles.button, styles.pressableContainer]}
        >
          <View style={styles.buttonContainer}>
            <Image
              style={[
                styles.navIcon,
                {
                  tintColor:
                    lastVisitedScreen === "GamingNewsScreen"
                      ? primaryColors.colors.primaryBlue
                      : "black",
                },
              ]}
              source={require("../assets/gaming-icon.png")}
            />
            {/* <Text
              style={{
                fontSize: 35,
                textAlign: "center",
                color:
                  lastVisitedScreen === "GamingNewsScreen" ? "blue" : "black",
              }}
            >
              &#128377;
            </Text> */}
            <Text
              style={[
                styles.imageTag,
                {
                  color:
                    lastVisitedScreen === "GamingNewsScreen"
                      ? primaryColors.colors.primaryBlue
                      : "black",
                },
              ]}
            >
              Gaming
            </Text>
          </View>
        </Pressable>
      </View>
      <View style={[styles.pressableContainer]}>
        <Pressable
          onPress={() => {
            navigation.navigate("AudioNewsScreen");
            setLastVisitedScreen("AudioNewsScreen");
          }}
        >
          <View style={styles.buttonContainer}>
            <Image
              style={[
                styles.navIcon,
                {
                  tintColor:
                    lastVisitedScreen === "AudioNewsScreen"
                      ? primaryColors.colors.primaryBlue
                      : "black",
                },
              ]}
              source={require("../assets/audio-icon.png")}
            />
            <Text
              style={[
                styles.imageTag,
                {
                  color:
                    lastVisitedScreen === "AudioNewsScreen"
                      ? primaryColors.colors.primaryBlue
                      : "black",
                },
              ]}
            >
              Audio
            </Text>
          </View>
        </Pressable>
      </View>
      <View style={styles.pressableContainer}>
        <Pressable
          onPress={() => {
            navigation.navigate("MobileNewsScreen");
            setLastVisitedScreen("MobileNewsScreen");
          }}
          style={({ pressed }) => [styles.button]}
        >
          <View style={styles.buttonContainer}>
            <Image
              style={[
                styles.navIcon,
                {
                  tintColor:
                    lastVisitedScreen === "MobileNewsScreen"
                      ? primaryColors.colors.primaryBlue
                      : "black",
                },
              ]}
              source={require("../assets/mobile-icon.png")}
            />
            <Text
              style={[
                styles.imageTag,
                {
                  color:
                    lastVisitedScreen === "MobileNewsScreen"
                      ? primaryColors.colors.primaryBlue
                      : "black",
                },
              ]}
            >
              Mobile
            </Text>
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
    alignItems: "center",
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
    alignSelf: "center",
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
    justifySelf: "flex-start",
    fontSize: 10,
  },
});
