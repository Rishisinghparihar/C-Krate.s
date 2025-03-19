import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useNavigation, useRouter } from "expo-router";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather'; 
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const SignUpScreen = () => {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  function handleSubmit(){
    if (!email || !password || !userName) {
      Alert.alert("Please fill all fields");
      return;
    }
    const userData = {
      userName: userName,
      email: email,
      password: password
    }
    axios.post('http://192.168.143.169:5001/register', userData) .then(res=> AsyncStorage.setItem("token",res.data.token)) .catch(e=> console.log(e)); //change localhost:5001 to ipv4 ipconfig of the pc if using on mobile or emulator
    router.push("/allNotes");
  }

  const onhandleSubmit = () => {
    if (!email || !password || !userName) {
      Alert.alert("Please fill all fields");
      return;
    }
    router.push("/(tabs)/index");
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Sign-Up</Text>
        <Text style={styles.subheader}>Hello! buddy, You are new to C-Krate.c </Text>
        
        <View style={styles.inputContainer}>
          <MaterialIcons name="person-outline" size={20} color="#4b3f96" />
          <TextInput 
            placeholder="Enter your full name" 
            style={styles.input} 
            value={userName}
            onChangeText={setUserName}
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialIcons name="email" size={20} color="#4b3f96" />
          <TextInput 
            placeholder="Email" 
            style={styles.input} 
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputContainer}>
          <Feather name="lock" size={20} color="#4b3f96" />
          <TextInput 
            placeholder="Password" 
            style={styles.input} 
            secureTextEntry 
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={()=>handleSubmit()}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/login/signIn")}> 
          <Text style={styles.Createbutton}>Already have an account? Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    marginBottom: 10,
  },
  subheader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "rgb(165, 101, 185)",
    textAlign: "center",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    gap: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#4B3F96",
    width: "100%",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  Createbutton: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "gray",
    marginTop: 10,
    width: "100%",
  },
});

export default SignUpScreen;
