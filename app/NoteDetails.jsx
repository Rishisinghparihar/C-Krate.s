import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import PinLockModal from "../components/PinLockModal";

const NoteDetails = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [isLocked, setIsLocked] = useState(params.isLocked || false);
  const [pinModalVisible, setPinModalVisible] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  // Lock/Unlock Function
  const handleToggleLock = async () => {
    if (isLocked) {
      setPinModalVisible(true); // Unlock k liye pin 
    } else {
      Alert.alert(
        "Set Lock",
        "Are you sure you want to lock this note?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "OK",
            onPress: async () => {
              try {
                setIsLocked(true);
                await AsyncStorage.setItem(`lock_${params._id}`, "true");
              } catch (error) {
                console.error("Error locking note:", error);
              }
            },
          },
        ]
      );
    }
  };

  // Delete Function
  const handleDelete = async () => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this note?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "OK",
          onPress: async () => {
            try {
              //  **Delete from AsyncStorage**
              const storedNotes = await AsyncStorage.getItem("notes");
              if (storedNotes) {
                let notes = JSON.parse(storedNotes);
                notes = notes.filter((note) => note._id !== params._id);
                await AsyncStorage.setItem("notes", JSON.stringify(notes));
              }

              //  **Delete from MongoDB**
              await axios.delete(`http://192.168.143.169:5001/notes/${params._id}`);

              //  **Navigate Back**
              router.back();
            } catch (error) {
              console.error("Error deleting note:", error);
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Feather name="arrow-left" size={24} color="white" />
      </TouchableOpacity>

      {/* Lock Button (Top Right) */}
      <TouchableOpacity style={styles.lockButton} onPress={handleToggleLock}>
        <Feather name={isLocked ? "lock" : "unlock"} size={24} color="yellow" />
      </TouchableOpacity>

      {/* Delete Button */}
      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Feather name="trash" size={24} color="red" />
      </TouchableOpacity>

      {/* PIN Lock Modal */}
      {isLocked && !isUnlocked && (
        <PinLockModal 
          visible={pinModalVisible} 
          onClose={() => setPinModalVisible(false)} 
          onUnlock={() => {
            setIsUnlocked(true);
            setPinModalVisible(false);
          }} 
        />
      )}

      {/* Check ki Params aaye ya nahi */}
      {params?.title && params?.content ? (
        isLocked && !isUnlocked ? (
          <Text style={styles.lockedText}>🔒 This note is locked. Enter PIN to view.</Text>
        ) : (
          <>
            {/* Note Title */}
            <Text style={styles.title}>{params.title}</Text>

            {/* Note Content */}
            <Text style={styles.content}>{params.content}</Text>
          </>
        )
      ) : (
        <Text style={styles.errorText}>Error: Note not found!</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333",
    padding: 20,
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
  },
  lockButton: {
    position: "absolute",
    top: 20,
    right: 60,
  },
  deleteButton: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFD700",
    marginBottom: 10,
    marginTop: 50,
  },
  content: {
    fontSize: 16,
    color: "#fff",
    lineHeight: 24,
  },
  lockedText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});

export default NoteDetails;
