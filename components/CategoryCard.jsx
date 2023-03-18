import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import primaryColors from "../assets/colors/primaryColors";
import * as WebBrowser from "expo-web-browser";

export default function CategoryCard({
  news,
  playSound,
  isDarkMode,
  lastVisitedScreen,
  setLastVisitedScreen,
  title,
  navigation,
}) {
  return (
    <View
      style={[
        styles.mainContainer,
        {
          backgroundColor: isDarkMode
            ? primaryColors.colors.black
            : primaryColors.colors.white,
          shadowColor: isDarkMode
            ? primaryColors.colors.white
            : primaryColors.colors.black,
          shadowOpacity: 0.25,
          shadowOffset: { width: 1, height: 0 },
          shadowRadius: 8,
          overflow: Platform.OS === "android" ? "hidden" : "visible",
          marginTop: title === "Gaming" ? "3.5%" : "6%",
        },
      ]}
    >
      <Pressable
        style={({ pressed }) => [pressed ? styles.buttonPressed : null]}
        onPress={() => {
          navigation.navigate(`${title}NewsScreen`);
          setLastVisitedScreen(`${title}NewsScreen`);
        }}
      >
        <View
          style={[
            styles.cardTitleContainer,
            {
              borderColor: isDarkMode
                ? primaryColors.colors.grey
                : primaryColors.colors.lighterGrey,
            },
          ]}
        >
          <Text
            style={[
              styles.cardTitle,
              {
                color: isDarkMode
                  ? primaryColors.colors.white
                  : primaryColors.colors.black,
              },
            ]}
          >
            {title}
          </Text>
          <View
            style={[
              styles.forwardArrow,
              {
                borderTopColor: isDarkMode
                  ? primaryColors.colors.white
                  : primaryColors.colors.black,
                borderRightColor: isDarkMode
                  ? primaryColors.colors.white
                  : primaryColors.colors.black,
              },
            ]}
          ></View>
        </View>
      </Pressable>

      {news.slice(0, 5).map((article, index) => {
        return (
          <View
            key={article._id}
            style={[
              styles.titleContainer,
              {
                backgroundColor: isDarkMode
                  ? primaryColors.colors.black
                  : primaryColors.colors.white,
                borderColor: isDarkMode
                  ? primaryColors.colors.grey
                  : primaryColors.colors.lighterGrey,
                borderBottomWidth: index !== 4 ? 1 : 0,
              },
            ]}
          >
            <Pressable
              style={({ pressed }) => [
                styles.pressableContainer,
                pressed ? styles.buttonPressed : null,
              ]}
              onPress={async function () {
                console.log("Pressed");
                let result = await WebBrowser.openBrowserAsync(article.url);
                return result;
              }}
            >
              <Text
                style={[
                  styles.titleText,
                  {
                    color: isDarkMode
                      ? primaryColors.colors.white
                      : primaryColors.colors.black,
                  },
                ]}
              >
                {article.title.length > 50
                  ? article.title.slice(0, 51) + "..."
                  : article.title}
              </Text>
              <Image
                style={{
                  width: 65,
                  height: 65,
                  borderRadius: 16,
                }}
                source={{ uri: article.image }}
              />
            </Pressable>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
    marginHorizontal: "2.5%",
    borderRadius: 16,
    padding: 18,
  },
  cardTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 65,
    padding: 12,
    borderBottomWidth: 1,
  },
  cardTitle: {
    fontSize: 26,
    fontFamily: "OswaldBold",
  },
  pressableContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 6,
  },
  titleContainer: {
    height: 90,
    marginVertical: 6,
    borderBottomEndRadius: 16,
    borderBottomLeftRadius: 16,
  },
  titleText: {
    width: "70%",
    fontFamily: "OswaldMedium",
    fontSize: 15,
    zIndex: 200,
    padding: 12,
  },
  forwardArrow: {
    width: 14,
    height: 14,
    margin: 8,
    borderTopWidth: 2.5,
    borderRightWidth: 2.5,
    borderColor: "Black",
    borderTopColor: "#007AFF",
    borderRightColor: "#007AFF",
    transform: [{ rotate: "45deg" }],
  },
  buttonPressed: {
    opacity: 0.5,
  },
});
