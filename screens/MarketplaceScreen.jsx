import { useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";

import * as ebay from "../utils/eBay-api";

export default function MarketplaceScreen() {
  const [query, setQuery] = useState("");

  async function searchHandler() {
    const result = await ebay.getItem(query);
    console.log(result);
    // ebay.testToken();
  }

  function onChangeText(text) {
    console.log(query);
    setQuery(text);
  }

  return (
    <View style={styles.mainContainer}>
      <Text>Marketplace</Text>
      <TextInput
        onChangeText={(text) => onChangeText(text)}
        value={query}
        placeholder="Search an item..."
      />
      <Pressable onPress={() => searchHandler()}>
        <Text>Search</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
