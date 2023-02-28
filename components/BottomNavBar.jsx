import { View, Pressable, StyleSheet, Image, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import primaryColors from "../assets/colors/primaryColors";

export default function BottomNavBar({
  lastVisitedScreen,
  setLastVisitedScreen,
  setShowNavBar,
  scrollToTopHandler,
  scrollToTopGamingHandler,
  scrollToTopAudioHandler,
  scrollToTopMobileHandler,
  isDarkMode,
}) {
  const navigation = useNavigation();

  return (
    <View
      style={[
        styles.navContainer,
        {
          backgroundColor: isDarkMode
            ? primaryColors.colors.black
            : primaryColors.colors.white,
        },
      ]}
    >
      <View>
        <Pressable
          onPress={() => {
            navigation.navigate("HomeScreen");
            setLastVisitedScreen("HomeScreen");
            if (lastVisitedScreen === "HomeScreen") {
              scrollToTopHandler();
            }
          }}
          style={({ pressed }) => [styles.button, styles.pressableContainer]}
        >
          <View style={[styles.buttonContainer]}>
            <Image
              style={[
                styles.navIcon,
                {
                  tintColor: isDarkMode
                    ? lastVisitedScreen === "HomeScreen"
                      ? primaryColors.colors.secondaryHighlight
                      : "white"
                    : lastVisitedScreen === "HomeScreen"
                    ? primaryColors.colors.primaryHighlight
                    : "black",
                },
              ]}
              source={require("../assets/home-icon.png")}
            />
            <Text
              style={[
                styles.imageTag,
                {
                  color: isDarkMode
                    ? lastVisitedScreen === "HomeScreen"
                      ? primaryColors.colors.secondaryHighlight
                      : "white"
                    : lastVisitedScreen === "HomeScreen"
                    ? primaryColors.colors.primaryHighlight
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
            if (lastVisitedScreen === "GamingNewsScreen") {
              scrollToTopGamingHandler();
            }
          }}
          style={({ pressed }) => [styles.button, styles.pressableContainer]}
        >
          <View style={styles.buttonContainer}>
            <Image
              style={[
                styles.navIcon,
                {
                  tintColor: isDarkMode
                    ? lastVisitedScreen === "GamingNewsScreen"
                      ? primaryColors.colors.secondaryHighlight
                      : "white"
                    : lastVisitedScreen === "GamingNewsScreen"
                    ? primaryColors.colors.primaryHighlight
                    : "black",
                },
              ]}
              source={require("../assets/gaming-icon.png")}
            />
            <Text
              style={[
                styles.imageTag,
                {
                  color: isDarkMode
                    ? lastVisitedScreen === "GamingNewsScreen"
                      ? primaryColors.colors.secondaryHighlight
                      : "white"
                    : lastVisitedScreen === "GamingNewsScreen"
                    ? primaryColors.colors.primaryHighlight
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
            if (lastVisitedScreen === "AudioNewsScreen") {
              scrollToTopAudioHandler();
            }
          }}
        >
          <View style={styles.buttonContainer}>
            <Image
              style={[
                styles.navIcon,
                {
                  tintColor: isDarkMode
                    ? lastVisitedScreen === "AudioNewsScreen"
                      ? primaryColors.colors.secondaryHighlight
                      : "white"
                    : lastVisitedScreen === "AudioNewsScreen"
                    ? primaryColors.colors.primaryHighlight
                    : "black",
                },
              ]}
              source={require("../assets/audio-icon.png")}
            />
            <Text
              style={[
                styles.imageTag,
                {
                  color: isDarkMode
                    ? lastVisitedScreen === "AudioNewsScreen"
                      ? primaryColors.colors.secondaryHighlight
                      : "white"
                    : lastVisitedScreen === "AudioNewsScreen"
                    ? primaryColors.colors.primaryHighlight
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
            if (lastVisitedScreen === "MobileNewsScreen") {
              scrollToTopMobileHandler();
            }
          }}
          style={({ pressed }) => [styles.button]}
        >
          <View style={styles.buttonContainer}>
            <Image
              style={[
                styles.navIcon,
                {
                  tintColor: isDarkMode
                    ? lastVisitedScreen === "MobileNewsScreen"
                      ? primaryColors.colors.secondaryHighlight
                      : "white"
                    : lastVisitedScreen === "MobileNewsScreen"
                    ? primaryColors.colors.primaryHighlight
                    : "black",
                },
              ]}
              source={require("../assets/mobile-icon.png")}
            />
            <Text
              style={[
                styles.imageTag,
                {
                  color: isDarkMode
                    ? lastVisitedScreen === "MobileNewsScreen"
                      ? primaryColors.colors.secondaryHighlight
                      : "white"
                    : lastVisitedScreen === "MobileNewsScreen"
                    ? primaryColors.colors.primaryHighlight
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
              style={[
                styles.navIcon,
                {
                  tintColor: isDarkMode
                    ? primaryColors.colors.white
                    : primaryColors.colors.black,
                },
              ]}
              source={require("../assets/menu-icon.png")}
            />
            <Text
              style={[
                styles.imageTag,
                {
                  color: isDarkMode
                    ? primaryColors.colors.white
                    : primaryColors.colors.black,
                },
              ]}
            >
              Menu
            </Text>
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
