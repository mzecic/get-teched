import {
  Animated,
  StyleSheet,
  View,
  Text,
  Platform,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { useLayoutEffect, useEffect, useCallback, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as news from "../utils/gnews";
import * as colors from "../assets/colors/primaryColors";
import TechGridTile from "../components/TechGridTile";

export default function AudioNewsScreen({
  techNews,
  yOffset,
  setAudioNews,
  listViewAudioRef,
  isLoading,
  setIsLoading,
  isDarkMode,
}) {
  const [refreshing, setRefreshing] = useState(false);
  const [fontsLoaded] = useFonts({
    "Barlow-Medium": require("../assets/fonts/Barlow-Medium.ttf"),
  });

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, []);
  function renderTechItem(itemData) {
    return <TechGridTile isDarkMode={isDarkMode} data={itemData} />;
  }
  const navigation = useNavigation();

  useEffect(function () {
    (async function () {
      setIsLoading(true);
      const techNews = await news.getAudioNews();
      setAudioNews([...techNews.reverse()]);
      setTimeout(function () {
        setIsLoading(false);
      }, 750);
    })();
  }, []);

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
        <View
          style={[
            styles.list,
            {
              backgroundColor: isDarkMode
                ? colors.colors.backgroundDarkMode
                : colors.colors.white,
            },
          ]}
        >
          <Animated.FlatList
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            onScroll={
              Platform.OS === "ios"
                ? Animated.event(
                    [
                      {
                        nativeEvent: {
                          contentOffset: {
                            y: yOffset,
                          },
                        },
                      },
                    ],
                    { useNativeDriver: true }
                  )
                : () => {
                    return;
                  }
            }
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={techNews}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderTechItem}
            ref={listViewAudioRef}
          />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  listHeader: {
    paddingTop: "25%",
  },
  list: {
    paddingTop: Platform.OS === "android" ? 16 : 0,
    justifyContent: "center",
  },
  headerTitle: {
    marginTop: "15%",
    fontFamily: "Audiowide",
    fontSize: 20,
    justifySelf: "center",
    alignSelf: "center",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    opacity: "center",
    zIndex: "-1",
  },
});
