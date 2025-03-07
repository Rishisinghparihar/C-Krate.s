import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";

const NoteDetails = () => {
  const router = useRouter();
  const params = useLocalSearchParams(); // 🔥 Yaha se params lenge

  return (
    <View style={styles.container}>
      {/* 🔙 Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Feather name="arrow-left" size={24} color="white" />
      </TouchableOpacity>

      {/* ✅ Check ki Params aaye ya nahi */}
      {params?.title && params?.content ? (
        <>
          {/* 📌 Note Title */}
          <Text style={styles.title}>{params.title}</Text>

          {/* 📜 Note Content */}
          <Text style={styles.content}>{params.content}</Text>

          {/* 📅 Note Date */}
          {/* <Text style={styles.date}>Created on: {new Date(params.date).toLocaleDateString()}</Text> */}
        </>
      ) : (
        <Text style={styles.errorText}>Error: Note not found!</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333",
    padding: 20,
  },
  backButton: {
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFD700",
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    color: "#fff",
    lineHeight: 24,
  },
  date: {
    marginTop: 20,
    fontSize: 12,
    color: "#aaa",
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});

export default NoteDetails;
