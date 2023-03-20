import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  Animated,
  Image,
} from "react-native";
import { BlurView } from "expo-blur";
import primaryColors from "../assets/colors/primaryColors";
import { useNavigation } from "@react-navigation/native";

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
}) {
  const navigation = useNavigation();
  const fontColor = isDarkMode
    ? primaryColors.colors.white
    : primaryColors.colors.black;
  const itemHighlight = isDarkMode
    ? primaryColors.colors.appDrawerHighlight
    : primaryColors.colors.lighterGrey;

  return (
    <>
      <Animated.View
        style={[
          styles.mainContainer,
          {
            width: 0.6 * windowWidth,
            transform: [{ translateX: closeDrawer }],
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
            <View style={styles.sectionTitleContainer}>
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
                onPress={() => {
                  navigation.navigate("HomeScreen");
                  setLastVisitedScreen("HomeScreen");
                  closeDrawerHandler();
                }}
              >
                <Text style={[styles.itemText, { color: fontColor }]}>
                  Home
                </Text>
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
                <Text style={[styles.itemText, { color: fontColor }]}>
                  Gaming
                </Text>
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
                <Text style={[styles.itemText, { color: fontColor }]}>
                  Audio
                </Text>
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
                <Text style={[styles.itemText, { color: fontColor }]}>
                  Mobile
                </Text>
              </Pressable>
            </View>
          </View>
          <View style={[styles.sectionContainer]}>
            <Text style={[styles.sectionTitle, { color: fontColor }]}>
              Marketplace
            </Text>
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
                source={require("../assets/arrow-right.png")}
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: 500,
  },
  pressableContainer: {
    borderRadius: 12,
    padding: 8,
    width: "95%",
    marginTop: 8,
  },
  pressablePressed: {},
  itemText: {
    fontSize: 16,
    textAlign: "center",
  },
  dealsContainer: {},

  marketplaceContainer: {},
  exitButtonContainer: {
    position: "absolute",
    bottom: "7%",
    left: "10%",
    transform: [{ scale: 0.7 }],
  },
});
