import { useEffect, useState, useRef, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Animated,
  Platform,
  View,
  Text,
  TextInput,
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
import MenuScreen from "./screens/MenuScreen";
import SearchScreen from "./screens/SearchScreen";
import BottomNavBar from "./components/BottomNavBar";
import primaryColors from "./assets/colors/primaryColors";

import filter from "lodash.filter";
import { articles } from "./dummy-data";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [generalNews, setGeneralNews] = useState([]);
  const [techNews, setTechNews] = useState([]);
  const [gamingNews, setGamingNews] = useState([]);
  const [audioNews, setAudioNews] = useState([]);
  const [mobileNews, setMobileNews] = useState([]);
  const [allNews, setAllNews] = useState([]);
  const [lastVisitedScreen, setLastVisitedScreen] = useState("HomeScreen");
  const [showNavBar, setShowNavBar] = useState(true);
  const [isMenu, setIsMenu] = useState(false);
  const [isGeneralVisible, setIsGeneralVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [text, setText] = useState("");

  const Stack = createNativeStackNavigator();

  const yOffset = useRef(new Animated.Value(0)).current;
  const headerOpacity = yOffset.interpolate({
    inputRange: [0, 200],
    outputRange: [1, 0],
  });
  const yScroll = useRef(new Animated.Value(0)).current;
  const generalListOffset = yScroll.interpolate({
    inputRange: [0, 200],
    outputRange: [0, -600],
  });

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

  const MyTheme = {
    dark: isDarkMode ? true : false,
    colors: {
      background: isDarkMode
        ? primaryColors.colors.black
        : primaryColors.colors.white,
    },
  };

  const [fontsLoaded] = useFonts({
    Audiowide: require("./assets/fonts/Audiowide-Regular.ttf"),
  });

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
      <StatusBar style={isDarkMode ? "light" : "dark"} />
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
              headerShown: true,
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
                yScroll={yScroll}
                generalListOffset={generalListOffset}
                onLayoutRootView={onLayoutRootView}
                generalNews={generalNews}
                setGeneralNews={setGeneralNews}
                techNews={techNews}
                setTechNews={setTechNews}
                yOffset={yOffset}
                headerOpacity={headerOpacity}
                lastVisitedScreen={lastVisitedScreen}
                listViewRef={listViewRef}
                isGeneralVisible={isGeneralVisible}
                setIsGeneralVisible={setIsGeneralVisible}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                isDarkMode={isDarkMode}
                setShowNavBar={setShowNavBar}
              />
            )}
          </Stack.Screen>
          <Stack.Screen
            options={{
              title: Platform.OS === "android" ? "Gaming News" : "",
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
                techNews={gamingNews}
                setGamingNews={setGamingNews}
                yOffset={yOffset}
                headerOpacity={headerOpacity}
                listViewGamingRef={listViewGamingRef}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                isDarkMode={isDarkMode}
                setShowNavBar={setShowNavBar}
              />
            )}
          </Stack.Screen>
          <Stack.Screen
            options={{
              title: Platform.OS === "android" ? "Audio News" : "",
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
                techNews={audioNews}
                setAudioNews={setAudioNews}
                yOffset={yOffset}
                headerOpacity={headerOpacity}
                listViewAudioRef={listViewAudioRef}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                isDarkMode={isDarkMode}
                setShowNavBar={setShowNavBar}
              />
            )}
          </Stack.Screen>
          <Stack.Screen
            options={{
              title: Platform.OS === "android" ? "Mobile News" : "",
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
                techNews={mobileNews}
                setMobileNews={setMobileNews}
                yOffset={yOffset}
                headerOpacity={headerOpacity}
                listViewMobileRef={listViewMobileRef}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                isDarkMode={isDarkMode}
                setShowNavBar={setShowNavBar}
              />
            )}
          </Stack.Screen>
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="MenuScreen"
          >
            {(props) => (
              <MenuScreen
                setIsMenu={setIsMenu}
                lastVisitedScreen={lastVisitedScreen}
                setShowNavBar={setShowNavBar}
                isDarkMode={isDarkMode}
                setIsDarkMode={setIsDarkMode}
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
                setShowNavBar={setShowNavBar}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
        {showNavBar ? (
          <BottomNavBar
            isMenu={isMenu}
            setIsMenu={setIsMenu}
            showNavBar={showNavBar}
            setShowNavBar={setShowNavBar}
            lastVisitedScreen={lastVisitedScreen}
            setLastVisitedScreen={setLastVisitedScreen}
            scrollToTopHandler={scrollToTopHandler}
            scrollToTopGamingHandler={scrollToTopGamingHandler}
            scrollToTopAudioHandler={scrollToTopAudioHandler}
            scrollToTopMobileHandler={scrollToTopMobileHandler}
            isDarkMode={isDarkMode}
          />
        ) : (
          <></>
        )}
      </NavigationContainer>
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
});
