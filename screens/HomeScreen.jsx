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
import { useEffect, useCallback, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { Audio } from "expo-av";
import * as news from "../utils/gnews";
import * as profiles from "../utils/users-api";
import SoundEffect from "../assets/pebbles-click.wav";

import HeaderBar from "../components/HeaderBar";
import TechGridTile from "../components/TechGridTile";
import TechGridTileSmall from "../components/TechGridTileSmall";
import TechGridTileBig from "../components/TechGridTileBig";
import GeneralNewsLine from "../components/GeneralNewsLine";
import CategoryCard from "../components/CategoryCard";

import * as SplashScreen from "expo-splash-screen";
import * as colors from "../assets/colors/primaryColors";

export default function HomeScreen({
  techNews,
  gamingNews,
  audioNews,
  mobileNews,
  yOffset,
  headerOpacity,
  setTechNews,
  setGamingNews,
  setAudioNews,
  setMobileNews,
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
  soundEffectsOn,
  setSoundEffectsOn,
  soundHandler,
  playSound,
}) {
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(async function () {
      setRefreshing(false);
    }, 500);
  }, []);

  function renderTechItem(itemData) {
    if (itemData.index >= 0 && itemData.index < 6) {
      if (itemData.index === 0) {
        return (
          <>
            <Text
              style={{
                fontFamily: "OswaldBold",
                fontSize: 30,
                marginHorizontal: "4%",
                marginTop: 112,
                marginBottom: "4%",
                width: "100%",
                color: isDarkMode ? colors.colors.white : colors.colors.black,
              }}
            >
              Top Stories
            </Text>
            <TechGridTileBig
              playSound={playSound}
              isDarkMode={isDarkMode}
              isGeneralVisible={isGeneralVisible}
              data={itemData}
              lastVisitedScreen={lastVisitedScreen}
            />
          </>
        );
      } else if (itemData.index === 1) {
        return (
          <>
            <GeneralNewsLine
              playSound={playSound}
              isDarkMode={isDarkMode}
              lastVisitedScreen={lastVisitedScreen}
              data={itemData}
            />
          </>
        );
      } else if (itemData.index === 4 || itemData.index === 5) {
        return (
          <GeneralNewsLine
            playSound={playSound}
            isDarkMode={isDarkMode}
            lastVisitedScreen={lastVisitedScreen}
            data={itemData}
          />
        );
      } else {
        return (
          <TechGridTileSmall
            playSound={playSound}
            isDarkMode={isDarkMode}
            isGeneralVisible={isGeneralVisible}
            data={itemData}
            lastVisitedScreen={lastVisitedScreen}
          />
        );
      }
    } else if (itemData.index >= 6 && itemData.index < 12) {
      if (itemData.index === 6) {
        return (
          <>
            <Text
              style={{
                fontFamily: "OswaldBold",
                fontSize: 30,
                marginHorizontal: "4%",
                marginTop: 42,
                width: "100%",
                color: isDarkMode ? colors.colors.white : colors.colors.black,
              }}
            >
              General Technology
            </Text>
            <TechGridTile
              playSound={playSound}
              isDarkMode={isDarkMode}
              isGeneralVisible={isGeneralVisible}
              data={itemData}
              lastVisitedScreen={lastVisitedScreen}
            />
          </>
        );
      } else if (itemData.index === 7) {
        return (
          <GeneralNewsLine
            playSound={playSound}
            isDarkMode={isDarkMode}
            isGeneralVisible={isGeneralVisible}
            data={itemData}
            lastVisitedScreen={lastVisitedScreen}
          />
        );
      } else if (itemData.index > 7 < 11) {
        return (
          <TechGridTileSmall
            playSound={playSound}
            isDarkMode={isDarkMode}
            isGeneralVisible={isGeneralVisible}
            data={itemData}
            lastVisitedScreen={lastVisitedScreen}
          />
        );
      }
    } else if (itemData.index === 12) {
      return (
        <CategoryCard
          setLastVisitedScreen={setLastVisitedScreen}
          navigation={navigation}
          title="Gaming"
          playSound={playSound}
          isDarkMode={isDarkMode}
          news={gamingNews}
          lastVisitedScreen={lastVisitedScreen}
        />
      );
    } else if (itemData.index === 17) {
      return (
        <CategoryCard
          setLastVisitedScreen={setLastVisitedScreen}
          navigation={navigation}
          title="Audio"
          playSound={playSound}
          isDarkMode={isDarkMode}
          news={audioNews}
          lastVisitedScreen={lastVisitedScreen}
        />
      );
    } else if (itemData.index === 21) {
      return (
        <CategoryCard
          setLastVisitedScreen={setLastVisitedScreen}
          navigation={navigation}
          title="Mobile"
          playSound={playSound}
          isDarkMode={isDarkMode}
          news={mobileNews}
          lastVisitedScreen={lastVisitedScreen}
        />
      );
    }
    // else {
    //   return (
    //     <TechGridTileSmall
    //       playSound={playSound}
    //       isDarkMode={isDarkMode}
    //       isGeneralVisible={isGeneralVisible}
    //       data={itemData}
    //       lastVisitedScreen={lastVisitedScreen}
    //     />
    //   );
    // }
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
        const gamingNews = await news.getGamingNews();
        setGamingNews([...gamingNews.reverse()]);
        const audioNews = await news.getAudioNews();
        setAudioNews(audioNews);
        const mobileNews = await news.getMobileNews();
        setMobileNews(mobileNews);
        const generalNews = await news.getGeneralNews();
        let result = [...generalNews.reverse().splice(0, 4)];
        setGeneralNews([...result]);
        const getProfile = await profiles.getProfile(storedCredentials.email);
        if (storedCredentials.given_name) setLoginType("google");
        if (storedCredentials.givenName) setLoginType("apple");
        if (getProfile.length) {
          setIsDarkMode(getProfile[0].darkMode);
          setSoundEffectsOn(getProfile[0].soundEffectsOn);
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
                ? colors.colors.black
                : colors.colors.backgroundLightMode,
            },
          ]}
          onLayout={onLayoutRootView}
        >
          {/* <Animated.View
            style={{
              paddingTop: 46,
              zIndex: 200,
              width: "100%",
              height: 100,
              position: "absolute",
              top: 0,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: isDarkMode
                ? colors.colors.black
                : colors.colors.backgroundLightMode,
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
                if (soundEffectsOn) {
                  playSound();
                }
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
                    soundEffectsOn: soundEffectsOn,
                    email: storedCredentials.email,
                    picture: storedCredentials.picture,
                  });
                  console.log(createdProfile);
                } else if (getProfile.length === 0 && loginType === "apple") {
                  const createdProfile = await profiles.createProfile({
                    givenName: storedCredentials.fullName.givenName,
                    familyName: storedCredentials.fullName.familyName,
                    token: storedCredentials.identityToken,
                    darkMode: isDarkMode,
                    soundEffectsOn: soundEffectsOn,
                    email: storedCredentials.email,
                    picture: "",
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
          </Animated.View> */}
          <HeaderBar
            headerTitle={"News"}
            offset={offset}
            headerOpacity={headerOpacity}
            isDarkMode={isDarkMode}
            soundEffectsOn={soundEffectsOn}
            playSound={playSound}
            navigation={navigation}
            setLastVisitedScreen={setLastVisitedScreen}
            setIsMenu={setIsMenu}
            storedCredentials={storedCredentials}
            scrollingDirection={scrollingDirection}
          />
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
                },
                useNativeDriver: true,
              }
            )}
            scrollEventThrottle={16}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={{ flexWrap: "wrap" }}
            numColumns={2}
            data={[
              ...techNews.slice(0, 6),
              ...techNews.slice(6, 12),
              ...gamingNews.slice(12, 17),
              ...audioNews.slice(17, 22),
            ]}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderTechItem}
            ref={listViewRef}
            style={{}}
          />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    paddingHorizontal: "2.5%",
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
