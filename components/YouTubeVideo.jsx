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

  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
    Dimensions.get("window");

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  return (
    <Pressable
      onPress={() => {
        if (!playing) {
          setPlaying(true);
        }
      }}
    >
      <View style={styles.videoContainer}>
        <YoutubePlayer
          allow="fullscreen"
          onReady={togglePlaying}
          height={SCREEN_HEIGHT}
          width={SCREEN_WIDTH}
          play={playing}
          videoId={item.id}
          webViewProps={{
            injectedJavaScript: `
            var element = document.getElementsByClassName('container')[0];
            element.style.position = 'unset';
            element.style.padding = 0;
            element.style.margin = 0;
          `,
          }}
          // onChangeState={onStateChange}
          onChangeState={(event) => {
            if (event === "paused") {
              setPlaying(false);
            }
          }}
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
    </Pressable>
  );
}

const styles = StyleSheet.create({
  videoContainer: {
    // height: 300,
  },
});
