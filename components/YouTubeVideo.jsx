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
import * as yTubeApi from "../utils/youtube-api";

export default function YouTubeVideo({ storedCredentials }) {
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
    <View>
      <YoutubePlayer
        height={300}
        play={playing}
        videoId={"iee2TATGMyI"}
        onChangeState={onStateChange}
      />
      <Pressable
        onPress={() => {
          (async function () {
            const result = await yTubeApi.getYouTubeList();
            console.log(result);
          })();
        }}
      >
        <Image
          source={
            !playing
              ? require("../assets/play-icon.png")
              : require("../assets/pause-icon.png")
          }
        />
      </Pressable>
    </View>
  );
}
