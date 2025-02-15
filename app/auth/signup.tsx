import { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";

export default function SignupScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignup = async () => {
    try {
      await axios.post("http://localhost:3000/api/signup", { email, password });
      Alert.alert("Signup Successful", "Please login now.");
      router.push("/auth/login");
    } catch (error) {
      Alert.alert("Signup Failed", "Try a different email.");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Sign Up</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ borderBottomWidth: 1, width: 200, marginVertical: 10 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderBottomWidth: 1, width: 200, marginVertical: 10 }}
      />
      <Button title="Sign Up" onPress={handleSignup} />
      <Button title="Back to Login" onPress={() => router.push("/auth/login")} />
    </View>
  );
}
