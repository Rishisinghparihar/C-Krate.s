import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, FlatList } from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { router, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const Header = ({
  onAddNote,
  onDeleteNote,
  onChangeColor,
  onFormatText,
  onAddImage,
}) => {
  const colors = ["#FFF", "#FF5733", "#33FF57", "#3357FF", "#FF33A1"];
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [notes, setNotes] = useState([]);
  const router = useRouter();
  return (
    <>
    <View>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>C-Krate.s</Text>

        <View style={styles.colorPicker}>
          {colors.map((color) => (
            <TouchableOpacity
              key={color}
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

        <View style={styles.rightSection}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="trash-outline" size={22} color="white" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton} onPress={() => router.push("/newnote")}>
            <Ionicons name="add-circle-outline" size={23} color="white" />
          </TouchableOpacity>
        </View>
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
    {/* ✅ Default Input for Quick Notes */}
    <TextInput
      style={styles.input}
      placeholder="Write a quick note..."
      onSubmitEditing={async (e) => {
        const newNote = { text: e.nativeEvent.text };
        const updatedNotes = [...notes, newNote];

        setNotes(updatedNotes);
        await AsyncStorage.setItem("notes", JSON.stringify(updatedNotes));

        // ✅ Save to MongoDB
        await axios.post("http://localhost:5001/addnote", newNote);
      }}
    />

    {/* ✅ List of Notes */}
    <FlatList
      // data={notes}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => <Text style={styles.note}>{item.text}</Text>}
    />
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
});

export default Header;
