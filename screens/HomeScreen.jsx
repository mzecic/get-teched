import { FlatList, StyleSheet, View } from "react-native";

import TechGridTile from "../components/TechGridTile";

export default function HomeScreen({ techNews }) {
  function renderTechItem(itemData) {
    // function pressHandler() {
    //   navigation.navigate("MealsOverview", {
    //     categoryId: itemData.item.id,
    //   });
    // }
    return <TechGridTile data={itemData} />;
  }
  return (
    <View style={styles.list}>
      <FlatList
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
