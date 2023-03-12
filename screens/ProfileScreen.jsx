import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  Image,
} from "react-native";

export default function ProfileScreen({
  lastVisitedScreen,
  setIsMenu,
  storedCredentials,
}) {
  const navigation = useNavigation();

  return (
    <>
      <SafeAreaView>
        <Pressable
          style={styles.backButton}
          onPress={() => {
            navigation.navigate(lastVisitedScreen);
            setIsMenu(false);
          }}
        >
          <View style={styles.backArrow}></View>
          <Text style={styles.backButtonText}>Back</Text>
        </Pressable>
      </SafeAreaView>
      <View style={styles.mainContainer}>
        <View style={styles.photoContainer}>
          <Image
            style={styles.photo}
            source={{ uri: storedCredentials.picture }}
          />
          <Text style={styles.name}>
            {storedCredentials.given_name} {storedCredentials.family_name}{" "}
          </Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "yellow",
  },
  photoContainer: {
    flex: 1 / 2,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    margin: 16,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  backButtonText: {
    fontSize: 18,
    fontWeight: 400,
    color: "#007AFF",
  },
  backArrow: {
    width: 14,
    height: 14,
    borderTopWidth: 2.5,
    borderRightWidth: 2.5,
    borderColor: "Black",
    borderTopColor: "#007AFF",
    borderRightColor: "#007AFF",
    transform: [{ rotate: "225deg" }],
  },
  photo: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  name: {
    fontSize: 18,
    marginVertical: 18,
  },
});
