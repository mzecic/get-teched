import {
  Animated,
  StyleSheet,
  View,
  Text,
  Platform,
  RefreshControl,
} from "react-native";
import { useLayoutEffect, useEffect, useCallback, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import * as news from "../utils/gnews";

import TechGridTile from "../components/TechGridTile";

export default function AudioNewsScreen({
  techNews,
  yOffset,
  headerOpacity,
  setAudioNews,
}) {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, []);
  function renderTechItem(itemData) {
    return <TechGridTile data={itemData} />;
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
              <Text style={styles.headerTitle}>Audio News</Text>
            </Animated.View>
          </>
        ),
        headerTransparent: true,
      });
    }
  }, [headerOpacity, navigation]);

  useEffect(function () {
    (async function () {
      const techNews = await news.getAudioNews();
      setAudioNews([...techNews.articles]);
    })();
  }, []);

  return (
    <View style={styles.list}>
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
      />
    </View>
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
    fontSize: 24,
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
