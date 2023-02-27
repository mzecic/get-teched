import {
  Animated,
  StyleSheet,
  View,
  Text,
  Platform,
  RefreshControl,
  FlatList,
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
  setIsGeneralVisible,
}) {
  const [refreshing, setRefreshing] = useState(false);

  let yScroll = useRef(null);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, []);

  function renderTechItem(itemData) {
    return (
      <TechGridTile
        isGeneralVisible={isGeneralVisible}
        data={itemData}
        lastVisitedScreen={lastVisitedScreen}
      />
    );
  }

  function renderGeneralTechItem(itemData) {
    return <GeneralNewsLine data={itemData} />;
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
                backgroundColor: "#E6E6E6",
                ...StyleSheet.absoluteFillObject,
                opacity: headerOpacity,
              }}
            >
              <Text style={styles.headerTitle}>GetTeched</Text>
            </Animated.View>
          </>
        ),
        headerTransparent: true,
      });
    }
  }, [headerOpacity, navigation]);

  useEffect(function () {
    (async function () {
      const techNews = await news.getTechNews();
      setTechNews([...techNews.reverse()]);
      const generalNews = await news.getGeneralNews();
      let result = [...generalNews.reverse().splice(0, 4)];
      setGeneralNews([...result]);
      console.log(result);
    })();
  }, []);

  return (
    <>
      {isGeneralVisible ? (
        <Animated.View
          style={{
            paddingTop: "30%",
            marginHorizontal: "auto",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FlatList
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            data={generalNews}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderGeneralTechItem}
          />
        </Animated.View>
      ) : (
        <></>
      )}

      <View style={styles.list} onLayout={onLayoutRootView}>
        <Animated.FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
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
              listener: (e) => {
                console.log(headerOpacity);
                yScroll.current = e.nativeEvent.contentOffset.y;
                if (yScroll.current > 150) {
                  setIsGeneralVisible(false);
                } else {
                  setIsGeneralVisible(true);
                }
              },
              useNativeDriver: true,
            }
          )}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={techNews}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderTechItem}
          ref={listViewRef}
          // onScrollBeginDrag={(e) => {
          //   const y = e.nativeEvent.contentOffset.y;
          //   if ((y) => 10) {
          //     setIsGeneralVisible(false);
          //   } else {
          //     setIsGeneralVisible(true);
          //   }
          //   console.log(y);
          // }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  listHeader: {
    paddingTop: "25%",
  },
  generalNews: {},
  list: {
    flex: 1,
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
