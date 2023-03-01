import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Image,
  TextInput,
  Platform,
} from "react-native";
import filter from "lodash.filter";
import { useState, useEffect } from "react";
import * as news from "../utils/gnews";
import GeneralNewsLine from "../components/GeneralNewsLine";
import primaryColors from "../assets/colors/primaryColors";

export default function SearchScreen({
  allNews,
  setAllNews,
  isDarkMode,
  lastVisitedScreen,
}) {
  const [query, setQuery] = useState("");
  useEffect(function () {
    (async function () {
      const techNews = await news.getTechNews();
      const gamingNews = await news.getGamingNews();
      const audioNews = await news.getAudioNews();
      const mobileNews = await news.getMobileNews();
      const generalNews = await news.getGeneralNews();
      setAllNews([
        ...techNews.reverse(),
        ...gamingNews.reverse(),
        ...audioNews.reverse(),
        ...mobileNews.reverse(),
        ...generalNews.reverse(),
      ]);
      console.log(allNews);
    })();
  }, []);

  function renderTechItem(itemData) {
    return (
      <GeneralNewsLine
        isDarkMode={isDarkMode}
        lastVisitedScreen={lastVisitedScreen}
        data={itemData}
      />
    );
  }
  function renderHeader() {
    return (
      <View
        style={{
          backgroundColor: isDarkMode
            ? primaryColors.colors.black
            : primaryColors.colors.white,
          padding: Platform.OS === "android" ? 5 : 10,
          marginTop: "20%",
          borderRadius: 20,
          marginHorizontal: "5%",
          elevation: 4,
        }}
      >
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="always"
          value={query}
          onChangeText={(queryText) => handleSearch(queryText)}
          placeholder="Search"
          placeholderTextColor={
            isDarkMode ? primaryColors.colors.white : primaryColors.colors.black
          }
          style={{ paddingHorizontal: 20 }}
        />
      </View>
    );
  }
  return (
    <View
      style={[
        styles.mainContainer,
        {
          backgroundColor: isDarkMode
            ? primaryColors.colors.backgroundDarkMode
            : primaryColors.colors.white,
        },
      ]}
    >
      <View style={styles.list}>
        <FlatList
          ListHeaderComponent={renderHeader}
          data={[...allNews]}
          renderItem={renderTechItem}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {},
});
