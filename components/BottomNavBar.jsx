import { View, Pressable, StyleSheet, Image, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import primaryColors from "../assets/colors/primaryColors";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

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
  // soundHandler,
  soundEffectsOn,
  playSound,
  openDrawerHandler,
  setIsMenu,
  closeDrawer,
  navbarVisibility,
  animatedNavbarStyle,
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
          },
          animatedNavbarStyle,
        ]}
      >
        <View style={styles.pressableContainer}>
          <Pressable
            onPress={() => {
              if (soundEffectsOn) playSound();
              navigation.navigate("HomeScreen");
              setLastVisitedScreen("HomeScreen");
              if (lastVisitedScreen === "HomeScreen") {
                scrollToTopHandler();
              }
            }}
            style={({ pressed }) => [styles.button]}
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
                    ? require("../assets/news-fill.png")
                    : require("../assets/news-icon.png")
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
                News
              </Text>
            </View>
          </Pressable>
        </View>
        <View style={styles.pressableContainer}>
          <Pressable
            onPress={() => {
              if (soundEffectsOn) playSound();
              navigation.navigate("GamingNewsScreen");
              setLastVisitedScreen("GamingNewsScreen");
              if (lastVisitedScreen === "GamingNewsScreen") {
                scrollToTopGamingHandler();
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
                  lastVisitedScreen === "GamingNewsScreen"
                    ? require("../assets/video-fill.png")
                    : require("../assets/video-icon.png")
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
                Tech Shorts
              </Text>
            </View>
          </Pressable>
        </View>
        <View style={styles.pressableContainer}>
          <Pressable
            onPress={() => {
              if (soundEffectsOn) playSound();
              navigation.navigate("MarketplaceScreen");
              setLastVisitedScreen("MarketplaceScreen");
              if (lastVisitedScreen === "MarketplaceScreen") {
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
                  lastVisitedScreen === "MarketplaceScreen"
                    ? require("../assets/store-fill.png")
                    : require("../assets/store-icon.png")
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
                Marketplace
              </Text>
            </View>
          </Pressable>
        </View>
        <View style={styles.pressableContainer}>
          <Pressable
            onPress={() => {
              if (soundEffectsOn) playSound();
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
        <View style={styles.pressableContainer}>
          <Pressable
            onPress={() => {
              if (soundEffectsOn) playSound();
              openDrawerHandler();
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
                source={require("../assets/menu-icon.png")}
              />
              <Text
                style={[
                  styles.imageTag,
                  {
                    color: isDarkMode ? "white" : "black",
                  },
                ]}
              >
                Menu
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
    height: 65,
    width: "100%",
    paddingTop: 8,
    paddingHorizontal: 12,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "flex-start",
    overflow: "hidden",
    bottom: 0,
    zIndex: 99,
  },
  navIcon: {
    width: 25,
    height: 25,
    // transform: [{ scale: 0.95 }],
    alignSelf: "center",
  },
  buttonContainer: {
    width: "100%",
  },
  pressableContainer: {
    // height: "100%",
    justifyContent: "center",
    alignItems: "center",
    width: "20%",
  },
  button: {
    borderRadius: 16,
  },
  buttonPressed: {
    opacity: 0.5,
  },
  imageTag: {
    // alignSelf: "center",
    fontSize: 10,
  },
});
