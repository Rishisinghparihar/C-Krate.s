import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { ip } from "../lib/ip";

const Profile = ({ onEditPress }) => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [dataStore, setDataStore] = useState([]);
  const router = useRouter();

  async function getData() {
    try {
      const token = await AsyncStorage.getItem("token");
     
      if (!token) {
        console.error("Token not found!");
        return;
      }
      console.log("Retrieved Token:", token);

      const res = await axios.post(`http://192.168.31.157:5001/userdata`, { token });
      console.log("User Data:", ip , res);
      console.log("Full Response Data:", res.data);

      if (res.data.status === "ok") {
        setUserData(res.data.data);
      } else {
        console.error("Error:", res.data.message);
      }
      return res;
    } catch (error) {
      console.error("API Error:", error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const getDataa = async () => {
      console.log("Updated userData:", userData);
      const res = await getData();
    
      console.log("dataStore", res);
    };
    getDataa();
  }, []);

  if (loading) {
    return <Text style={styles.Loading}>Loading...</Text>;
  }

  const onLogout = async () => {
    try {
      await AsyncStorage.clear();
      // AsyncStorage.clear()
      console.log("Token removed, user logged out!");

      Alert.alert("Logout Successful", "You have been logged out.");

      router.push("/login");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Image
          source={
            userData?.photo
              ? { uri: userData.photo }
              : require("../../assets/images/icon.png")
          }
          style={styles.profileImage}
        />

        <Text style={styles.name}>{userData?.userName || "User Name"}</Text>
        <Text style={styles.email}>
          {userData?.email || "your.email@example.com"}
        </Text>

        <TouchableOpacity style={styles.editButton} onPress={onEditPress}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.logoutButtonview}>
        <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
          <Text style={styles.logoutButtonText}>logout </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 5,
    margin: 20,
    marginTop: 200,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  email: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  editButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  logoutButtonview: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 170,
  },
  logoutButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    width: 90,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  Loading:{
    marginTop:70,
    color: "#333",
    justifyContent:"center",
    textAlign: "center",
  }
});

export default Profile;
