import YoutubePlayer from "react-native-youtube-iframe";
import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useState, useCallback } from "react";

export default function YouTubeVideo({ storedCredentials, item }) {
  const [playing, setPlaying] = useState(false);

  const screenHeight = Dimensions.get("window").height;

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  return (
    <View style={styles.videoContainer}>
      <YoutubePlayer
        height={screenHeight}
        // play={playing}
        videoId={item.id}
        // onChangeState={onStateChange}
      />
      {/* <Pressable onPress={() => {}}>
        <Image
          source={
            !playing
              ? require("../assets/play-icon.png")
              : require("../assets/pause-icon.png")
          }
        />
      </Pressable> */}
    </View>
  );
}

const styles = StyleSheet.create({
  videoContainer: {
    flex: 1,
    // height: 300,
  },
});
