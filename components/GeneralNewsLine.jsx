import { View, Text, StyleSheet } from "react-native";

export default function GeneralNewsLine({ data }) {
  return (
    <View style={styles.lineItemContainer}>
      <Text style={styles.lineItem}>{data.item.title}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  lineItem: {
    justifySelf: "center",
    alignSelf: "start",
    color: "blue",
    textAlign: "left",
  },
  lineItemContainer: {
    marginVertical: 8,
    paddingHorizontal: 24,
  },
});
