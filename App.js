import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
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
          <Stack.Screen options={{ title: "GetTeched" }} name="HomeScreen">
            {(props) => <HomeScreen techNews={fakeNews} />}
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
});
