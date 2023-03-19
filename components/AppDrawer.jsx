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
          <View style={[styles.itemsContainer]}>
            <Pressable
              onPress={() => {
                console.log("app drawer item pressed");
                navigation.navigate("HomeScreen");
                setLastVisitedScreen("HomeScreen");
                closeDrawerHandler();
              }}
            >
              <Text style={[styles.itemText, { color: fontColor }]}>News</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                console.log("app drawer item pressed");
                navigation.navigate("GamingNewsScreen");
                setLastVisitedScreen("GamingNewsScreen");
                closeDrawerHandler();
              }}
            >
              <Text style={[styles.itemText, { color: fontColor }]}>
                Gaming
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {
                console.log("app drawer item pressed");
                navigation.navigate("AudioNewsScreen");
                setLastVisitedScreen("AudioNewsScreen");
                closeDrawerHandler();
              }}
            >
              <Text style={[styles.itemText, { color: fontColor }]}>Audio</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                console.log("app drawer item pressed");
                navigation.navigate("MobileNewsScreen");
                setLastVisitedScreen("AudioNewsScreen");
                closeDrawerHandler();
              }}
            >
              <Text style={[styles.itemText, { color: fontColor }]}>
                Mobile
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {
                console.log("app drawer item pressed");
                navigation.navigate("ProfileScreen");
                setLastVisitedScreen("ProfileScreen");
                setIsMenu(true);
                closeDrawerHandler();
              }}
            >
              <Text style={[styles.itemText, { color: fontColor }]}>
                Profile
              </Text>
            </Pressable>
          </View>
          <View style={styles.exitButtonContainer}>
            <Pressable
              onPress={() => {
                console.log("closing app drawer");
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
    justifyContent: "center",
  },
  itemsContainer: {
    marginHorizontal: "15%",
  },
  itemText: {
    fontSize: 20,
    fontFamily: "Oswald",
    transform: [{ scaleX: 1.2 }],
  },
  exitButtonContainer: {
    position: "absolute",
    bottom: "1.95%",
    right: "8.5%",
  },
  closeIcon: {
    transform: [{ scale: 0.6 }],
  },
});
