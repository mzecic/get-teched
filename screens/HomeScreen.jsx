import { Animated, FlatList, StyleSheet, View, Text } from "react-native";
import { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import TechGridTile from "../components/TechGridTile";

export default function HomeScreen({ techNews, yOffset, headerOpacity }) {
  function renderTechItem(itemData) {
    // function pressHandler() {
    //   navigation.navigate("MealsOverview", {
    //     categoryId: itemData.item.id,
    //   });
    // }
    return <TechGridTile data={itemData} />;
  }
  const navigation = useNavigation();

  function scrollHandler() {}

  useLayoutEffect(() => {
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
            <Text style={styles.headerTitle}>GetTeched</Text>
          </Animated.View>
        </>
      ),
      headerTransparent: true,
    });
  }, [headerOpacity, navigation]);

  return (
    <View style={styles.list}>
      <Animated.FlatList
        onMomentumScrollBegin={scrollHandler}
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
          { useNativeDriver: true }
        )}
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
  list: {
    marginTop: "25%",
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
