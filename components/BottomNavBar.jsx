import {
  View,
  Pressable,
  StyleSheet,
  Image,
  Text,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import primaryColors from "../assets/colors/primaryColors";

export default function BottomNavBar({
  lastVisitedScreen,
  setLastVisitedScreen,
  scrollToTopHandler,
  scrollToTopGamingHandler,
  scrollToTopAudioHandler,
  scrollToTopMobileHandler,
  isDarkMode,
  isMenu,
  scrollingDirection,
  offset,
  soundHandler,
  soundEffectsOn,
}) {
  const navigation = useNavigation();

  return (
    <>
      <Animated.View
        style={[
          styles.navContainer,
          {
            backgroundColor: isDarkMode
              ? primaryColors.colors.black
              : primaryColors.colors.backgroundLightMode,
            transform: [
              {
                scaleY:
                  isMenu || (scrollingDirection === "down" && offset > 300)
                    ? 0
                    : 1,
              },
            ],
          },
        ]}
      >
        <View>
          <Pressable
            onPress={() => {
              if (soundEffectsOn) soundHandler();
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
                    tintColor: isDarkMode ? "white" : "black",
                  },
                ]}
                source={
                  lastVisitedScreen === "HomeScreen"
                    ? require("../assets/home-fill.png")
                    : require("../assets/home-icon.png")
                }
              />
              <Text
                style={[
                  styles.imageTag,
                  {
                    color: isDarkMode ? "white" : "black",
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
              if (soundEffectsOn) soundHandler();
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
                    tintColor: isDarkMode ? "white" : "black",
                  },
                ]}
                source={
                  lastVisitedScreen === "GamingNewsScreen"
                    ? require("../assets/gaming-fill.png")
                    : require("../assets/gaming-no-fill.png")
                }
              />
              <Text
                style={[
                  styles.imageTag,
                  {
                    color: isDarkMode ? "white" : "black",
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
              if (soundEffectsOn) soundHandler();
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
                    tintColor: isDarkMode ? "white" : "black",
                  },
                ]}
                source={
                  lastVisitedScreen === "AudioNewsScreen"
                    ? require("../assets/audio-fill.png")
                    : require("../assets/audio-icon.png")
                }
              />
              <Text
                style={[
                  styles.imageTag,
                  {
                    color: isDarkMode ? "white" : "black",
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
              if (soundEffectsOn) soundHandler();
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
                    tintColor: isDarkMode ? "white" : "black",
                  },
                ]}
                source={
                  lastVisitedScreen === "MobileNewsScreen"
                    ? require("../assets/mobile-fill.png")
                    : require("../assets/mobile-icon.png")
                }
              />
              <Text
                style={[
                  styles.imageTag,
                  {
                    color: isDarkMode ? "white" : "black",
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
              if (soundEffectsOn) soundHandler();
              navigation.navigate("SearchScreen");
              setLastVisitedScreen("SearchScreen");
            }}
            style={({ pressed }) => [styles.button]}
          >
            <View style={styles.buttonContainer}>
              <Image
                style={[
                  styles.navIcon,
                  {
                    tintColor: isDarkMode ? "white" : "black",
                  },
                ]}
                source={
                  lastVisitedScreen === "SearchScreen"
                    ? require("../assets/search-fill.png")
                    : require("../assets/search-no-fill.png")
                }
              />
              <Text
                style={[
                  styles.imageTag,
                  {
                    color: isDarkMode ? "white" : "black",
                  },
                ]}
              >
                Search
              </Text>
            </View>
          </Pressable>
        </View>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  navContainer: {
    position: "absolute",
    height: "8%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    border: "2px solid black",
    overflow: "hidden",
    bottom: 0,
    zIndex: 99,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
  },
  navIcon: {
    width: 25,
    height: 25,
    padding: 12,
    alignSelf: "center",
  },
  buttonContainer: {
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
  },
  imageTag: {
    // position: "absolute",
    alignSelf: "center",
    fontSize: 10,
  },
});
