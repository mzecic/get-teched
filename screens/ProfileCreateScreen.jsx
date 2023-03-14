import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  Image,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import primaryColors from "../assets/colors/primaryColors";
import * as profiles from "../utils/users-api";

export default function ProfileCreateScreen({
  lastVisitedScreen,
  setIsMenu,
  isDarkMode,
  profile,
  setRefreshing,
  loginType,
  storedCredentials,
}) {
  const navigation = useNavigation();
  const [givenNameText, setGivenNameText] = useState(profile.givenName);
  const [familyNameText, setFamilyNameText] = useState(profile.familyName);
  const [emailText, setEmailText] = useState(profile.email);

  async function handleSubmit() {
    const result = await profiles.updateProfile(profile.email, {
      givenName: givenNameText,
      familyName: familyNameText,
      email: emailText,
      isDarkMode: isDarkMode,
    });
    navigation.navigate(lastVisitedScreen);
    setRefreshing(true);
  }

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
              onChangeText={(newText) => {
                setGivenNameText(newText);
                console.log(storedCredentials);
                console.log(loginType);
              }}
              placeholderTextColor={
                isDarkMode
                  ? primaryColors.colors.white
                  : primaryColors.colors.black
              }
              defaultValue={givenNameText}
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
              onChangeText={(newText) => setFamilyNameText(newText)}
              placeholderTextColor={
                isDarkMode
                  ? primaryColors.colors.white
                  : primaryColors.colors.black
              }
              value={familyNameText}
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
              editable={
                loginType === "google" || loginType === "apple" ? false : true
              }
              onChangeText={(newText) => setEmailText(newText)}
              placeholderTextColor={
                isDarkMode
                  ? primaryColors.colors.white
                  : primaryColors.colors.black
              }
              defaultValue={emailText}
              style={[
                styles.inputField,
                {
                  color:
                    isDarkMode &&
                    (loginType === "google" || loginType === "apple")
                      ? primaryColors.colors.emailText
                      : loginType === "google" || loginType === "apple"
                      ? primaryColors.colors.secondaryHighlight
                      : primaryColors.colors.black,
                  backgroundColor: isDarkMode
                    ? primaryColors.colors.backgroundDarkMode
                    : primaryColors.colors.backgroundLightMode,
                },
              ]}
            />
          </View>
        </View>
        <TouchableWithoutFeedback
          onPress={() => Keyboard.dismiss()}
          accessible={false}
        >
          <View style={styles.submitButtonContainer}>
            <Pressable
              onPress={() => {
                console.log("submit pressed");
                handleSubmit();
              }}
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </Pressable>
          </View>
        </TouchableWithoutFeedback>
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
  inputField: {
    height: 40,
    borderRadius: 8,
    marginVertical: 12,
    padding: 12,
  },
  submitButtonContainer: {
    flex: 1 / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  submitButton: {},
  submitButtonText: {
    fontSize: 20,
    fontWeight: 400,
    color: "#007AFF",
  },
});
