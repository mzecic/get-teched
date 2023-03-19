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

export default function AppDrawer({
  isMenu,
  setIsMenu,
  closeDrawer,
  closeDrawerHandler,
  closeBlurAreaHandler,
  windowWidth,
  blurPoint,
  isDarkMode,
}) {
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
          <View style={[styles.itemsContainer, ,]}>
            <Pressable
              onPress={() => {
                console.log(blurPoint.current);
                console.log(closeDrawer);
              }}
            >
              <Text>App Drawer</Text>
            </Pressable>
          </View>
          <View style={styles.exitButtonContainer}>
            <Pressable
              onPress={() => {
                console.log("closing app drawer");
                closeDrawerHandler();
                closeBlurAreaHandler();
              }}
            >
              <Image
                style={styles.closeIcon}
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
  },
  itemsContainer: {
    marginTop: "30%",
  },
  exitButtonContainer: {
    position: "absolute",
    bottom: "1.42%",
    right: "8%",
  },
  closeIcon: {
    transform: [{ scale: 0.75 }],
  },
});
