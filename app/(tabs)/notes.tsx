import { View, Text } from "react-native";

export default function NotesScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", color:"white" }}>Your Notes</Text>
    </View>
  );
}
