import {
  Animated,
  StyleSheet,
  View,
  Text,
  Platform,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { useLayoutEffect, useEffect, useState, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as news from "../utils/gnews";
import TechGridTile from "../components/TechGridTile";
import * as colors from "../assets/colors/primaryColors";

export default function MobileNewsScreen({
  techNews,
  yOffset,
  setMobileNews,
  listViewMobileRef,
  isLoading,
  setIsLoading,
  isDarkMode,
  setShowNavBar,
}) {
  const [refreshing, setRefreshing] = useState(false);
  const [offset, setOffset] = useState(0);
  const [scrollingDirection, setScrollingDirection] = useState("");
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
      const techNews = await news.getMobileNews();
      setMobileNews([...techNews.reverse()]);
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
                : colors.colors.backgroundLightMode,
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
                    {
                      listener: (event) => {
                        let currentOffset = event.nativeEvent.contentOffset.y;
                        let direction = currentOffset > offset ? "down" : "up";
                        setOffset(currentOffset);
                        setScrollingDirection(direction);
                        scrollingDirection === "down" && offset > 400
                          ? setShowNavBar(false)
                          : null;
                        if (scrollingDirection === "up" || offset < 200) {
                          setShowNavBar(true);
                        }
                        console.log(direction);
                      },
                      useNativeDriver: true,
                    }
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
            ref={listViewMobileRef}
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
