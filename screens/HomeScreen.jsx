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
  TouchableOpacity,
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
import * as profiles from "../utils/users-api";

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
  setLastVisitedScreen,
  listViewRef,
  isGeneralVisible,
  isLoading,
  setIsLoading,
  isDarkMode,
  setIsDarkMode,
  offset,
  setOffset,
  scrollingDirection,
  setScrollingDirection,
  setLastOffset,
  storedCredentials,
  setIsMenu,
  loginType,
  setLoginType,
  setProfile,
  refreshing,
  setRefreshing,
}) {
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(async function () {
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

  useEffect(
    function () {
      (async function () {
        if (!refreshing) {
          setIsLoading(true);
        }
        const techNews = await news.getTechNews();
        setTechNews([...techNews.reverse()]);
        const generalNews = await news.getGeneralNews();
        let result = [...generalNews.reverse().splice(0, 4)];
        setGeneralNews([...result]);
        const getProfile = await profiles.getProfile(storedCredentials.email);
        if (storedCredentials.given_name) setLoginType("google");
        if (storedCredentials.givenName) setLoginType("apple");
        if (getProfile.length) {
          setIsDarkMode(getProfile[0].darkMode);
          setProfile(getProfile[0]);
        }
        setTimeout(function () {
          setIsLoading(false);
        }, 750);
        setTimeout(function () {
          SplashScreen.hideAsync();
        }, 1500);
      })();
    },
    [refreshing, storedCredentials]
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
                ? colors.colors.backgroundDarkMode
                : colors.colors.backgroundLightMode,
            },
          ]}
          onLayout={onLayoutRootView}
        >
          <Animated.View
            style={{
              paddingTop: 46,
              zIndex: 200,
              width: "100%",
              height: 100,
              position: "absolute",
              top: 0,
              alignItems: "center",
              justifyContent: "center",
              borderBottomLeftRadius: 16,
              borderBottomRightRadius: 16,
              backgroundColor: isDarkMode
                ? colors.colors.black
                : colors.colors.white,
              transform: [
                {
                  translateY:
                    scrollingDirection === "down" && offset > 1
                      ? headerOpacity
                      : 0,
                },
              ],
            }}
          >
            <Text
              style={[
                styles.headerTitle,
                {
                  color: isDarkMode ? colors.colors.white : colors.colors.black,
                },
              ]}
            >
              Get Teched
            </Text>
            <Pressable
              onPress={async function () {
                navigation.navigate("ProfileScreen");
                setLastVisitedScreen("ProfileScreen");
                setIsMenu(true);
                const getProfile = await profiles.getProfile(
                  storedCredentials.email
                );
                if (getProfile.length === 0 && loginType === "google") {
                  const createdProfile = await profiles.createProfile({
                    givenName: storedCredentials.given_name,
                    familyName: storedCredentials.family_name,
                    token: storedCredentials.token,
                    darkMode: isDarkMode,
                    email: storedCredentials.email,
                    picture: storedCredentials.picture,
                  });
                  console.log(createdProfile);
                }
              }}
              style={{
                position: "absolute",
                right: 16,
                bottom: 8,
                zIndex: 200,
              }}
            >
              {storedCredentials ? (
                <View>
                  <Image
                    style={{
                      width: 35,
                      height: 35,
                      borderRadius: 50,
                      borderColor: colors.colors.black,
                      borderWidth: 0.3,
                      tintColor:
                        !storedCredentials.picture && isDarkMode
                          ? colors.colors.white
                          : null,
                    }}
                    source={
                      storedCredentials.picture
                        ? { uri: storedCredentials.picture }
                        : require("../assets/profile.png")
                    }
                  ></Image>
                </View>
              ) : (
                <></>
              )}
            </Pressable>
          </Animated.View>
          <Animated.FlatList
            refreshControl={
              <RefreshControl
                tintColor={
                  isDarkMode ? colors.colors.white : colors.colors.black
                }
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
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
                listener: (event) => {
                  let currentOffset = event.nativeEvent.contentOffset.y;
                  let direction = currentOffset > offset ? "down" : "up";
                  setOffset(currentOffset);
                  setScrollingDirection(direction);
                  if (scrollingDirection === "up") {
                    setLastOffset(offset);
                  } else if (scrollingDirection === "down") {
                  }

                  // setHidePoint(scrollingDirection === "up" ? 0 : )
                },
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
    fontFamily: "Audiowide",
    fontSize: 20,
    textAlign: "center",
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
