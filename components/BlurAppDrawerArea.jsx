import { StyleSheet, Pressable } from "react-native";
import { BlurView } from "expo-blur";
import Animated, { createAnimatedComponent } from "react-native-reanimated";

export default function BlurAppDrawerArea({
  closeDrawer,
  windowWidth,
  isDarkMode,
  blurAreaAnim,
  blurIntensity,
  closeDrawerHandler,
  blurAnimatedStyle,
  closeBlur,
  blurOffset,
}) {
  const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);
  return (
    <Animated.View
      style={[
        styles.blurContainer,
        blurAnimatedStyle,
        {
          width: windowWidth,
          //   transform: [{ translateX: blurOffset }],
        },
      ]}
    >
      <Pressable
        onPress={() => {
          closeDrawerHandler();
        }}
        style={{ flex: 1, height: "100%", width: "100%" }}
      ></Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  blurContainer: {
    flex: 1,
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 98,
  },
  blurArea: {
    height: "100%",
  },
});
