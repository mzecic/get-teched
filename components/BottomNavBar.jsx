import { View, Pressable, StyleSheet, Image, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import primaryColors from "../assets/colors/primaryColors";
import Animated, { withTiming } from "react-native-reanimated";

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
  animatedNavbarLine,
  navbarLinePosition,
  windowWidth,
}) {
  const navigation = useNavigation();

  return (
    <>
      <View
        style={[
          styles.lineContainer,
          {
            paddingHorizontal: 0.025 * windowWidth,
            width: windowWidth,
            transform: [{ scaleY: isMenu ? 0 : 1 }],
          },
        ]}
      >
        <Animated.View
          style={[
            styles.animatedLine,
            animatedNavbarLine,
            {
              width: 0.19 * windowWidth,
              backgroundColor: isDarkMode
                ? primaryColors.colors.white
                : primaryColors.colors.black,
            },
          ]}
        ></Animated.View>
      </View>
      <Animated.View
        style={[
          styles.navContainer,
          {
            backgroundColor: isDarkMode
              ? primaryColors.colors.black
              : primaryColors.colors.backgroundLightMode,
            paddingHorizontal: 0.025 * windowWidth,
            transform: [{ scaleY: isMenu ? 0 : 1 }],
          },
          // animatedNavbarStyle,
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
              } else {
                navbarLinePosition.value = withTiming(0);
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
                    width: 0.19 * windowWidth,
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
              navigation.navigate("TechShortsScreen");
              setLastVisitedScreen("TechShortsScreen");
              navbarLinePosition.value = withTiming(0.19 * windowWidth);
              setIsMenu(false);
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
                  lastVisitedScreen === "TechShortsScreen"
                    ? require("../assets/video-fill.png")
                    : require("../assets/video-icon.png")
                }
              />
              <Text
                style={[
                  styles.imageTag,
                  {
                    color: isDarkMode ? "white" : "black",
                    width: 0.19 * windowWidth,
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
              navbarLinePosition.value = withTiming(0.38 * windowWidth);
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
                    width: 0.19 * windowWidth,
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
              navbarLinePosition.value = withTiming(0.57 * windowWidth);
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
                    width: 0.19 * windowWidth,
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
                    width: 0.19 * windowWidth,
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
    height: 60,
    width: "100%",
    paddingTop: 6,
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
    textAlign: "center",
  },
  lineContainer: {
    bottom: 57,
    zIndex: 200,
  },
  animatedLine: {
    height: 2,
  },
});
