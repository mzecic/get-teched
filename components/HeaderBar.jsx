import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import colors from "../assets/colors/primaryColors";
import * as profiles from "../utils/users-api";
import Animated from "react-native-reanimated";

export default function HeaderBar({
  isDarkMode,
  soundEffectsOn,
  playSound,
  navigation,
  setLastVisitedScreen,
  setIsMenu,
  storedCredentials,
  scrollingDirection,
  headerTitle,
  offset,
  headerOpacity,
  headerHeight,
}) {
  return (
    <Animated.View
      style={{
        paddingTop: 46,
        zIndex: 200,
        flex: 1,
        width: "100%",
        height: headerHeight,
        position: "absolute",
        top: 0,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: isDarkMode
          ? colors.colors.black
          : colors.colors.backgroundLightMode,
        transform: [
          {
            translateY: headerOpacity,
          },
        ],
      }}
    >
      <Text
        style={[
          styles.headerTitle,
          {
            color: isDarkMode ? colors.colors.white : colors.colors.black,
          },
        ]}
      >
        {headerTitle}
      </Text>
      <Pressable
        onPress={async function () {
          if (soundEffectsOn) {
            playSound();
          }
          navigation.navigate("ProfileScreen");
          setLastVisitedScreen("ProfileScreen");
          setIsMenu(true);
          const getProfile = await profiles.getProfile(storedCredentials.email);
          if (getProfile.length === 0 && loginType === "google") {
            const createdProfile = await profiles.createProfile({
              givenName: storedCredentials.given_name,
              familyName: storedCredentials.family_name,
              token: storedCredentials.token,
              darkMode: isDarkMode,
              soundEffectsOn: soundEffectsOn,
              email: storedCredentials.email,
              picture: storedCredentials.picture,
            });
            console.log(createdProfile);
          } else if (getProfile.length === 0 && loginType === "apple") {
            const createdProfile = await profiles.createProfile({
              givenName: storedCredentials.fullName.givenName,
              familyName: storedCredentials.fullName.familyName,
              token: storedCredentials.identityToken,
              darkMode: isDarkMode,
              soundEffectsOn: soundEffectsOn,
              email: storedCredentials.email,
              picture: "",
            });
            console.log(createdProfile);
          }
        }}
        style={{
          position: "absolute",
          right: "5%",
          bottom: 12,
          zIndex: 200,
        }}
      >
        {storedCredentials ? (
          <View>
            <Image
              style={{
                width: 35,
                height: 35,
                borderRadius: 50,
                tintColor:
                  !storedCredentials.picture && isDarkMode
                    ? colors.colors.white
                    : null,
              }}
              source={
                storedCredentials.picture
                  ? { uri: storedCredentials.picture }
                  : require("../assets/profile.png")
              }
            ></Image>
          </View>
        ) : (
          <></>
        )}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 18,
    textAlign: "center",
  },
});
