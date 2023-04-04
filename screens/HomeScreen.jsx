import {
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
import Animated, { runOnUI, runOnJS } from "react-native-reanimated";

import * as SplashScreen from "expo-splash-screen";
import * as colors from "../assets/colors/primaryColors";
import { FlatList } from "react-native-gesture-handler";
import * as yTubeApi from "../utils/youtube-api";

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
  offsetY,
  setOffsetY,
  offset,
  hidePoint,
  setHidePoint,
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
  headerHeight,
  scrollHandler,
  animatedHeaderStyle,
  setShortsFeed,
}) {
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(async function () {
      setRefreshing(false);
    }, 500);
  }, []);
  const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

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
        // const shorts = await yTubeApi.getYouTubeList();
        // setShortsFeed(shorts.items.map((short) => short.id.videoId));
        // console.log(shorts.items.map((short) => short.id.videoId));
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
        <>
          <HeaderBar
            lastVisitedScreen={lastVisitedScreen}
            animatedHeaderStyle={animatedHeaderStyle}
            yOffset={yOffset}
            headerHeight={headerHeight}
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
              onScroll={scrollHandler}
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
            />
          </View>
        </>
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
