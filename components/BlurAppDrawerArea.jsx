import { StyleSheet, Animated } from "react-native";
import { BlurView } from "expo-blur";

export default function BlurAppDrawerArea({ closeDrawer, windowWidth }) {
  return (
    <Animated.View
      style={[
        styles.blurContainer,
        {
          width: 0.4 * windowWidth,
        },
      ]}
    >
      <BlurView></BlurView>
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
    zIndex: 500,
  },
});
