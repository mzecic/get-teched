import { View, Text, StyleSheet, Dimensions, Pressable } from "react-native";

export default function AppDrawer() {
  const windowWidth = Dimensions.get("window").width;
  return (
    <View
      style={[
        styles.mainContainer,
        {
          width: 0.6 * windowWidth,
        },
      ]}
    >
      <View style={styles.itemsContainer}>
        <Pressable
          onPress={() => {
            console.log(windowWidth);
          }}
        >
          <Text>App Drawer</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "yellow",
    top: 0,
    right: 0,
    height: "100%",
    position: "absolute",
    zIndex: 500,
    transform: [{ translateX: 0 }],
  },
  itemsContainer: {
    marginTop: "30%",
  },
});
