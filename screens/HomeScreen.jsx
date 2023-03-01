import {
  Animated,
  StyleSheet,
  View,
  Text,
  Platform,
  RefreshControl,
  ActivityIndicator,
  Pressable,
  Image,
} from "react-native";
import {
  useLayoutEffect,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import { useNavigation } from "@react-navigation/native";
import * as news from "../utils/gnews";

import TechGridTile from "../components/TechGridTile";
import GeneralNewsLine from "../components/GeneralNewsLine";

import * as SplashScreen from "expo-splash-screen";
import * as colors from "../assets/colors/primaryColors";

export default function HomeScreen({
  techNews,
  yOffset,
  headerOpacity,
  setTechNews,
  setGeneralNews,
  generalNews,
  onLayoutRootView,
  lastVisitedScreen,
  listViewRef,
  isGeneralVisible,
  isLoading,
  setIsLoading,
  isDarkMode,
}) {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, []);

  function renderTechItem(itemData) {
    if (itemData.index >= 0 && itemData.index < 4) {
      return itemData.index === 0 ? (
        <>
          <View
            style={{
              marginTop: Platform.OS === "ios" ? "30%" : "5%",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                paddingLeft: 24,
                fontSize: 16,
                fontWeight: "bold",
                color: isDarkMode ? colors.colors.white : colors.colors.black,
              }}
            >
              Top Stories
            </Text>
            <GeneralNewsLine
              isDarkMode={isDarkMode}
              lastVisitedScreen={lastVisitedScreen}
              data={itemData}
            />
          </View>
        </>
      ) : (
        <GeneralNewsLine
          isDarkMode={isDarkMode}
          lastVisitedScreen={lastVisitedScreen}
          data={itemData}
        />
      );
    } else {
      return (
        <TechGridTile
          isDarkMode={isDarkMode}
          isGeneralVisible={isGeneralVisible}
          data={itemData}
          lastVisitedScreen={lastVisitedScreen}
        />
      );
    }
  }

  const navigation = useNavigation();

  useLayoutEffect(() => {
    if (Platform.OS === "ios") {
      navigation.setOptions({
        headerStyle: {
          opacity: headerOpacity,
        },
        headerBackground: () => (
          <>
            <Animated.View
              style={{
                backgroundColor: isDarkMode ? colors.colors.black : "#E6E6E6",
                ...StyleSheet.absoluteFillObject,
                opacity: headerOpacity,
              }}
            >
              <Text
                style={[
                  styles.headerTitle,
                  {
                    color: isDarkMode
                      ? colors.colors.white
                      : colors.colors.black,
                  },
                ]}
              >
                GetTeched
              </Text>
              <View
                style={{
                  zIndex: 100,
                  position: "absolute",
                }}
              >
                <Pressable
                  onPress={() => {
                    console.log("navigating");
                    navigation.navigate("SearchScreen");
                  }}
                >
                  <View>
                    <Image
                      style={{
                        width: 30,
                        height: 30,
                        tintColor: isDarkMode
                          ? colors.colors.white
                          : colors.colors.black,
                      }}
                      source={require("../assets/search-icon.png")}
                    />
                  </View>
                </Pressable>
              </View>
            </Animated.View>
          </>
        ),
        headerTransparent: true,
      });
    }
  }, [headerOpacity, navigation]);

  useEffect(function () {
    (async function () {
      setIsLoading(true);
      const techNews = await news.getTechNews();
      setTechNews([...techNews.reverse()]);
      const generalNews = await news.getGeneralNews();
      let result = [...generalNews.reverse().splice(0, 4)];
      setGeneralNews([...result]);
      setTimeout(function () {
        setIsLoading(false);
      }, 750);
      setTimeout(function () {
        SplashScreen.hideAsync();
      }, 1500);
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
              ? colors.colors.backgroundDarkMode
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
          onLayout={onLayoutRootView}
        >
          <Animated.FlatList
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            onScroll={Animated.event(
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
                useNativeDriver: true,
              }
            )}
            scrollEventThrottle={16}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={[...generalNews, ...techNews]}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderTechItem}
            ref={listViewRef}
          />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 0 : 0,
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
