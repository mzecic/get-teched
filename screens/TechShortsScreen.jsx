import { View, Text, StyleSheet } from "react-native";
import YouTubeVideo from "../components/YouTubeVideo";
import { useState } from "react";

export default function TechSchortsScreen({ storedCredentials }) {
  const [shortsFeed, setShortsFeed] = useState([]);

  return (
    <View style={styles.mainContainer}>
      <YouTubeVideo storedCredentials={storedCredentials} />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {},
});
