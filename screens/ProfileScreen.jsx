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
} from "react-native";
import primaryColors from "../assets/colors/primaryColors";

export default function ProfileScreen({
  lastVisitedScreen,
  setIsMenu,
  storedCredentials,
  isDarkMode,
  profile,
  toggleSwitch,
  handleLogout,
}) {
  const [refreshing, setRefreshing] = useState(false);
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
              <Switch
                style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
                trackColor={{ false: "#767577", true: "grey" }}
                thumbColor={isDarkMode ? "rgb(190, 190, 190)" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isDarkMode}
              />
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
                  Edit Info
                </Text>
              </Pressable>
            </View>
          </View>
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
  infoContainer: {
    flex: 1 / 2,
    // backgroundColor: "yellow",
    justifyContent: "space-around",
  },
  items: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  itemContainer: {
    width: "29%",
    margin: 8,
    height: 100,
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 24,
  },
  itemLabel: {
    fontSize: 16,
  },
  itemPressed: {
    opacity: 0.5,
  },
  pressableContainer: {
    flex: 1,
    justifyContent: "center",
  },
});
