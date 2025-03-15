import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const Profile = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{ uri: "https://via.placeholder.com/150" }}
      />
      <Text style={styles.name}>Rishi Parihar</Text>
      <Text style={styles.title}>Frontend Developer | React & Next.js</Text>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.followBtn}>
          <Text style={styles.btnText}>Follow</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.messageBtn}>
          <Text style={styles.btnText}>Message</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    margin: 20,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "#007bff",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    color: "#333",
  },
  title: {
    fontSize: 14,
    color: "#666",
  },
  actions: {
    flexDirection: "row",
    marginTop: 15,
  },
  followBtn: {
    backgroundColor: "#007bff",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    marginRight: 10,
  },
  messageBtn: {
    backgroundColor: "#e0e0e0",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  btnText: {
    color: "#fff",
    fontSize: 14,
  },
});

export default Profile;
