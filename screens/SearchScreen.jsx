import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Image,
  TextInput,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
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
  isLoading,
  setIsLoading,
}) {
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  useEffect(function () {
    (async function () {
      setIsLoading(true);
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
      setTimeout(function () {
        setIsLoading(false);
      }, 750);
    })();
  }, []);

  const handleSearch = (text) => {
    const filteredArray = allNews.filter((article) => {
      return article.title.toLowerCase().split(" ").includes(text);
    });
    setQuery(text);
    setFilteredData(filteredArray);
  };

  function renderTechItem(itemData) {
    if (filteredData.length !== 0) {
      return (
        <GeneralNewsLine
          isDarkMode={isDarkMode}
          lastVisitedScreen={lastVisitedScreen}
          data={itemData}
        />
      );
    }
  }
  const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      {" "}
      {children}
    </TouchableWithoutFeedback>
  );
  return (
    <>
      <View
        style={{
          backgroundColor: isDarkMode
            ? primaryColors.colors.backgroundDarkMode
            : primaryColors.colors.white,
          padding: Platform.OS === "android" ? 5 : 10,
          marginTop: "20%",
          borderRadius: 20,
          marginHorizontal: "5%",
          marginVertical: "10%",
          elevation: 4,
          shadowColor: "black",
          shadowOpacity: 0.5,
          shadowOffset: { width: 4, height: 4 },
          shadowRadius: 12,
        }}
      >
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="always"
          defaultValue={query}
          onChangeText={(text) => handleSearch(text)}
          placeholder="Search"
          placeholderTextColor={
            isDarkMode ? primaryColors.colors.white : primaryColors.colors.black
          }
          style={{
            paddingHorizontal: 20,
            color: isDarkMode
              ? primaryColors.colors.white
              : primaryColors.colors.black,
          }}
        />
      </View>

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
          {!filteredData.length ? (
            <Text
              style={{
                color: isDarkMode
                  ? primaryColors.colors.white
                  : primaryColors.colors.black,
              }}
            >
              Type something into the search bar
            </Text>
          ) : (
            <FlatList
              style={{ width: "100%" }}
              //   ListHeaderComponent={renderHeader}
              data={[...filteredData]}
              renderItem={renderTechItem}
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
