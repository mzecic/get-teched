import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function MenuScreen({ lastVisitedScreen, setShowNavBar }) {
  const navigation = useNavigation();

  return (
    <View style={styles.mainContainer}>
      <Text>This is a menu screen</Text>
      <View>
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
  },
  closeIconContainer: {
    justifySelf: "center",
    alignSelf: "center",
    marginTop: "30%",
  },
});
