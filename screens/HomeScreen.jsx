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
  setShowNavBar,
  offset,
  setOffset,
  scrollingDirection,
  setScrollingDirection,
  hidePoint,
  setHidePoint,
  lastOffset,
  setLastOffset,
  user,
  token,
  storedCredentials,
  setIsMenu,
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

  // useLayoutEffect(() => {
  //   if (Platform.OS === "ios") {
  //     navigation.setOptions({
  //       headerBackground: () => (
  //         <>
  //           <TouchableOpacity onPress={() => console.log("Pressing")}>
  //             <Animated.View
  //               style={{
  //                 height: 80,
  //                 backgroundColor: isDarkMode
  //                   ? colors.colors.black
  //                   : colors.colors.backgroundLightMode,
  //                 ...StyleSheet.absoluteFillObject,
  //                 // opacity: headerOpacity,
  //                 borderBottomLeftRadius: 16,
  //                 borderBottomRightRadius: 16,
  //                 transform: [
  //                   {
  //                     translateY:
  //                       scrollingDirection === "down" && offset > 5
  //                         ? headerOpacity
  //                         : 0,
  //                   },
  //                 ],
  //               }}
  //             >
  //               <Text
  //                 style={[
  //                   styles.headerTitle,
  //                   {
  //                     color: isDarkMode
  //                       ? colors.colors.white
  //                       : colors.colors.black,
  //                   },
  //                 ]}
  //               >
  //                 GetTeched
  //               </Text>
  //             </Animated.View>
  //           </TouchableOpacity>
  //         </>
  //       ),
  //       headerTransparent: true,
  //     });
  //   }
  // }, [headerOpacity, navigation]);

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
        // console.log(token);
        // console.log(user);
        console.log(storedCredentials);
        setTimeout(function () {
          setIsLoading(false);
        }, 750);
        setTimeout(function () {
          SplashScreen.hideAsync();
        }, 1500);
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
          <Animated.View
            style={{
              paddingTop: 36,
              zIndex: 200,
              width: "100%",
              height: 85,
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
              onPress={() => {
                console.log("Pressed");
                navigation.navigate("ProfileScreen");
                setIsMenu(true);
              }}
              style={{
                position: "absolute",
                right: 16,
                bottom: 8,
                zIndex: 200,
              }}
            >
              <View>
                <Image
                  style={{ width: 35, height: 35, borderRadius: 50 }}
                  source={{ uri: storedCredentials.picture }}
                ></Image>
              </View>
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
                    console.log(lastOffset);
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
