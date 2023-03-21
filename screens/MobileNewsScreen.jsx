import {
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
import Animated from "react-native-reanimated";

export default function MobileNewsScreen({
  techNews,
  yOffset,
  setMobileNews,
  listViewMobileRef,
  isLoading,
  setIsLoading,
  isDarkMode,
  setShowNavBar,
  offset,
  setOffset,
  scrollingDirection,
  setScrollingDirection,
  refreshing,
  setRefreshing,
  playSound,
}) {
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, []);
  function renderTechItem(itemData) {
    return (
      <TechGridTile
        playSound={playSound}
        isDarkMode={isDarkMode}
        data={itemData}
      />
    );
  }
  const navigation = useNavigation();

  useEffect(
    function () {
      (async function () {
        if (!refreshing) {
          setIsLoading(true);
        }
        const techNews = await news.getMobileNews();
        setMobileNews([...techNews.reverse()]);
        setTimeout(function () {
          setIsLoading(false);
        }, 500);
      })();
    },
    [refreshing]
  );

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
                ? colors.colors.black
                : colors.colors.backgroundLightMode,
            },
          ]}
        >
          <Animated.FlatList
            bounces={false}
            refreshControl={
              <RefreshControl
                tintColor={
                  isDarkMode ? colors.colors.white : colors.colors.black
                }
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
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
    padding: "2.5%",
  },
  headerTitle: {
    marginTop: "15%",
    fontFamily: "Audiowide",
    fontSize: 20,
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
