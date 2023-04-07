import YoutubePlayer from "react-native-youtube-iframe";
import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useState, useCallback, useEffect, useRef } from "react";

export default function YouTubeVideo({
  storedCredentials,
  item,
  focusedIndex,
}) {
  const [playing, setPlaying] = useState(
    item.index === focusedIndex ? true : false
  );
  const playerRef = useRef();

  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
    Dimensions.get("window");

  useEffect(
    function () {
      if (focusedIndex === item.index) {
        setPlaying(true);
      } else {
        setPlaying(false);
      }
      (async function () {
        const currentTime = await playerRef.current?.getCurrentTime();
        if (currentTime > 0) {
          playerRef.current.seekTo(0);
        }
      })();
    },
    [focusedIndex]
  );

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  return (
    <>
      <Pressable
        style={{
          height: SCREEN_HEIGHT,
          width: SCREEN_WIDTH,
          zIndex: 503,
          opacity: 0,
          position: "absolute",
        }}
        onPress={() => {
          togglePlaying();
          console.log("pressed");
          if (playing) {
            setPlaying(false);
          }
        }}
      >
        <View
          style={{
            position: "absolute",
            height: SCREEN_HEIGHT,
            width: SCREEN_WIDTH,
            backgroundColor: "black",
            zIndex: 502,
          }}
        ></View>
      </Pressable>
      {/* <SafeAreaView> */}
      <View
        pointerEvents="none"
        style={[
          styles.videoContainer,
          { paddingTop: 0.05 * SCREEN_HEIGHT, backgroundColor: "black" },
        ]}
      >
        <View
          style={{
            height: 50,
            width: 100,
            position: "absolute",
            top: 0.05 * SCREEN_HEIGHT,
            right: 10,
            backgroundColor: "black",
            zIndex: 506,
          }}
        ></View>
        <YoutubePlayer
          ref={playerRef}
          initialPlayerParams={{ controls: false }}
          allow="autoplay"
          // onReady={() =>
          //   focusedIndex === item.index ? setPlaying(true) : null
          // }
          height={0.95 * SCREEN_HEIGHT}
          width={SCREEN_WIDTH}
          play={playing}
          videoId={item.item.id}
          webViewProps={{
            injectedJavaScript: `
            var element = document.getElementsByClassName('container')[0];
            element.style.position = 'unset';
            element.style.padding = 0;
            element.style.margin = 0;
            true;`,
          }}
          onChangeState={onStateChange}
          // onChangeState={(event) => {
          //   if (event === "paused") {
          //     setPlaying(false);
          //   }
          // }}
        />
        <View
          style={{
            backgroundColor: "black",
            bottom: 0,
            // height: 0.13 * SCREEN_HEIGHT,
            height: 78,
            width: "100%",
            position: "absolute",
            zIndex: 505,
          }}
        ></View>
        {/* <TouchableOpacity
          style={{
            backgroundColor: "black",
            bottom: 0,
            height: 0.05 * SCREEN_HEIGHT,
            width: "100%",
            position: "absolute",
          }}
        /> */}
      </View>
      {/* </SafeAreaView> */}
    </>
  );
}

const styles = StyleSheet.create({
  videoContainer: {
    flex: 1,
  },
});
