import { Animated, StyleSheet, View, Text, Platform } from "react-native";
import { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import TechGridTile from "../components/TechGridTile";

export default function GamingNewsScreen({ techNews, yOffset, headerOpacity }) {
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
                backgroundColor: "white",
                ...StyleSheet.absoluteFillObject,
                opacity: headerOpacity,
              }}
            >
              <Text style={styles.headerTitle}>Gaming News</Text>
            </Animated.View>
          </>
        ),
        headerTransparent: true,
      });
    }
  }, [headerOpacity, navigation]);

  return (
    <View style={styles.list}>
      <Animated.FlatList
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
