import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, FlatList } from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { router, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';

const Header = ({ onAddNote, onDeleteNote, onChangeColor, onFormatText, onAddImage }) => {
  const colors = ["#FFF", "#FF5733", "#33FF57", "#3357FF", "#FF33A1"];
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // ✅ Add Note Function
  const addNote = async () => {
    if (!title.trim() || !content.trim()) return;

    const newNote = { title, content, color: selectedColor };
    
    try {
      // 🔹 Save in AsyncStorage
      const existingNotes = JSON.parse(await AsyncStorage.getItem("notes")) || [];
      const updatedNotes = [...existingNotes, newNote];
      await AsyncStorage.setItem("notes", JSON.stringify(updatedNotes));

      // 🔹 Save in MongoDB via API
      await axios.post("https://localhost:5001/addnote", newNote);

      // 🔹 Update parent component state
      onAddNote(newNote);

      // 🔹 Reset Input Fields
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  return (
    <>
      <View>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>C-Krate.s</Text>

          <View style={styles.colorPicker}>
            {colors.map((color) => (
              <TouchableOpacity
                key={color}
                onPress={() => {
                  setSelectedColor(color);
                  onChangeColor(color);
                }}
                style={[
                  styles.colorCircle,
                  {
                    backgroundColor: color,
                    borderColor: selectedColor === color ? "#fff" : "transparent",
                  },
                ]}
              />
            ))}
          </View>

          {/* <View style={styles.rightSection}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="trash-outline" size={22} color="white" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconButton} onPress={() => router.push("/newnote")}>
              <Ionicons name="add-circle-outline" size={23} color="white" />
            </TouchableOpacity>
          </View> */}
        </View>

        <View style={styles.formatToolbar}>
          <TouchableOpacity>
            <Text style={styles.formatboldButton}>Bold</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.formatitalicButton}>Italic</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.formatuButton}>U</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onAddImage}>
            <Ionicons name="image-outline" size={22} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.container}>
        {/* Title Input */}
        <TextInput
          style={styles.titleinput}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
        />
        {/* Content Input */}
        {/* <View style={styles.contentInputView}> */}
        <TextInput
          style={styles.contentinput}
          placeholder="Write a quick note..."
          value={content}
          onChangeText={setContent}
          onSubmitEditing={addNote}
          multiline={true} // Multiple lines allow karega
          numberOfLines={10} // Kitni lines dikhegi by default
          textAlignVertical="top" // Text ko top se start karega
          scrollEnabled={false} 
        />
        {/* </View> */}
        
        {/* List of Notes */}
        {/* <FlatList
          data={notes}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.noteCard}>
              <Text style={styles.noteTitle}>{item.title}</Text>
              <Text style={styles.note}>{item.content}</Text>
            </View>
          )}
        /> */}
      </View>
      <View style={styles.view33}>
        <TouchableOpacity>✨</TouchableOpacity>
        <TouchableOpacity onPress={() => {
        setTitle("");
        setContent("");
      }}
      ><Entypo name="cross" size={26} color="red" /></TouchableOpacity>
        <TouchableOpacity 
        onPress={addNote} ><MaterialIcons name="done" size={24} color="green" /></TouchableOpacity>
        </View>
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#1e1e1e",
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: "white",
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    marginLeft: 12,
  },
  colorPicker: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 5,
  },
  colorCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginHorizontal: 4,
    borderWidth: 2,
  },
  formatToolbar: {
    backgroundColor: "#333",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#444",
  },
  formatboldButton: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  formatitalicButton: {
    fontSize: 18,
    fontStyle: "italic",
    color: "white",
  },
  formatuButton: {
    fontSize: 18,
    color: "white",
    textDecorationLine: "underline",
  },
  container: {
    padding: 10,
  },
  titleinput:{
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    fontSize: 20,
    fontStyle: "bold",
  },
  // contentInputView: {
  //   backgroundColor: "#fff",
  //   borderColor: "#fff", // borderBlockColor ki jagah borderColor use karein
  //   borderWidth: 1, // Border visible karne ke liye
  //   height: 40, // 20 thoda chhota ho sakta hai, adjust karein
  //   paddingHorizontal: 10, // Text ka space maintain karne ke liye
  //   borderRadius: 5, // Thoda smooth look ke liye
  //   flexWrap: "wrap", // Multiline ke liye kaam aayega agar required ho
  //   multiline: true
  // },
  contentinput: {
    backgroundColor: "#fff",
    borderColor: "#fff", // borderBlockColor ki jagah borderColor use karein
    borderWidth: 1, // Border visible karne ke liye
    height: 400, // 20 thoda chhota ho sakta hai, adjust karein
    paddingHorizontal: 10, // Text ka space maintain karne ke liye
    borderRadius: 5, // Thoda smooth look ke liye
    flexWrap: "wrap", // Multiline ke liye kaam aayega agar required ho
    multiline: true
  },
  noteCard: {
    backgroundColor: "#1e1e1e",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFD700",
  },
  note: {
    fontSize: 14,
    color: "#fff",
  },
  view33:{
    // backgroundColor:"#fff",
    flex: 1,
    flexDirection: "row",
    padding:20,
    gap:60,
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom:100
  }
});

export default Header;
