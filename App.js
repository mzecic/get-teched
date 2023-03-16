import "expo-dev-client";
import * as AppleAuthentication from "expo-apple-authentication";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Sound from "react-native-sound";
import { CredentialContext } from "./components/CredentialsContext";
import * as Updates from "expo-updates";
import { useEffect, useState, useRef, useCallback, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Animated,
  Platform,
  View,
  Pressable,
  Text,
  Image,
  ImageBackground,
  Button,
} from "react-native";
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import HomeScreen from "./screens/HomeScreen";
import GamingNewsScreen from "./screens/GamingNewsScreen";
import AudioNewsScreen from "./screens/AudioNewsScreen";
import MobileNewsScreen from "./screens/MobileNewsScreen";
import SearchScreen from "./screens/SearchScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ProfileUpdateScreen from "./screens/ProfileUpdateScreen";
import BottomNavBar from "./components/BottomNavBar";
import primaryColors from "./assets/colors/primaryColors";
import * as profiles from "./utils/users-api";
import pressSoundEffect from "./assets/pebbles-click.wav";

SplashScreen.preventAutoHideAsync();
WebBrowser.maybeCompleteAuthSession();
Sound.setCategory("Playback");
var playSound = new Sound(pressSoundEffect, (error) => {
  if (error) {
    console.log("failed to load the sound", error);
    return;
  }
  // if loaded successfully
  console.log(
    "duration in seconds: " +
      playSound.getDuration() +
      "number of channels: " +
      playSound.getNumberOfChannels()
  );
});

export default function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const [profile, setProfile] = useState(null);
  const [storedCredentials, setStoredCredentials] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [loginType, setLoginType] = useState("");
  const [generalNews, setGeneralNews] = useState([]);
  const [techNews, setTechNews] = useState([]);
  const [gamingNews, setGamingNews] = useState([]);
  const [audioNews, setAudioNews] = useState([]);
  const [mobileNews, setMobileNews] = useState([]);
  const [allNews, setAllNews] = useState([]);
  const [lastVisitedScreen, setLastVisitedScreen] = useState("HomeScreen");
  const [isMenu, setIsMenu] = useState(false);
  const [isGeneralVisible, setIsGeneralVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [soundEffectsOn, setSoundEffectsOn] = useState(false);
  const [offset, setOffset] = useState(0);
  const [scrollingDirection, setScrollingDirection] = useState("");
  const [hidePoint, setHidePoint] = useState(null);
  const [lastOffset, setLastOffset] = useState(0);
  const Stack = createNativeStackNavigator();
  const [request, response, promptAsync] = Google.useAuthRequest({
    // androidClientId: "GOOGLE_GUID.apps.googleusercontent.com",
    iosClientId:
      "292437952156-7qb4rlcf7ovhe8o5poc04vpehkst1ie5.apps.googleusercontent.com",
    extraParams: {
      access_type: "offline",
    },
  });

  useEffect(() => {
    if (response?.type === "success") {
      setToken(response.authentication.accessToken);
      getUserInfo();
    } else if (response?.type === "error") {
      console.log(response);
    }
  }, [response, token]);

  const getUserInfo = async () => {
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const user = await response.json();
      setLoginType("google");
      setUser(user);
      persistLogin({ ...user, token });
    } catch (error) {
      // Add your own error handler here
      console.log(error);
    }
  };

  async function handleLogout() {
    const token = storedCredentials.token;

    try {
      // await AuthSession.revokeAsync(
      //   { token },
      //   { revocationEndpoint: "https://oauth2.googleapis.com/revoke" }
      // );
      setUser(null);
      await AsyncStorage.removeItem("loginCredentials");
      await Updates.reloadAsync();
    } catch (error) {
      console.log("ERROR XXX", error);
    }
  }

  const yOffset = useRef(new Animated.Value(0)).current;
  const headerOpacity = yOffset.interpolate({
    inputRange: [lastOffset, lastOffset + 1000],
    outputRange: [0, -400],
  });
  const scaleY = useRef(new Animated.Value(0)).current;
  const generalListOffset = scaleY.interpolate({
    inputRange: [0, 200],
    outputRange: [1, 0],
  });
  const toggleSwitch = async function () {
    setIsDarkMode((previousState) => !previousState);
    const result = await profiles.updateProfile(storedCredentials.email, {
      isDarkMode: !isDarkMode,
      givenName: storedCredentials.given_name,
      familyName: storedCredentials.family_name,
      email: storedCredentials.email,
    });
  };

  const toggleSoundEffects = async function () {
    setSoundEffectsOn((previousState) => !previousState);
    const result = await profiles.updateProfile(storedCredentials.email, {
      isDarkMode: isDarkMode,
      soundEffectsOn: !soundEffectsOn,
      givenName: storedCredentials.given_name,
      familyName: storedCredentials.family_name,
      email: storedCredentials.email,
    });
    console.log(result.soundEffectsOn, soundEffectsOn);
  };

  function soundHandler() {
    playSound.setVolume(0.5);
    playSound.play((success) => {
      if (success) {
        console.log("successfully finished playing");
      } else {
        console.log("playback failed due to audio decoding errors");
      }
    });
  }

  let listViewRef = useRef(null);
  let listViewGamingRef = useRef(null);
  let listViewAudioRef = useRef(null);
  let listViewMobileRef = useRef(null);

  function scrollToTopHandler() {
    if (!isLoading) {
      listViewRef.current.scrollToOffset({ offset: 0, animated: true });
    }
  }
  function scrollToTopGamingHandler() {
    if (!isLoading) {
      listViewGamingRef.current.scrollToOffset({ offset: 0, animated: true });
    }
  }
  function scrollToTopAudioHandler() {
    if (!isLoading) {
      listViewAudioRef.current.scrollToOffset({ offset: 0, animated: true });
    }
  }
  function scrollToTopMobileHandler() {
    if (!isLoading) {
      listViewMobileRef.current.scrollToOffset({ offset: 0, animated: true });
    }
  }

  const [fontsLoaded] = useFonts({
    Audiowide: require("./assets/fonts/Audiowide-Regular.ttf"),
    CaslonBold: require("./assets/fonts/LibreCaslonText-Bold.ttf"),
    Caslon: require("./assets/fonts/LibreCaslonText-Regular.ttf"),
    Display: require("./assets/fonts/DMSerifDisplay-Regular.ttf"),
    Alatsi: require("./assets/fonts/Alatsi-Regular.ttf"),
  });
  useEffect(function () {
    checkLoginCredentials();
    console.log(storedCredentials);
    setTimeout(async function () {
      if (!storedCredentials) {
        SplashScreen.hideAsync();
      }
    }, 2000);
  }, []);

  async function persistLogin(credentials) {
    const result = await AsyncStorage.setItem(
      "loginCredentials",
      JSON.stringify(credentials)
    );
    setStoredCredentials({ ...credentials });
  }

  async function checkLoginCredentials() {
    const result = await AsyncStorage.getItem("loginCredentials");
    if (result !== null) {
      setStoredCredentials(JSON.parse(result));
    } else {
      setStoredCredentials(null);
    }
  }

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      setTimeout(async function () {
        await SplashScreen.hideAsync();
      }, 2000);
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <>
      <CredentialContext.Provider
        value={{ storedCredentials, setStoredCredentials }}
      >
        <CredentialContext.Consumer>
          {({ storedCredentials }) => {
            return (
              <View style={{ flex: 1 }}>
                {!user && !storedCredentials ? (
                  <>
                    <StatusBar hidden="true" />
                    <View style={styles.container}>
                      <ImageBackground
                        resizeMode="cover"
                        style={{
                          flex: 1,
                          width: "100%",
                          justifyContent: "flex-end",
                        }}
                        source={require("./assets/splashscreen/SplashScreenAdhdpi.png")}
                      >
                        <View style={styles.authContainer}>
                          <View style={styles.googleOAuthContainer}>
                            <Image
                              style={styles.googleIcon}
                              source={require("./assets/google-icon.png")}
                            />
                            <Pressable
                              disabled={!request}
                              onPress={() => {
                                promptAsync();
                              }}
                              style={(pressed) => {
                                {
                                  opacity: pressed ? 0.5 : 1;
                                }
                              }}
                            >
                              <Text style={styles.googleButton}>
                                Sign in with Google
                              </Text>
                            </Pressable>
                          </View>
                          <AppleAuthentication.AppleAuthenticationButton
                            buttonType={
                              AppleAuthentication.AppleAuthenticationButtonType
                                .SIGN_IN
                            }
                            buttonStyle={
                              AppleAuthentication.AppleAuthenticationButtonStyle
                                .BLACK
                            }
                            cornerRadius={5}
                            style={styles.button}
                            onPress={async () => {
                              try {
                                const credential =
                                  await AppleAuthentication.signInAsync({
                                    requestedScopes: [
                                      AppleAuthentication
                                        .AppleAuthenticationScope.FULL_NAME,
                                      AppleAuthentication
                                        .AppleAuthenticationScope.EMAIL,
                                    ],
                                  });
                                setLoginType("apple");
                                setUser(credential);
                                persistLogin({ ...credential });
                                // signed in
                              } catch (e) {
                                console.log(e);
                                if (e.code === "ERR_REQUEST_CANCELED") {
                                  // handle that the user canceled the sign-in flow
                                  console.log(e);
                                } else {
                                  console.log("error");
                                  // handle other errors
                                }
                              }
                            }}
                          />
                        </View>
                      </ImageBackground>
                    </View>
                  </>
                ) : (
                  <>
                    <StatusBar
                      hidden={profile ? false : true}
                      style={isDarkMode && profile ? "light" : "dark"}
                    />
                    <NavigationContainer
                      theme={isDarkMode ? DarkTheme : DefaultTheme}
                      style={{
                        flex: 1,
                      }}
                    >
                      <Stack.Navigator
                        screenOptions={{
                          headerLeft: () => {
                            return <View style={{ marginLeft: 50 }}></View>;
                          },
                        }}
                      >
                        <Stack.Screen
                          options={{
                            headerTitle:
                              Platform.OS === "android"
                                ? () => (
                                    <Text
                                      style={{
                                        fontFamily: "Audiowide",
                                        fontSize: 20,
                                        color: isDarkMode
                                          ? primaryColors.colors.white
                                          : primaryColors.colors.black,
                                      }}
                                    >
                                      GetTeched
                                    </Text>
                                  )
                                : "",
                            headerTitleAlign: "center",
                            headerShown:
                              Platform.OS === "android" ? true : false,
                            headerStyle: {
                              backgroundColor: isDarkMode
                                ? primaryColors.colors.black
                                : primaryColors.colors.white,
                              zIndex: 100,
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                            },
                          }}
                          name="HomeScreen"
                        >
                          {(props) => (
                            <HomeScreen
                              soundHandler={soundHandler}
                              soundEffectsOn={soundEffectsOn}
                              setSoundEffectsOn={setSoundEffectsOn}
                              setLoginType={setLoginType}
                              refreshing={refreshing}
                              setRefreshing={setRefreshing}
                              setProfile={setProfile}
                              setIsDarkMode={setIsDarkMode}
                              loginType={loginType}
                              setIsMenu={setIsMenu}
                              lastOffset={lastOffset}
                              setLastOffset={setLastOffset}
                              storedCredentials={storedCredentials}
                              offset={offset}
                              setOffset={setOffset}
                              scrollingDirection={scrollingDirection}
                              setScrollingDirection={setScrollingDirection}
                              onLayoutRootView={onLayoutRootView}
                              generalNews={generalNews}
                              setGeneralNews={setGeneralNews}
                              techNews={techNews}
                              setTechNews={setTechNews}
                              yOffset={yOffset}
                              headerOpacity={headerOpacity}
                              lastVisitedScreen={lastVisitedScreen}
                              setLastVisitedScreen={setLastVisitedScreen}
                              listViewRef={listViewRef}
                              isGeneralVisible={isGeneralVisible}
                              setIsGeneralVisible={setIsGeneralVisible}
                              isLoading={isLoading}
                              setIsLoading={setIsLoading}
                              isDarkMode={isDarkMode}
                            />
                          )}
                        </Stack.Screen>
                        <Stack.Screen
                          options={{ headerShown: false }}
                          name="ProfileUpdateScreen"
                        >
                          {(props) => (
                            <ProfileUpdateScreen
                              soundEffectsOn={soundEffectsOn}
                              storedCredentials={storedCredentials}
                              loginType={loginType}
                              refreshing={refreshing}
                              setRefreshing={setRefreshing}
                              profile={profile}
                              isDarkMode={isDarkMode}
                              setIsMenu={setIsMenu}
                              lastVisitedScreen={lastVisitedScreen}
                            />
                          )}
                        </Stack.Screen>
                        <Stack.Screen
                          options={{
                            title:
                              Platform.OS === "android" ? "Gaming News" : "",
                            headerTitleAlign: "center",
                            headerShown: false,
                            headerStyle: {
                              zIndex: 100,
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                            },
                          }}
                          name="GamingNewsScreen"
                        >
                          {(props) => (
                            <GamingNewsScreen
                              refreshing={refreshing}
                              setRefreshing={setRefreshing}
                              offset={offset}
                              setOffset={setOffset}
                              scrollingDirection={scrollingDirection}
                              setScrollingDirection={setScrollingDirection}
                              techNews={gamingNews}
                              setGamingNews={setGamingNews}
                              yOffset={yOffset}
                              headerOpacity={headerOpacity}
                              listViewGamingRef={listViewGamingRef}
                              isLoading={isLoading}
                              setIsLoading={setIsLoading}
                              isDarkMode={isDarkMode}
                            />
                          )}
                        </Stack.Screen>
                        <Stack.Screen
                          options={{
                            title:
                              Platform.OS === "android" ? "Audio News" : "",
                            headerTitleAlign: "center",
                            headerShown: false,
                            headerStyle: {
                              zIndex: 100,
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                            },
                          }}
                          name="AudioNewsScreen"
                        >
                          {(props) => (
                            <AudioNewsScreen
                              refreshing={refreshing}
                              setRefreshing={setRefreshing}
                              offset={offset}
                              setOffset={setOffset}
                              scrollingDirection={scrollingDirection}
                              setScrollingDirection={setScrollingDirection}
                              techNews={audioNews}
                              setAudioNews={setAudioNews}
                              yOffset={yOffset}
                              headerOpacity={headerOpacity}
                              listViewAudioRef={listViewAudioRef}
                              isLoading={isLoading}
                              setIsLoading={setIsLoading}
                              isDarkMode={isDarkMode}
                            />
                          )}
                        </Stack.Screen>
                        <Stack.Screen
                          options={{
                            title:
                              Platform.OS === "android" ? "Mobile News" : "",
                            headerTitleAlign: "center",
                            headerShown: false,
                            headerStyle: {
                              zIndex: 100,
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                            },
                          }}
                          name="MobileNewsScreen"
                        >
                          {(props) => (
                            <MobileNewsScreen
                              refreshing={refreshing}
                              setRefreshing={setRefreshing}
                              offset={offset}
                              setOffset={setOffset}
                              scrollingDirection={scrollingDirection}
                              setScrollingDirection={setScrollingDirection}
                              techNews={mobileNews}
                              setMobileNews={setMobileNews}
                              yOffset={yOffset}
                              headerOpacity={headerOpacity}
                              listViewMobileRef={listViewMobileRef}
                              isLoading={isLoading}
                              setIsLoading={setIsLoading}
                              isDarkMode={isDarkMode}
                            />
                          )}
                        </Stack.Screen>
                        <Stack.Screen
                          options={{
                            headerShown: false,
                          }}
                          name="SearchScreen"
                        >
                          {(props) => (
                            <SearchScreen
                              lastVisitedScreen={lastVisitedScreen}
                              isDarkMode={isDarkMode}
                              allNews={allNews}
                              setAllNews={setAllNews}
                              isLoading={isLoading}
                              setIsLoading={setIsLoading}
                            />
                          )}
                        </Stack.Screen>
                        <Stack.Screen
                          options={{
                            headerShown: false,
                          }}
                          name="ProfileScreen"
                        >
                          {(props) => (
                            <ProfileScreen
                              soundsEffectsOn={soundEffectsOn}
                              toggleSoundEffects={toggleSoundEffects}
                              soundHandler={soundHandler}
                              loginType={loginType}
                              refreshing={refreshing}
                              setRefreshing={setRefreshing}
                              isLoading={isLoading}
                              setIsLoading={setIsLoading}
                              setLastVisitedScreen={setLastVisitedScreen}
                              handleLogout={handleLogout}
                              toggleSwitch={toggleSwitch}
                              profile={profile}
                              setProfile={setProfile}
                              isDarkMode={isDarkMode}
                              storedCredentials={storedCredentials}
                              setIsMenu={setIsMenu}
                              lastVisitedScreen={lastVisitedScreen}
                            />
                          )}
                        </Stack.Screen>
                      </Stack.Navigator>

                      <BottomNavBar
                        soundEffectsOn={soundEffectsOn}
                        soundHandler={soundHandler}
                        headerOpacity={headerOpacity}
                        offset={offset}
                        scrollingDirection={scrollingDirection}
                        isMenu={isMenu}
                        setIsMenu={setIsMenu}
                        lastVisitedScreen={lastVisitedScreen}
                        setLastVisitedScreen={setLastVisitedScreen}
                        scrollToTopHandler={scrollToTopHandler}
                        scrollToTopGamingHandler={scrollToTopGamingHandler}
                        scrollToTopAudioHandler={scrollToTopAudioHandler}
                        scrollToTopMobileHandler={scrollToTopMobileHandler}
                        isDarkMode={isDarkMode}
                      />
                    </NavigationContainer>
                  </>
                )}
              </View>
            );
          }}
        </CredentialContext.Consumer>
      </CredentialContext.Provider>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "stretch",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
  },
  authContainer: {
    paddingHorizontal: "25%",
    bottom: "10%",
  },
  button: {
    width: 200,
    height: 44,
  },
  googleButton: {
    color: "white",
    fontSize: 16,
    fontWeight: 500,
    paddingHorizontal: 4,
  },
  googleOAuthContainer: {
    width: 200,
    height: 42,
    paddingHorizontal: 8,
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#007AFF",
    textAlign: "center",
    marginVertical: 16,
  },
  googleIcon: {
    width: 12,
    height: 12,
  },
});
