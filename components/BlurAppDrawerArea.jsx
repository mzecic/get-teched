import { StyleSheet, Animated, Pressable } from "react-native";
import { BlurView } from "expo-blur";

export default function BlurAppDrawerArea({
  closeDrawer,
  windowWidth,
  isDarkMode,
  blurAreaAnim,
  blurIntensity,
  closeDrawerHandler,
  closeBlurAreaHandler,
}) {
  const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);
  return (
    <AnimatedBlurView
      intensity={blurIntensity}
      style={[
        styles.blurContainer,
        {
          width: windowWidth,
          transform: [{ translateX: blurAreaAnim }],
        },
      ]}
    >
      <Pressable
        onPress={() => {
          closeDrawerHandler();
          closeBlurAreaHandler();
        }}
        style={{ flex: 1, height: "100%", width: "100%" }}
      ></Pressable>
    </AnimatedBlurView>
  );
}

const styles = StyleSheet.create({
  blurContainer: {
    flex: 1,
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 499,
  },
  blurArea: {
    height: "100%",
  },
});
