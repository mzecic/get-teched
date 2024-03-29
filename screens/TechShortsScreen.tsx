import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import Animated from "react-native-reanimated";
import YouTubeVideo from "../components/YouTubeVideo";
import { useState, useEffect, useCallback, useRef } from "react";
import * as yTubeApi from "../utils/youtube-api";
import { youtubeTest } from "../youtube-test-data";
import * as colors from "../assets/colors/primaryColors";

export default function TechShortsScreen({
  storedCredentials,
  isLoading,
  setIsLoading,
  refreshing,
  isDarkMode,
  yOffset,
  scrollHandler,
  shortsFeed,
  setShortsFeed,
  // focusedIndex,
}) {
  const [focusedIndex, setFocusedIndex] = useState(0);
  // const focusedIndex = useRef(0);
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
    Dimensions.get("window");

  useEffect(
    function () {
      (async function () {
        if (!refreshing) {
          setIsLoading(true);
        }
        const result = await yTubeApi.getYouTubeList();
        setShortsFeed(result.items);
        console.log(shortsFeed.length);
        setTimeout(function () {
          setIsLoading(false);
        }, 500);
      })();
    },
    [refreshing]
  );

  const handleItemFocus = useCallback(
    ({
      nativeEvent: {
        contentOffset: { y },
      },
    }: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offset = Math.round(y / SCREEN_HEIGHT);

      setFocusedIndex(offset);
    },
    [focusedIndex]
  );

  function shortsRenderHandler(itemData) {
    return (
      <YouTubeVideo
        storedCredentials={storedCredentials}
        item={itemData}
        focusedIndex={focusedIndex}
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
          <Animated.FlatList
            snapToAlignment="center"
            decelerationRate={"fast"}
            snapToInterval={Dimensions.get("window").height}
            onScroll={handleItemFocus}
            keyExtractor={(item, index) => index.toString()}
            data={shortsFeed.filter(
              (short) => !short.contentDetails.duration.includes("M" || "H")
            )}
            renderItem={shortsRenderHandler}
          />
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
