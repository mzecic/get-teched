import { View, Text, StyleSheet, Image } from "react-native";

export default function GeneralNewsLine({ data }) {
  return (
    <View style={styles.lineItemContainer}>
      <Text style={styles.lineItem}>{data.item.title}</Text>
      <Image style={styles.image} source={{ uri: data.item.image }} />
    </View>
  );
}
const styles = StyleSheet.create({
  lineItem: {
    // justifySelf: "center",
    // alignSelf: "start",
    color: "blue",
    textAlign: "left",
    width: "75%",
  },
  lineItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    border: "2px solid black",
    borderRadius: 16,
    backgroundColor: "rgb(225, 225, 225)",
    marginHorizontal: 20,
    marginVertical: 8,
  },
  image: {
    width: 75,
    height: 75,
  },
});
