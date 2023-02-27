import { useEffect, useState, useRef, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Animated, Platform, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import HomeScreen from "./screens/HomeScreen";
import GamingNewsScreen from "./screens/GamingNewsScreen";
import AudioNewsScreen from "./screens/AudioNewsScreen";
import MobileNewsScreen from "./screens/MobileNewsScreen";
import MenuScreen from "./screens/MenuScreen";
import BottomNavBar from "./components/BottomNavBar";

import { articles } from "./dummy-data";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [generalNews, setGeneralNews] = useState([]);
  const [techNews, setTechNews] = useState([]);
  const [gamingNews, setGamingNews] = useState([]);
  const [audioNews, setAudioNews] = useState([]);
  const [mobileNews, setMobileNews] = useState([]);
  const [fakeNews, setFakeNews] = useState([]);
  const [lastVisitedScreen, setLastVisitedScreen] = useState("HomeScreen");
  const [showNavBar, setShowNavBar] = useState(true);

  const [isGeneralVisible, setIsGeneralVisible] = useState(true);

  const Stack = createNativeStackNavigator();

  const yOffset = useRef(new Animated.Value(0)).current;
  const headerOpacity = yOffset.interpolate({
    inputRange: [0, 200],
    outputRange: [1, 0],
  });

  let listViewRef = useRef(null);
  let listViewGamingRef = useRef(null);
  let listViewAudioRef = useRef(null);
  let listViewMobileRef = useRef(null);

  function scrollToTopHandler() {
    listViewRef.current.scrollToOffset({ offset: 0, animated: true });
  }
  function scrollToTopGamingHandler() {
    listViewGamingRef.current.scrollToOffset({ offset: 0, animated: true });
  }
  function scrollToTopAudioHandler() {
    listViewAudioRef.current.scrollToOffset({ offset: 0, animated: true });
  }
  function scrollToTopMobileHandler() {
    listViewMobileRef.current.scrollToOffset({ offset: 0, animated: true });
  }

  const MyTheme = {
    dark: true,
    colors: {
      primary: "rgba(255, 255, 255, 0.8)",
      background: "rgb(242, 242, 242)",
      card: "rgb(255, 255, 255)",
      text: "rgb(28, 28, 30)",
      border: "rgb(199, 199, 204)",
      notification: "rgb(255, 69, 58)",
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

  // useEffect(function () {
  //   (async function () {
  //     setFakeNews([...articles]);
  //   })();
  // }, []);

  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerLeft: () => {
              return <View style={{ marginLeft: 50 }}></View>;
            },
          }}
        >
          <Stack.Screen
            options={{
              title: Platform.OS === "android" ? "GetTeched" : "",
              headerTitleAlign: "center",
              headerShown: true,
              headerStyle: {
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
                lastVisitedScreen={lastVisitedScreen}
                setShowNavBar={setShowNavBar}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
        {showNavBar ? (
          <BottomNavBar
            setShowNavBar={setShowNavBar}
            lastVisitedScreen={lastVisitedScreen}
            setLastVisitedScreen={setLastVisitedScreen}
            scrollToTopHandler={scrollToTopHandler}
            scrollToTopGamingHandler={scrollToTopGamingHandler}
            scrollToTopAudioHandler={scrollToTopAudioHandler}
            scrollToTopMobileHandler={scrollToTopMobileHandler}
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
