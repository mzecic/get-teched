import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  //   Animated,
  Image,
} from "react-native";
import { BlurView } from "expo-blur";
import primaryColors from "../assets/colors/primaryColors";
import { useNavigation } from "@react-navigation/native";
import Animated from "react-native-reanimated";

export default function AppDrawer({
  setIsMenu,
  lastVisitedScreen,
  setLastVisitedScreen,
  closeDrawer,
  closeDrawerHandler,
  windowWidth,
  blurPoint,
  isDarkMode,
  storedCredentials,
  animatedStyles,
  closeBlur,
}) {
  const navigation = useNavigation();
  const fontColor = isDarkMode
    ? primaryColors.colors.white
    : primaryColors.colors.black;
  const itemHighlight = isDarkMode
    ? primaryColors.colors.appDrawerHighlight
    : primaryColors.colors.newsTile;
  const dynamicTint = isDarkMode
    ? primaryColors.colors.white
    : primaryColors.colors.black;
  const lineColor = isDarkMode
    ? primaryColors.colors.appDrawerHighlight
    : primaryColors.colors.black;

  return (
    <>
      <Animated.View
        style={[
          styles.mainContainer,
          animatedStyles,
          {
            width: 0.6 * windowWidth,
            // transform: [{ translateX: closeDrawer }],
          },
        ]}
      >
        <View
          style={[
            styles.rightContainer,
            {
              backgroundColor: isDarkMode
                ? primaryColors.colors.backgroundDarkMode
                : primaryColors.colors.backgroundLightMode,
            },
          ]}
        >
          <View style={[styles.sectionContainer]}>
            <View
              style={[styles.sectionTitleContainer, { borderColor: lineColor }]}
            >
              <Text style={[styles.sectionTitle, { color: fontColor }]}>
                News
              </Text>
            </View>
            <View
              style={[
                styles.pressableContainer,
                {
                  backgroundColor:
                    lastVisitedScreen === "HomeScreen" ? itemHighlight : null,
                },
              ]}
            >
              <Pressable
                style={styles.pressableItem}
                onPress={() => {
                  navigation.navigate("HomeScreen");
                  setLastVisitedScreen("HomeScreen");
                  closeDrawerHandler();
                }}
              >
                <View style={styles.iconContainer}>
                  <Image
                    style={[styles.itemIcon, { tintColor: dynamicTint }]}
                    source={require("../assets/home-icon.png")}
                  />
                </View>
                <View style={styles.textContainer}>
                  <Text style={[styles.itemText, { color: fontColor }]}>
                    Home
                  </Text>
                </View>
              </Pressable>
            </View>
            <View
              style={[
                styles.pressableContainer,
                {
                  backgroundColor:
                    lastVisitedScreen === "GamingNewsScreen"
                      ? itemHighlight
                      : null,
                },
              ]}
            >
              <Pressable
                onPress={() => {
                  navigation.navigate("GamingNewsScreen");
                  setLastVisitedScreen("GamingNewsScreen");
                  closeDrawerHandler();
                }}
              >
                <View style={styles.iconContainer}>
                  <Image
                    style={[styles.itemIcon, { tintColor: dynamicTint }]}
                    source={require("../assets/gaming-icon.png")}
                  />
                </View>
                <View style={styles.textContainer}>
                  <Text style={[styles.itemText, { color: fontColor }]}>
                    Gaming
                  </Text>
                </View>
              </Pressable>
            </View>
            <View
              style={[
                styles.pressableContainer,
                {
                  backgroundColor:
                    lastVisitedScreen === "AudioNewsScreen"
                      ? itemHighlight
                      : null,
                },
              ]}
            >
              <Pressable
                onPress={() => {
                  navigation.navigate("AudioNewsScreen");
                  setLastVisitedScreen("AudioNewsScreen");
                  closeDrawerHandler();
                }}
              >
                <View style={styles.iconContainer}>
                  <Image
                    style={[styles.itemIcon, { tintColor: dynamicTint }]}
                    source={require("../assets/audio-icon.png")}
                  />
                </View>
                <View style={styles.textContainer}>
                  <Text style={[styles.itemText, { color: fontColor }]}>
                    Audio
                  </Text>
                </View>
              </Pressable>
            </View>
            <View
              style={[
                styles.pressableContainer,
                {
                  backgroundColor:
                    lastVisitedScreen === "MobileNewsScreen"
                      ? itemHighlight
                      : null,
                },
              ]}
            >
              <Pressable
                onPress={() => {
                  navigation.navigate("MobileNewsScreen");
                  setLastVisitedScreen("MobileNewsScreen");
                  closeDrawerHandler();
                }}
              >
                <View style={styles.iconContainer}>
                  <Image
                    style={[styles.itemIcon, { tintColor: dynamicTint }]}
                    source={require("../assets/mobile-icon.png")}
                  />
                </View>
                <View style={styles.textContainer}>
                  <Text style={[styles.itemText, { color: fontColor }]}>
                    Mobile
                  </Text>
                </View>
              </Pressable>
            </View>
          </View>
          <View style={[styles.sectionContainer]}>
            <View
              style={[styles.sectionTitleContainer, { borderColor: lineColor }]}
            >
              <Text style={[styles.sectionTitle, { color: fontColor }]}>
                Marketplace
              </Text>
            </View>
            <View style={styles.pressableContainer}>
              <Pressable
                onPress={() => {
                  navigation.navigate("HomeScreen");
                  setLastVisitedScreen("HomeScreen");
                  closeDrawerHandler();
                }}
              >
                <Text style={[styles.itemText, { color: fontColor }]}>
                  All Listing
                </Text>
              </Pressable>
            </View>
            <View style={styles.pressableContainer}>
              <Pressable
                onPress={() => {
                  navigation.navigate("GamingNewsScreen");
                  setLastVisitedScreen("GamingNewsScreen");
                  closeDrawerHandler();
                }}
              >
                <Text style={[styles.itemText, { color: fontColor }]}>
                  My Listings
                </Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.exitButtonContainer}>
            <Pressable
              onPress={() => {
                closeDrawerHandler();
              }}
            >
              <Image
                style={[
                  styles.closeIcon,
                  {
                    tintColor: isDarkMode
                      ? primaryColors.colors.white
                      : primaryColors.colors.black,
                  },
                ]}
                source={require("../assets/close-icon.png")}
              />
            </Pressable>
          </View>
        </View>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "row-reverse",
    top: 0,
    right: 0,
    height: "100%",
    position: "absolute",
    zIndex: 500,
  },
  rightContainer: {
    width: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  sectionContainer: {
    width: "90%",
    alignItems: "center",
  },
  sectionTitleContainer: {
    width: "80%",
    alignItems: "center",
    borderBottomWidth: 1,
    padding: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 600,
  },
  pressableContainer: {
    borderRadius: 12,
    padding: 8,
    width: "95%",
    marginTop: 8,
  },
  pressableItem: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    position: "absolute",
    left: 0,
  },
  itemIcon: {
    width: 20,
    height: 20,
  },
  textContainer: {},
  itemText: {
    fontSize: 16,
    textAlign: "center",
  },
  exitButtonContainer: {
    position: "absolute",
    top: "6%",
    right: "7%",
    transform: [{ scale: 0.7 }],
  },
});
