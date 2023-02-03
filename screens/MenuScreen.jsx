import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function MenuScreen({ lastVisitedScreen, setShowNavBar }) {
  const navigation = useNavigation();

  return (
    <View style={styles.mainContainer}>
      <View style={styles.closeMenuContainer}>
        <Pressable
          onPress={() => {
            navigation.navigate(lastVisitedScreen);
            setShowNavBar(true);
          }}
        >
          <Image
            style={styles.closeIconContainer}
            source={require("../assets/close-icon.png")}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
  },
  closeIconContainer: {
    justifySelf: "center",
    alignSelf: "center",
  },
  closeMenuContainer: {
    flex: 1 / 2,
  },
});
