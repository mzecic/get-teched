import "expo-dev-client";
import { IOS_CLIENT_ID, EBAY_TEST_TOKEN } from "@env";
import * as AppleAuthentication from "expo-apple-authentication";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import {default as Sound} from "react-native-sound";
import { Audio } from "expo-av";
import { CredentialContext } from "./components/CredentialsContext";
import * as Updates from "expo-updates";
import { useEffect, useState, useRef, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Platform,
  View,
  Pressable,
  Text,
  Image,
  ImageBackground,
  Dimensions,
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
import MarketplaceScreen from "./screens/MarketplaceScreen";
import TechShortsScreen from "./screens/TechShortsScreen";
import ProfileUpdateScreen from "./screens/ProfileUpdateScreen";
import BottomNavBar from "./components/BottomNavBar";
import primaryColors from "./assets/colors/primaryColors";
import * as profiles from "./utils/users-api";
import AppDrawer from "./components/AppDrawer";
import BlurAppDrawerArea from "./components/BlurAppDrawerArea";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  useAnimatedScrollHandler,
  interpolate,
} from "react-native-reanimated";

import { clamp } from "./helpers/clamp";

SplashScreen.preventAutoHideAsync();
WebBrowser.maybeCompleteAuthSession();
// Sound.setCategory("Playback");

export default function App() {
  const [sound, setSound] = useState();
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
  const [offsetY, setOffsetY] = useState(0);
  const [scrollingDirection, setScrollingDirection] = useState("");
  const [hidePoint, setHidePoint] = useState(null);
  const [lastOffset, setLastOffset] = useState(0);
  const [shortsFeed, setShortsFeed] = useState([]);
  const Stack = createNativeStackNavigator();

  const windowWidth = useRef(Dimensions.get("window").width).current;
  const windowHeight = useRef(Dimensions.get("window").height).current;
  const blurPoint = useRef();
  blurPoint.current = 0.6 * windowWidth;
  // const closeDrawer = useRef(new Animated.Value(0.6 * windowWidth)).current;
  // const blurAreaAnim = useRef(new Animated.Value(windowWidth)).current;
  const blurIntensity = useSharedValue(0);

  const offsetDrawer = useSharedValue(0.6 * windowWidth);
  const blurOffset = useSharedValue(windowWidth);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offsetDrawer.value }],
    };
  });

  const blurAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: blurOffset.value }],
    };
  });

  function closeDrawerHandler() {
    offsetDrawer.value = withTiming(0.6 * windowWidth, {
      duration: 1000,
      easing: Easing.out(Easing.exp),
    });
    blurOffset.value = withTiming(windowWidth, {
      duration: 500,
      easing: Easing.out(Easing.exp),
    });
  }

  function openDrawerHandler() {
    blurOffset.value = withTiming(0, {
      duration: 0,
      easing: Easing.out(Easing.exp),
    });
    offsetDrawer.value = withTiming(0, {
      duration: 1000,
      easing: Easing.out(Easing.exp),
    });
  }

  const [request, response, promptAsync] = Google.useAuthRequest({
    // androidClientId: "GOOGLE_GUID.apps.googleusercontent.com",
    // iosClientId:
    //   "292437952156-7qb4rlcf7ovhe8o5poc04vpehkst1ie5.apps.googleusercontent.com",
    iosClientId: process.env.IOS_CLIENT_ID,
    extraParams: {
      access_type: "offline",
    },
  });

  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("./assets/organic-click.mp3")
    );
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  }

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

  const yOffset = useSharedValue(0);
  const offset = useRef(0);
  const focusedIndex = useSharedValue(0);
  const direction = useRef("");
  HEADER_HEIGHT = 100;
  const headerOpacity = 0;
  const navbarVisibility = useSharedValue(1);
  const navbarLinePosition = useSharedValue(0);
  // 0.19

  const animatedHeaderStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: interpolate(yOffset.value, [0, 100], [0, -100]) },
      ],
    };
  });

  const animatedLineTranslateY = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: interpolate(yOffset.value, [0, 100], [0, 100]) },
      ],
    };
  });

  const animatedNavbarStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: interpolate(yOffset.value, [0, 100], [0, 100]) },
        { scaleY: isMenu ? 0 : 1 },
      ],
    };
  });

  const animatedNavbarLine = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: navbarLinePosition.value },
        // { translateY: interpolate(yOffset.value, [0, 100], [0, 100]) },
      ],
    };
  });

  const scrollHandler = useAnimatedScrollHandler({
    onMomentumEnd: (event, ctx) => {
      const y = event.contentOffset.y;
      focusedIndex.value = Math.floor(y / windowHeight);
    },
    onBeginDrag: (event, ctx) => {
      ctx.prevY = event.contentOffset.y;
    },
    onScroll: (event, ctx) => {
      let { y } = event.contentOffset;
      if (y < 0) {
        y = 0;
      }
      const dy = y - (ctx?.prevY ?? -100);
      yOffset.value = clamp(yOffset.value + dy, 0, 100);
      // the clamp function always returns a value between 0 and 100
      ctx.prevY = y;
    },
  });
  // < { prevY?: number } >

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
    Tinos: require("./assets/fonts/Tinos-Regular.ttf"),
    TinosBold: require("./assets/fonts/Tinos-Bold.ttf"),
    Oswald: require("./assets/fonts/Oswald-Regular.ttf"),
    OswaldMedium: require("./assets/fonts/Oswald-Medium.ttf"),
    OswaldBold: require("./assets/fonts/Oswald-Bold.ttf"),
    Arimo: require("./assets/fonts/Arimo-Regular.ttf"),
    ArimoMedium: require("./assets/fonts/Arimo-Medium.ttf"),
    ArimoBold: require("./assets/fonts/Arimo-Bold.ttf"),
  });
  useEffect(function () {
    checkLoginCredentials();
    console.log(storedCredentials);
    const appUrl = Linking.createURL();
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
                      hidden={
                        profile && lastVisitedScreen !== "TechShortsScreen"
                          ? false
                          : true
                      }
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
                            gestureEnabled: false,
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
                              setShortsFeed={setShortsFeed}
                              animatedHeaderStyle={animatedHeaderStyle}
                              scrollHandler={scrollHandler}
                              yOffset={yOffset}
                              headerHeight={HEADER_HEIGHT}
                              playSound={playSound}
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
                              offsetY={offsetY}
                              setOffsetY={setOffsetY}
                              scrollingDirection={scrollingDirection}
                              setScrollingDirection={setScrollingDirection}
                              onLayoutRootView={onLayoutRootView}
                              generalNews={generalNews}
                              setGeneralNews={setGeneralNews}
                              techNews={techNews}
                              setTechNews={setTechNews}
                              gamingNews={gamingNews}
                              setGamingNews={setGamingNews}
                              audioNews={audioNews}
                              setAudioNews={setAudioNews}
                              mobileNews={mobileNews}
                              setMobileNews={setMobileNews}
                              headerOpacity={headerOpacity}
                              lastVisitedScreen={lastVisitedScreen}
                              setLastVisitedScreen={setLastVisitedScreen}
                              listViewRef={listViewRef}
                              isGeneralVisible={isGeneralVisible}
                              setIsGeneralVisible={setIsGeneralVisible}
                              isLoading={isLoading}
                              setIsLoading={setIsLoading}
                              isDarkMode={isDarkMode}
                              hidePoint={hidePoint}
                              setHidePoint={setHidePoint}
                            />
                          )}
                        </Stack.Screen>
                        <Stack.Screen
                          options={{
                            gestureEnabled: false,
                            headerShown: false,
                          }}
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
                            gestureEnabled: false,
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
                              lastVisitedScreen={lastVisitedScreen}
                              scrollHandler={scrollHandler}
                              animatedHeaderStyle={animatedHeaderStyle}
                              yOffset={yOffset}
                              headerOpacity={headerOpacity}
                              soundEffectsOn={soundEffectsOn}
                              setLastVisitedScreen={setLastVisitedScreen}
                              setIsMenu={setIsMenu}
                              storedCredentials={storedCredentials}
                              headerHeight={HEADER_HEIGHT}
                              refreshing={refreshing}
                              setRefreshing={setRefreshing}
                              offset={offset}
                              scrollingDirection={scrollingDirection}
                              setScrollingDirection={setScrollingDirection}
                              techNews={gamingNews}
                              setGamingNews={setGamingNews}
                              listViewGamingRef={listViewGamingRef}
                              isLoading={isLoading}
                              setIsLoading={setIsLoading}
                              isDarkMode={isDarkMode}
                            />
                          )}
                        </Stack.Screen>
                        <Stack.Screen
                          options={{
                            gestureEnabled: false,
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
                              lastVisitedScreen={lastVisitedScreen}
                              scrollHandler={scrollHandler}
                              animatedHeaderStyle={animatedHeaderStyle}
                              yOffset={yOffset}
                              headerOpacity={headerOpacity}
                              soundEffectsOn={soundEffectsOn}
                              setLastVisitedScreen={setLastVisitedScreen}
                              setIsMenu={setIsMenu}
                              storedCredentials={storedCredentials}
                              headerHeight={HEADER_HEIGHT}
                              refreshing={refreshing}
                              setRefreshing={setRefreshing}
                              offset={offset}
                              scrollingDirection={scrollingDirection}
                              setScrollingDirection={setScrollingDirection}
                              techNews={audioNews}
                              setAudioNews={setAudioNews}
                              listViewAudioRef={listViewAudioRef}
                              isLoading={isLoading}
                              setIsLoading={setIsLoading}
                              isDarkMode={isDarkMode}
                            />
                          )}
                        </Stack.Screen>
                        <Stack.Screen
                          options={{
                            gestureEnabled: false,
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
                              lastVisitedScreen={lastVisitedScreen}
                              scrollHandler={scrollHandler}
                              animatedHeaderStyle={animatedHeaderStyle}
                              yOffset={yOffset}
                              headerOpacity={headerOpacity}
                              soundEffectsOn={soundEffectsOn}
                              setLastVisitedScreen={setLastVisitedScreen}
                              setIsMenu={setIsMenu}
                              storedCredentials={storedCredentials}
                              headerHeight={HEADER_HEIGHT}
                              refreshing={refreshing}
                              setRefreshing={setRefreshing}
                              offset={offset}
                              scrollingDirection={scrollingDirection}
                              setScrollingDirection={setScrollingDirection}
                              techNews={mobileNews}
                              setMobileNews={setMobileNews}
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
                          name="MarketplaceScreen"
                        >
                          {(props) => (
                            <MarketplaceScreen
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
                          name="TechShortsScreen"
                        >
                          {(props) => (
                            <TechShortsScreen
                              focusedIndex={focusedIndex}
                              scrollHandler={scrollHandler}
                              yOffset={yOffset}
                              shortsFeed={shortsFeed}
                              setShortsFeed={setShortsFeed}
                              storedCredentials={storedCredentials}
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
                              arrowText={
                                lastVisitedScreen === "GamingNewsScreen"
                                  ? "Gaming News"
                                  : lastVisitedScreen === "AudioNewsScreen"
                                  ? "Audio News"
                                  : lastVisitedScreen === "MobileNewsScreen"
                                  ? "Mobile News"
                                  : "News"
                              }
                              playSound={playSound}
                              soundsEffectsOn={soundEffectsOn}
                              toggleSoundEffects={toggleSoundEffects}
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
                        animatedLineTranslateY={animatedLineTranslateY}
                        navbarLinePosition={navbarLinePosition}
                        animatedNavbarLine={animatedNavbarLine}
                        windowWidth={windowWidth}
                        animatedNavbarStyle={animatedNavbarStyle}
                        navbarVisibility={navbarVisibility}
                        // closeDrawer={closeDrawer}
                        openDrawerHandler={openDrawerHandler}
                        playSound={playSound}
                        soundEffectsOn={soundEffectsOn}
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
                      <AppDrawer
                        navbarLinePosition={navbarLinePosition}
                        animatedStyles={animatedStyles}
                        storedCredentials={storedCredentials}
                        lastVisitedScreen={lastVisitedScreen}
                        setLastVisitedScreen={setLastVisitedScreen}
                        isDarkMode={isDarkMode}
                        // closeDrawer={closeDrawer}
                        closeDrawerHandler={closeDrawerHandler}
                        windowWidth={windowWidth}
                        isMenu={isMenu}
                        setIsMenu={setIsMenu}
                      />
                      <BlurAppDrawerArea
                        blurAnimatedStyle={blurAnimatedStyle}
                        blurOffset={blurOffset}
                        animatedStyles={animatedStyles}
                        closeDrawerHandler={closeDrawerHandler}
                        blurIntensity={blurIntensity}
                        // blurAreaAnim={blurAreaAnim}
                        isDarkMode={isDarkMode}
                        windowWidth={windowWidth}
                        // closeDrawer={closeDrawer}
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
