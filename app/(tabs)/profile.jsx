import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const Profile = ({ onEditPress }) => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  async function getData() {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.error("Token not found!");
        return;
      }
      console.log("Retrieved Token:", token);


      const res = await axios.post("http://localhost:5001/userdata", { token });  // ⬅️ Replace X.X with your local IP
      console.log("API Response:", JSON.stringify(res.data, null, 2));
      console.log("User Data:", res.data);
      console.log("Full Response Data:", res.data);
    //   console.log(userData.userName);

      if (res.data.status === "ok") {
        setUserData(res.data.data);
      } else {
        console.error("Error:", res.data.message);
      }
    } catch (error) {
      console.error("API Error:", error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    console.log("Updated userData:", userData);
    getData();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Image
        source={userData?.photo ? { uri: userData.photo } : require("../../assets/images/icon.png")}
        style={styles.profileImage}
      />

      <Text style={styles.name}>{userData?.userName || "User Name"}</Text>
      <Text style={styles.email}>{userData?.email || "your.email@example.com"}</Text>

      <TouchableOpacity style={styles.editButton} onPress={onEditPress}>
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
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
});

export default Profile;
