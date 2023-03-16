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
import TechGridTileBig from "../components/TechGridTileBig";

export default function SearchScreen({
  allNews,
  setAllNews,
  isDarkMode,
  lastVisitedScreen,
  isLoading,
  setIsLoading,
  setShowNavBar,
  playSound,
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
      return (
        article.title.toLowerCase().split(" ").includes(text.toLowerCase()) ||
        article.content.toLowerCase().split(" ").includes(text.toLowerCase())
      );
    });
    setQuery(text);
    setFilteredData(filteredArray);
  };

  function renderTechItem(itemData) {
    if (filteredData.length) {
      if (itemData.index === 0) {
        return (
          <TechGridTileBig
            playSound={playSound}
            isDarkMode={isDarkMode}
            data={itemData}
            lastVisitedScreen={lastVisitedScreen}
          />
        );
      } else {
        return (
          <GeneralNewsLine
            playSound={playSound}
            arrayLength={filteredData.length}
            isDarkMode={isDarkMode}
            lastVisitedScreen={lastVisitedScreen}
            data={itemData}
          />
        );
      }
    }
  }
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
          marginVertical: "5%",
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
      {!query.length ? (
        <View>
          <Text
            style={{
              textAlign: "center",
              margin: 8,
              color: isDarkMode
                ? primaryColors.colors.white
                : primaryColors.colors.black,
            }}
          >
            Type something into the search bar...
          </Text>
        </View>
      ) : (
        <></>
      )}

      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}
        accessible={false}
      >
        <View
          style={[
            styles.mainContainer,
            {
              backgroundColor:
                isDarkMode && filteredData.length
                  ? primaryColors.colors.backgroundDarkMode
                  : isDarkMode
                  ? primaryColors.colors.black
                  : primaryColors.colors.backgroundLightMode,
            },
          ]}
        >
          <View style={styles.list}>
            {!filteredData.length ? (
              <View style={styles.emptyInputView}>
                <View style={styles.logoContainer}>
                  <Text
                    style={{
                      textAlign: "center",
                      fontFamily: "Audiowide",
                      fontSize: 30,
                      color: isDarkMode
                        ? primaryColors.colors.secondaryHighlight
                        : primaryColors.colors.primaryHighlight,
                    }}
                  >
                    GetTeched
                  </Text>
                </View>
              </View>
            ) : (
              <FlatList
                style={{ width: "100%" }}
                data={[...filteredData]}
                renderItem={renderTechItem}
                keyExtractor={(item, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="always"
              />
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyInputView: {
    flex: 1,
    justifyContent: "flex-start",
  },
  logoContainer: {
    marginTop: "60%",
  },
  logoText: {
    fontSize: 30,
  },
});
