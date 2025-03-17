import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const NewNote = () => {
  const router = useRouter();
  const [note, setNote] = useState("");

  const saveNote = async () => {
    if (!note.trim()) return;

    try {
      // Get existing notes
      const storedNotes = await AsyncStorage.getItem("notes");
      const notes = storedNotes ? JSON.parse(storedNotes) : [];

      // Add new note
      const newNote = { text: note };
      const updatedNotes = [...notes, newNote];

      // Save locally
      await AsyncStorage.setItem("notes", JSON.stringify(updatedNotes));

      // Save to MongoDB
      await axios.post("http://localhost:5001/addnote", newNote);

      router.push("/"); // ✅ Go back to home screen
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Write your note..."
        multiline
        value={note}
        onChangeText={setNote}
      />
      <Button title="Save Note" onPress={saveNote} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    height: 200,
  },
});

export default NewNote;
