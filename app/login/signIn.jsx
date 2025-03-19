import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const SignUpScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit() {
    console.log(email, password);
      if (!email || !password ) {
        Alert.alert("Please fill all fields");
        return;
      }
    const userData = {
      email: email,
      password,
    }
    axios.post('http://192.168.143.169:5001/login', userData).then(res=>
    {console.log(res.data);
      if (res.data.status =="ok"){
        Alert.alert('sign in successfull');
        AsyncStorage.setItem('token',res.data.token);
        router.push("/allNotes");
        
      }
    })
  }

  const onCreateAccount = () => {
    if (!email || !password || !userName) {
      Alert.alert("Please fill all fields");
      return;
    }
    router.push("/(tabs)/index");
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
      <Text style={styles.subheader}>Good to see you again..!</Text>
        <Text style={styles.title}>Sign-In</Text>
        <View style={styles.inputContainer}>
          <MaterialIcons name="person-outline" size={20} color="#4b3f96" style={styles.icon} />
          <TextInput 
            placeholder="Email" 
            style={styles.inputField} 
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.inputContainer}>
          <Feather name="lock" size={20} color="#4b3f96" style={styles.icon} />
          <TextInput 
            placeholder="Password" 
            style={styles.inputField} 
            secureTextEntry 
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={()=>handleSubmit()}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/login/signUp")}>
          <Text style={styles.Createbutton}>Don't have an account? Sign Up</Text>
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
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#fff",
    width: "100%",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  inputField: {
    flex: 1,
    height: 50,
    fontSize: 16,
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