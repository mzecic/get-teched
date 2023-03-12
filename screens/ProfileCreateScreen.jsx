import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  Image,
} from "react-native";
import primaryColors from "../assets/colors/primaryColors";

export default function ProfileCreateScreen({
  lastVisitedScreen,
  setIsMenu,
  storedCredentials,
  isDarkMode,
  profile,
}) {
  const navigation = useNavigation();

  return (
    <>
      <SafeAreaView></SafeAreaView>
      <View style={styles.mainContainer}>
        <View style={styles.photoContainer}>
          <Image
            style={styles.photo}
            source={
              storedCredentials.picture
                ? {
                    uri: storedCredentials.picture,
                  }
                : require("../assets/profile.png")
            }
          />
          <Pressable
            onPress={() => {
              console.log("edit pressed");
            }}
          >
            <Image
              style={[
                styles.editIcon,
                {
                  tintColor: isDarkMode
                    ? primaryColors.colors.white
                    : primaryColors.colors.black,
                },
              ]}
              source={require("../assets/edit-icon.png")}
            />
          </Pressable>
          <Text
            style={[
              styles.name,
              {
                color: isDarkMode
                  ? primaryColors.colors.white
                  : primaryColors.colors.black,
                fontSize: 24,
                fontWeight: 500,
              },
            ]}
          >
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
  },
  photoContainer: {
    flex: 1 / 2,
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
  editIcon: {
    marginTop: 20,
    width: 25,
    height: 25,
  },
  editIconPressed: {
    opacity: 0.5,
  },
  photo: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 1.5,
  },
  name: {
    fontSize: 18,
    marginVertical: 18,
  },
});
