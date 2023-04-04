import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from "react-native";
import YouTubeVideo from "../components/YouTubeVideo";
import { useState, useEffect } from "react";
import * as yTubeApi from "../utils/youtube-api";
import { youtubeTest } from "../youtube-test-data";
import * as colors from "../assets/colors/primaryColors";

export default function TechShortsScreen({
  storedCredentials,
  isLoading,
  setIsLoading,
  refreshing,
  isDarkMode,
  shortsFeed,
  setShortsFeed,
}) {
  useEffect(function () {
    // (async function () {
    //   if (!refreshing) {
    //     setIsLoading(true);
    //   }
    //   const result = await yTubeApi.getYouTubeList();
    //   setShortsFeed(result.items);
    //   setTimeout(function () {
    //     setIsLoading(false);
    //   }, 750);
    // })();
  }, [refreshing]);

  function shortsRenderHandler(itemData) {
    return (
      <YouTubeVideo
        storedCredentials={storedCredentials}
        item={itemData.item}
      />
    );
  }

  return (
    <>
      {isLoading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: isDarkMode
              ? colors.colors.black
              : colors.colors.white,
          }}
        >
          <ActivityIndicator
            size="large"
            color={isDarkMode ? colors.colors.white : colors.colors.black}
          />
        </View>
      ) : (
        <View style={styles.mainContainer}>
          <Text>Flatlist</Text>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={youtubeTest}
            renderItem={shortsRenderHandler}
          />
          <Text>{youtubeTest[0].id}</Text>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});
