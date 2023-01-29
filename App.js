import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, FlatList } from "react-native";

import HomeScreen from "./screens/HomeScreen";
import TechGridTile from "./components/TechGridTile";

import * as news from "./utils/gnews";
import { articles } from "./dummy-data";
import { WebView } from "react-native-webview";

export default function App() {
  const [techNews, setTechNews] = useState([]);
  const [fakeNews, setFakeNews] = useState([]);

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
      <View style={styles.catContainer}>
        <Text>Tech News</Text>
      </View>
      <View style={styles.homeArticles}>
        <HomeScreen techNews={fakeNews} />
      </View>
      {/* <FlatList
        style={styles.homeArticles}
        data={techNews}
        keyExtractor={(item) => item.source.id}
        renderItem={({ item }) => <TechGridTile title={item.title} />}
      /> */}
    </>
  );
}

const styles = StyleSheet.create({
  catContainer: {
    flex: 1 / 4,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  homeArticles: {
    flex: 3 / 4,
  },
});
