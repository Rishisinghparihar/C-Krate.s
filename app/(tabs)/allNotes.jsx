import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { getConfig } from "../../assets/axiosconfig";

const HomeScreen = ({ navigation }) => {
  const [notes, setNotes] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredNotes, setFilteredNotes] = useState([]);
  const router = useRouter(); 
  // Fetch Notes from Backend + AsyncStorage
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        // Load from AsyncStorage First
        const storedNotes = await AsyncStorage.getItem("notes");
        if (storedNotes) setNotes(JSON.parse(storedNotes));
        const token = await AsyncStorage.getItem("token");
        console.log("Token",token);
        // Load from MongoDB
        const res = await axios.get("http://192.168.31.157:5001/notes/mynotes", await getConfig()); // 🚀 Localhost Fix
        if (res.data.status === "ok") {
          console.log(res.data);
          setNotes(res.data.notes);
          await AsyncStorage.setItem("notes", JSON.stringify(res.data.notes));
        }
      } catch (error) {
        console.error({error});
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
  }, []);

  // Search Notes in Real-time
  useEffect(() => {
    if (searchText.trim() === "") {
      setFilteredNotes(notes);
    } else {
      const filtered = notes.filter((note) =>
        note.title.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredNotes(filtered);
    }
  }, [searchText, notes]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>C-Krate.s</Text>
        <TouchableOpacity>
          <Feather name="settings" size={22} color="white" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search..."
          placeholderTextColor="#aaa"
          style={styles.searchInput}
          value={searchText}
          onChangeText={setSearchText}
        />
        <Feather name="search" size={20} color="gray" style={styles.searchIcon} />
      </View>

      {/* Notes List */}
      <FlatList
        data={filteredNotes}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
          key={item}
            style={styles.noteCard}
            onPress={() =>
              router.push({
                pathname: "/NoteDetails",
                params: {
                    _id: item._id,
                  title: item.title,
                  content: item.content,
                  // date: item.date,
                },
              })
            }
            
          >
            <Text style={styles.noteText}>{item.title}</Text>
            <Text style={styles.noteDate}>{new Date(item.date).toLocaleDateString()}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "gray",
    padding: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    color: "black",
    padding: 8,
  },
  searchIcon: {
    marginLeft: 5,
  },
  noteCard: {
    backgroundColor: "#333",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 3,
    borderLeftColor: "#FFD700",
  },
  noteText: {
    fontSize: 16,
    color: "#fff",
  },
  noteDate: {
    textAlign: "right",
    fontSize: 12,
    color: "#FFD700",
    marginTop: 5,
  },
});

export default HomeScreen;
