import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  Image,
  TextInput,
} from "react-native";
import primaryColors from "../assets/colors/primaryColors";

export default function ProfileCreateScreen({
  lastVisitedScreen,
  setIsMenu,
  isDarkMode,
  profile,
}) {
  const navigation = useNavigation();

  return (
    <>
      <SafeAreaView>
        <Pressable
          style={({ pressed }) => [
            styles.backButton,
            pressed ? styles.itemPressed : null,
          ]}
          onPress={() => {
            navigation.navigate(lastVisitedScreen);
            setIsMenu(true);
          }}
        >
          <View style={styles.backArrow}></View>
          <Text style={styles.backButtonText}>Back</Text>
        </Pressable>
      </SafeAreaView>
      <View style={styles.mainContainer}>
        <View style={styles.infoContainer}>
          <View style={styles.inputFielContainer}>
            <Text
              style={[
                styles.inputFieldLabel,
                {
                  color: isDarkMode
                    ? primaryColors.colors.white
                    : primaryColors.colors.black,
                },
              ]}
            >
              First Name
            </Text>
            <TextInput
              placeholderTextColor={
                isDarkMode
                  ? primaryColors.colors.white
                  : primaryColors.colors.black
              }
              value={profile.givenName}
              style={[
                styles.inputField,
                {
                  color: isDarkMode
                    ? primaryColors.colors.white
                    : primaryColors.colors.black,
                  backgroundColor: isDarkMode
                    ? primaryColors.colors.backgroundDarkMode
                    : primaryColors.colors.backgroundLightMode,
                },
              ]}
            />
          </View>
          <View style={styles.inputFielContainer}>
            <Text
              style={[
                styles.inputFieldLabel,
                {
                  color: isDarkMode
                    ? primaryColors.colors.white
                    : primaryColors.colors.black,
                },
              ]}
            >
              Last Name
            </Text>
            <TextInput
              placeholderTextColor={
                isDarkMode
                  ? primaryColors.colors.white
                  : primaryColors.colors.black
              }
              value={profile.familyName}
              style={[
                styles.inputField,
                {
                  color: isDarkMode
                    ? primaryColors.colors.white
                    : primaryColors.colors.black,
                  backgroundColor: isDarkMode
                    ? primaryColors.colors.backgroundDarkMode
                    : primaryColors.colors.backgroundLightMode,
                },
              ]}
            />
          </View>
          <View style={styles.inputFielContainer}>
            <Text
              style={[
                styles.inputFieldLabel,
                {
                  color: isDarkMode
                    ? primaryColors.colors.white
                    : primaryColors.colors.black,
                },
              ]}
            >
              Email
            </Text>
            <TextInput
              placeholderTextColor={
                isDarkMode
                  ? primaryColors.colors.white
                  : primaryColors.colors.black
              }
              value={profile.email}
              style={[
                styles.inputField,
                {
                  color: isDarkMode
                    ? primaryColors.colors.white
                    : primaryColors.colors.black,
                  backgroundColor: isDarkMode
                    ? primaryColors.colors.backgroundDarkMode
                    : primaryColors.colors.backgroundLightMode,
                },
              ]}
            />
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  infoContainer: {
    flex: 1 / 2,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "yellow",
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
  itemPressed: {
    opacity: 0.5,
  },
  inputFielContainer: {
    width: "80%",
  },
  inputFieldLabel: {},
  inputField: {
    height: 40,
    borderRadius: 8,
    marginVertical: 12,
    padding: 12,
  },
});
