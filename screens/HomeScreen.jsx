import { Animated, FlatList, StyleSheet, View } from "react-native";
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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        opacity: headerOpacity,
      },
      headerBackground: () => (
        <Animated.View
          style={{
            backgroundColor: "white",
            ...StyleSheet.absoluteFillObject,
            opacity: headerOpacity,
          }}
        />
      ),
      headerTransparent: true,
    });
  }, [headerOpacity, navigation]);

  return (
    <View style={styles.list}>
      <Animated.FlatList
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
        onMomentumScrollEnd={navigation.setOptions({
          headerTransparent: false,
        })}
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
    justifyContent: "center",
  },
});
