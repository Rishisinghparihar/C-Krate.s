import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", color:"white" }}>Welcome to Notes App</Text>
      <Button title="Go to Notes" onPress={() => router.push("/notes")} />
    </View>
  );
}
