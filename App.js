import { useEffect, useState, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { Alert, StyleSheet, Animated } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen";
import GamingNewsScreen from "./screens/GamingNewsScreen";
import AudioNewsScreen from "./screens/AudioNewsScreen";
import MobileNewsScreen from "./screens/GamingNewsScreen";
import BottomNavBar from "./components/BottomNavBar";

import * as news from "./utils/gnews";
import { articles } from "./dummy-data";

export default function App() {
  const [techNews, setTechNews] = useState([]);
  const [fakeNews, setFakeNews] = useState([]);

  const Stack = createNativeStackNavigator();

  const yOffset = useRef(new Animated.Value(0)).current;
  const headerOpacity = yOffset.interpolate({
    inputRange: [0, 200],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  useEffect(function () {
    (async function () {
      // const techNews = await news.getTechNews();
      // setTechNews([...techNews.articles]);
      setFakeNews([...articles]);
      console.log(articles);
    })();
  }, []);

  return (
    <>
      <StatusBar style="auto" />
      {/* <SafeAreaView style={styles.mainContainer}> */}
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{
              title: "GetTeched",
              headerStyle: {
                position: "fixed",
                backgroundColor: "transparent",
                zIndex: 100,
                top: 0,
                left: 0,
                right: 0,
              },
            }}
            name="HomeScreen"
          >
            {(props) => (
              <HomeScreen
                techNews={fakeNews}
                yOffset={yOffset}
                headerOpacity={headerOpacity}
              />
            )}
          </Stack.Screen>
          <Stack.Screen options={{ title: "Gaming" }} name="GamingNewsScreen">
            {(props) => <GamingNewsScreen techNews={fakeNews} />}
          </Stack.Screen>
          <Stack.Screen options={{ title: "Audio" }} name="AudioNewsScreen">
            {(props) => <AudioNewsScreen techNews={fakeNews} />}
          </Stack.Screen>
          <Stack.Screen options={{ title: "Mobile" }} name="MobileNewsScreen">
            {(props) => <MobileNewsScreen techNews={fakeNews} />}
          </Stack.Screen>
        </Stack.Navigator>
        <BottomNavBar />
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
});
