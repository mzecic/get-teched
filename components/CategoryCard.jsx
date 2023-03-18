import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ImageBackground,
} from "react-native";
import GeneralNewsLine from "./GeneralNewsLine";
import primaryColors from "../assets/colors/primaryColors";

export default function CategoryCard({
  news,
  playSound,
  isDarkMode,
  lastVisitedScreen,
  title,
}) {
  return (
    <View
      style={[
        styles.mainContainer,
        {
          backgroundColor: isDarkMode
            ? primaryColors.colors.backgroundDarkMode
            : primaryColors.colors.backgroundLightMode,
        },
      ]}
    >
      <View
        style={[
          styles.cardTitleContainer,
          {
            borderColor: isDarkMode ? primaryColors.colors.grey : "black",
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

      {news.slice(0, 5).map((article, index) => {
        return (
          <View
            key={article._id}
            style={[
              styles.titleContainer,
              {
                borderColor: isDarkMode ? primaryColors.colors.grey : "black",
                borderBottomWidth: index !== 4 ? 1 : 0,
              },
            ]}
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
              {article.title}
            </Text>
            <ImageBackground
              style={{
                height: "100%",
                opacity: 0.3,
                zIndex: -1,
                borderRadius: index === 4 ? 16 : 0,
              }}
              source={{ uri: article.image }}
            ></ImageBackground>
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
    marginVertical: 64,
    marginHorizontal: "3.25%",
    borderRadius: 16,
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
    fontSize: 30,
    fontFamily: "Display",
  },
  titleContainer: {
    height: 90,
  },
  titleText: {
    fontFamily: "Display",
    fontSize: 16,
    zIndex: 200,
    padding: 12,
    position: "absolute",
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
});
