import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons, Feather } from "@expo/vector-icons";

const SignUpScreen = () => {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

        <TouchableOpacity style={styles.button} onPress={onCreateAccount}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/login/signUp")}>
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



// import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
// import React, { useState } from "react";
// import { StyleSheet } from "react-native";
// import { useRouter } from "expo-router";

// export default function signIn() {
//   const router = useRouter();
//   return (
//     <View
//       style={{
//         padding: 25,
//       }}
//     >
//       <Text style={styles.textheader}>Sign-In</Text>
//       <Text style={styles.subheader}>Welcome back...!</Text>
//         <View
//           style={{
//             marginTop: 28,
//           }}
//         >
//           <Text>email</Text>
//           <TextInput
//             placeholder="email"
//             style={styles.input}
//           />
//         </View>
//         <View
//           style={{
//             marginTop: 18,
//           }}
//         >
//           <Text>password</Text>
//           <TextInput
//             placeholder="password"
//             secureTextEntry={true}
//             style={styles.input}
//           />
//         </View>
//         <TouchableOpacity 
//         >
//           <Text
//             style={styles.button}
//             onPress={()=>router.push('/(tabs)/index')}
//           >
//             Sign In
//           </Text>
//         </TouchableOpacity>
//         <TouchableOpacity>
//           <Text
//             style={styles.Createbutton}
//             onPress={() => router.push("/login/signUp")}
//           >
//             Create Account
//           </Text>
//         </TouchableOpacity>
//     </View>
//   );
// }

// export const styles = StyleSheet.create({
//   textheader: {
//     fontSize: 35,
//     fontWeight: "bold",
//     color: "black",
//     textAlign: "center",
//     marginTop: 20,
//   },
//   subheader: {
//     fontSize: 35,
//     fontWeight: "bold",
//     color: 'gray',
//     textAlign: "center",
//     marginTop: 20,
//   },
//   input: {
//     height: 40,
//     borderWidth: 1,
//     borderColor: "gray",
//     borderRadius: 10,
//     marginTop: 12,
//     alignItems: "center",
//     backgroundColor: "white",
//   },
//   button: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "white",
//     textAlign: "center",
//     backgroundColor: 'gray',
//     padding: 10,
//     borderRadius: 10,
//     margin: 30,
//   },
//   Createbutton: {
//     fontSize: 20,
//     fontWeight: "light",
//     color: "black",
//     textAlign: "center",
//     padding: 10,
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: 'gray',
//     marginTop: 5,
//     marginBottom: 10,
//     marginLeft: 30,
//     marginRight: 30,
//   },
 
// });
