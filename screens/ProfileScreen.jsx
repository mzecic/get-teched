import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, Pressable, SafeAreaView } from "react-native";

export default function ProfileScreen({ lastVisitedScreen, setIsMenu }) {
  const navigation = useNavigation();

  return (
    <>
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.backButton}>
          <Pressable
            onPress={() => {
              navigation.navigate(lastVisitedScreen);
              setIsMenu(false);
            }}
          >
            <Text style={styles.backButtonText}>Back</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  backButton: {
    margin: 16,
  },
  backButtonText: {
    fontSize: 16,
    color: "blue",
  },
});
