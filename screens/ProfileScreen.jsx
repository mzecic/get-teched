import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  Image,
  Switch,
  ActivityIndicator,
} from "react-native";
import primaryColors from "../assets/colors/primaryColors";
import * as profiles from "../utils/users-api";

export default function ProfileScreen({
  lastVisitedScreen,
  setLastVisitedScreen,
  setIsMenu,
  storedCredentials,
  isDarkMode,
  profile,
  toggleSwitch,
  handleLogout,
  isLoading,
  setIsLoading,
  refreshing,
  setRefreshing,
  loginType,
  toggleSoundEffects,
  soundsEffectsOn,
  playSound,
}) {
  const navigation = useNavigation();

  useEffect(
    function () {
      (async function () {
        if (refreshing) setIsLoading(true);
        const getProfile = await profiles.getProfile(storedCredentials.email);
        if (profile) {
          console.log(profile.givenName);
          setTimeout(function () {
            setRefreshing(false);
            setIsLoading(false);
          }, 500);
        }
      })();
    },
    [refreshing]
  );

  return (
    <>
      {isLoading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: isDarkMode
              ? primaryColors.colors.black
              : primaryColors.colors.white,
          }}
        >
          <ActivityIndicator
            size="large"
            color={
              isDarkMode
                ? primaryColors.colors.white
                : primaryColors.colors.black
            }
          />
        </View>
      ) : (
        <>
          <SafeAreaView>
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
              <View style={styles.backArrow}></View>
              <Text style={styles.backButtonText}>Back</Text>
            </Pressable>
          </SafeAreaView>
          <View style={styles.mainContainer}>
            <View style={styles.photoContainer}>
              <Image
                style={[
                  styles.photo,
                  {
                    tintColor:
                      !storedCredentials.picture && isDarkMode
                        ? primaryColors.colors.white
                        : null,
                  },
                ]}
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
                  console.log("edit profile picture pressed");
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
              <View style={styles.nameContainer}>
                <Text
                  style={[
                    styles.name,
                    {
                      color: isDarkMode
                        ? primaryColors.colors.white
                        : primaryColors.colors.black,
                      fontSize: 28,
                      fontWeight: 500,
                    },
                  ]}
                >
                  {profile ? profile.givenName : "firstName"}
                </Text>
                <Text
                  style={[
                    styles.name,
                    {
                      color: isDarkMode
                        ? primaryColors.colors.white
                        : primaryColors.colors.black,
                      fontSize: 28,
                      fontWeight: 500,
                    },
                  ]}
                >
                  {" "}
                  {profile ? profile.familyName : "lastName"}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    color: isDarkMode
                      ? primaryColors.colors.emailText
                      : primaryColors.colors.secondaryHighlight,
                    fontSize: 12,
                    fontWeight: 500,
                  }}
                >
                  {profile ? profile.email : "email"}
                </Text>
              </View>
            </View>
            <View style={styles.infoContainer}>
              <View style={styles.items}>
                <View
                  style={[
                    styles.itemContainer,
                    {
                      backgroundColor: isDarkMode
                        ? primaryColors.colors.backgroundDarkMode
                        : primaryColors.colors.backgroundLightMode,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.itemLabel,
                      {
                        paddingHorizontal: 12,
                        color: isDarkMode
                          ? primaryColors.colors.white
                          : primaryColors.colors.black,
                      },
                    ]}
                  >
                    Dark mode
                  </Text>
                  <Switch
                    trackColor={{ false: "#767577", true: "grey" }}
                    thumbColor={isDarkMode ? "rgb(190, 190, 190)" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() => {
                      if (soundsEffectsOn) {
                        playSound();
                      }
                      toggleSwitch();
                    }}
                    value={isDarkMode}
                  />
                </View>
                <View
                  style={[
                    styles.itemContainer,
                    {
                      backgroundColor: isDarkMode
                        ? primaryColors.colors.backgroundDarkMode
                        : primaryColors.colors.backgroundLightMode,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.itemLabel,
                      {
                        paddingHorizontal: 12,
                        color: isDarkMode
                          ? primaryColors.colors.white
                          : primaryColors.colors.black,
                      },
                    ]}
                  >
                    Sounds effects
                  </Text>
                  <Switch
                    trackColor={{ false: "#767577", true: "grey" }}
                    thumbColor={isDarkMode ? "rgb(190, 190, 190)" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() => {
                      if (!soundsEffectsOn) {
                        playSound();
                      }
                      toggleSoundEffects();
                    }}
                    value={soundsEffectsOn}
                  />
                </View>
                <View
                  style={[
                    styles.itemContainer,
                    {
                      backgroundColor: isDarkMode
                        ? primaryColors.colors.backgroundDarkMode
                        : primaryColors.colors.backgroundLightMode,
                    },
                  ]}
                >
                  <Pressable
                    onPress={() => {
                      if (soundsEffectsOn) playSound();
                      navigation.navigate("ProfileUpdateScreen");
                    }}
                    style={({ pressed }) => [
                      styles.pressableContainer,
                      pressed ? styles.itemPressed : null,
                    ]}
                  >
                    <Text
                      style={[
                        styles.itemLabel,
                        {
                          paddingHorizontal: 12,
                          color: isDarkMode
                            ? primaryColors.colors.white
                            : primaryColors.colors.black,
                        },
                      ]}
                    >
                      Edit Profile
                    </Text>
                    <View
                      style={[
                        styles.forwardArrow,
                        {
                          borderTopColor: isDarkMode
                            ? primaryColors.colors.white
                            : primaryColors.colors.black,
                          borderRightColor: isDarkMode
                            ? primaryColors.colors.white
                            : primaryColors.colors.black,
                        },
                      ]}
                    ></View>
                  </Pressable>
                </View>
              </View>
              <View style={styles.signoutButton}>
                <Pressable
                  onPress={() => {
                    handleLogout();
                  }}
                >
                  <Text
                    style={{
                      color: isDarkMode
                        ? primaryColors.colors.appleRed
                        : primaryColors.colors.appleRed,
                      textAlign: "center",
                      fontSize: 20,
                    }}
                  >
                    Sign Out
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </>
      )}
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
    margin: 10,
    marginLeft: 12,
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
  forwardArrow: {
    width: 14,
    height: 14,
    margin: 8,
    borderTopWidth: 2.5,
    borderRightWidth: 2.5,
    borderColor: "Black",
    borderTopColor: "#007AFF",
    borderRightColor: "#007AFF",
    transform: [{ rotate: "45deg" }],
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
  },
  nameContainer: {
    flexDirection: "row",
  },
  name: {
    fontSize: 18,
    marginVertical: 18,
  },
  infoContainer: {
    flex: 1 / 2,
    justifyContent: "space-between",
  },
  items: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  itemContainer: {
    width: "80%",
    margin: 8,
    height: 42,
    padding: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 12,
  },
  itemLabel: {
    fontSize: 16,
  },
  itemPressed: {
    opacity: 0.5,
  },
  pressableContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  signoutButton: {
    marginBottom: "15%",
  },
});
