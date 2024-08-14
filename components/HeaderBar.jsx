import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import colors from "../assets/colors/primaryColors";
import * as profiles from "../utils/users-api";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

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
  yOffset,
  animatedHeaderStyle,
  lastVisitedScreen,
}) {
  return (
    <Animated.View
      style={[
        {
          paddingTop: 46,
          zIndex: 200,
          flex: 1,
          width: "100%",
          height: headerHeight,
          position: "absolute",
          top: 0,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: isDarkMode
            ? colors.colors.black
            : colors.colors.backgroundLightMode,
        },
        animatedHeaderStyle,
      ]}
    >
      {lastVisitedScreen.split("N").includes("ewsScreen") ? (
        <View style={styles.backArrowContainer}>
          <Pressable
            style={({ pressed }) => [
              styles.backButton,
              pressed ? styles.itemPressed : null,
            ]}
            onPress={() => {
              navigation.navigate("HomeScreen");
              setLastVisitedScreen("HomeScreen");
              setIsMenu(false);
            }}
          >
            <View
              style={[
                styles.backArrow,
                {
                  borderTopColor: isDarkMode
                    ? colors.colors.white
                    : colors.colors.black,
                  borderRightColor: isDarkMode
                    ? colors.colors.white
                    : colors.colors.black,
                },
              ]}
            ></View>
          </Pressable>
        </View>
      ) : (
        <></>
      )}

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
          //   setLastVisitedScreen("ProfileScreen");
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
          bottom: 14,
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
    paddingBottom: 10,
  },
  backArrowContainer: {
    position: "absolute",
    // backgroundColor: "yellow",
    left: "7%",
    bottom: 24,
  },
  backArrow: {
    width: 14,
    height: 14,
    borderTopWidth: 2.5,
    borderRightWidth: 2.5,
    borderTopColor: "#007AFF",
    borderRightColor: "#007AFF",
    transform: [{ rotate: "225deg" }],
  },
});
