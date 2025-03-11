import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
  Animated,
  ScrollView,
  Modal,
} from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { router, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Entypo from "@expo/vector-icons/Entypo";
// import {pickImage}  from "../..components/imagepicker.jsx";
import { pickImage } from "../../components/imagepicker";
const Header = ({
  onAddNote,
  onDeleteNote,
  onChangeColor,
  onFormatText,
  onAddImage,
}) => {
  const colors = ["gray", "#FF5733", "#33FF57", "#3357FF", "#FF33A1"];
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isBold, setIsBold] = useState(false); // ✅ Bold state added
  const [isItalic, setIsItalic] = useState(false); // ✅ italic state added
  const [isUnderlined, setIsUnderlined] = useState(false); // ✅ underline state added
  const [selectedImage, setSelectedImage] = useState(null);
  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  const handleOptionPress = (option) => {
    console.log(`Selected: ${option}`);
    toggleModal(); // Close modal after selecting
  };

  // ✅ Add Note Function
  const addNote = async () => {
    if (!title.trim() || !content.trim()) return;

    const newNote = { title, content, color: selectedColor };

    try {
      // 🔹 Save in AsyncStorage
      const existingNotes =
        JSON.parse(await AsyncStorage.getItem("notes")) || [];
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
                  setSelectedColor(color); // Update selected color
                  // onChangeColor?.(color); // Pass selected color to parent component
                }}
                style={[
                  styles.colorCircle,
                  {
                    backgroundColor: color,
                    borderColor:
                      selectedColor === color ? "#fff" : "transparent",
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
          <TouchableOpacity onPress={() => setIsBold(!isBold)}>
            <Text style={styles.formatboldButton}>Bold</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setIsItalic(!isItalic)}>
            <Text style={styles.formatitalicButton}>Italic</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setIsUnderlined(!isUnderlined)}>
            <Text style={styles.formatuButton}>U</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => pickImage(setSelectedImage)} 
          // style={{ backgroundColor: "#007bff", padding: 10, borderRadius: 5 }}
          >
        <Ionicons name="image-outline" size={22} color="white" />
        {/* <Text style={{ color: "white" }}>Select Image</Text> */}
      </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.container}>
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
         style={[styles.contentinput, { color: selectedColor,fontWeight: isBold ? "bold" : "normal" , fontStyle: isItalic ? "italic":"normal", textDecorationLine: isUnderlined?"underlined":"none" }]} // ✅ Ye color change karega
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
      </ScrollView>
      <View style={styles.view33}>
        {/* <TouchableOpacity >
            <Text style={styles.button1}>Ai</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => {
            setTitle("");
            setContent("");
          }}
        >
          <Text style={styles.button1}>cancel</Text>
          {/* <Entypo name="cross" size={26} color="red" /> */}
        </TouchableOpacity>
        <TouchableOpacity onPress={addNote}>
          <Text style={styles.button1}>Add</Text>
          {/* <MaterialIcons name="done" size={24} color="green" /> */}
        </TouchableOpacity>
      </View>
      <View style={styles.viewaibutton}>
        <TouchableOpacity onPress={toggleModal} style={styles.buttonai}>
          <Text style={styles.buttonText}>Ai</Text>
        </TouchableOpacity>
        <View>
        {selectedImage && (
        <Image
          source={{ uri: selectedImage }}
          style={{ width: 200, height: 200, marginBottom: 20 }}
        />
      )}
        </View>

        {/* Pop-up Card */}
        <Modal transparent visible={isVisible} animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select an Option</Text>

              <TouchableOpacity
                onPress={() => handleOptionPress("Option 1")}
                style={styles.option}
              >
                <Text style={styles.optionText}>summarize</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleOptionPress("Option 2")}
                style={styles.option}
              >
                <Text style={styles.optionText}>Auto Correct</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleOptionPress("Option 3")}
                style={styles.option}
              >
                <Text style={styles.optionText}>Cappitalize</Text>
              </TouchableOpacity>

              {/* Close Button */}
              <TouchableOpacity
                onPress={toggleModal}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

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
  titleinput: {
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
    multiline: true,
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
  view33: {
    // backgroundColor:"#fff",
    flex: 1,
    flexDirection: "row",
    padding: 10,
    gap: 60,
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 100,
  },
  button1: {
    backgroundColor: "gray",
    padding: 10,
    borderRadius: 8,
    // color:"white",
    fontSize: 18,
    borderColor: "black",
  },
  to1: {},
  viewaibutton: {
    alignItems: "flex-end",
    // marginTop: 50,
    // justifyContent: "flex-end",
    // alignItems: "flex-end",
    // height: 45,
    // marginBottom: 22,
  },
  buttonai: {
    backgroundColor: "gray",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 100,
    // padding: 15,
    // backgroundColor: "gray",
    // borderRadius: "100%",
    // fontSize: 18,
    // borderColor: "black",
    // justifyContent: "center",
  },
  buttonText: {
    // color: '',
    fontSize: 16,
  },
  dropdown: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    overflow: "hidden",
    width: 150,
    marginTop: 5,
    position: "absolute",
    right: 80,
    // left:0
  },
  option: {
    padding: 10,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: 250,
    alignItems: "center",
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  option: {
    paddingVertical: 10,
    width: "100%",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
  closeButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: "gray",
    borderRadius: 5,
  },
  closeButtonText: {
    // color: '',
    fontSize: 16,
  },
});

export default Header;


// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   TextInput,
//   ScrollView,
// } from "react-native";

// const Header = ({ onAddNote }) => {
//   const colors = ["gray", "#FF5733", "#33FF57", "#3357FF", "#FF33A1"];
//   const [selectedColor, setSelectedColor] = useState(colors[0]);
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");

//   // ✅ Add Note Function
//   const addNote = () => {
//     if (!title.trim() || !content.trim()) return;
//     const newNote = { title, content, color: selectedColor };
//     onAddNote(newNote);
//     setTitle("");
//     setContent("");
//   };

//   return (
//     <>
//       <View style={styles.headerContainer}>
//         <Text style={styles.title}>C-Krate.s</Text>

//         <View style={styles.colorPicker}>
//           {colors.map((color) => (
//             <TouchableOpacity
//               key={color}
//               onPress={() => setSelectedColor(color)}
//               style={[
//                 styles.colorCircle,
//                 { backgroundColor: color, borderColor: selectedColor === color ? "#fff" : "transparent" },
//               ]}
//             />
//           ))}
//         </View>
//       </View>

//       <ScrollView style={styles.container}>
//         {/* Title Input (No Color Change) */}
//         <TextInput
//           style={styles.titleinput}
//           placeholder="Title"
//           value={title}
//           onChangeText={setTitle}
//         />

//         {/* Content Input (Text Color Changes) */}
//         <TextInput
//           style={[styles.contentinput, { color: selectedColor }]} // ✅ Ye color change karega
//           placeholder="Write a quick note..."
//           value={content}
//           onChangeText={setContent}
//           multiline={true}
//           numberOfLines={10}
//           textAlignVertical="top"
//         />
//       </ScrollView>

//       <View style={styles.buttonContainer}>
//         <TouchableOpacity onPress={() => setContent("")}>
//           <Text style={styles.button}>Cancel</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={addNote}>
//           <Text style={styles.button}>Add</Text>
//         </TouchableOpacity>
//       </View>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   headerContainer: {
//     backgroundColor: "#1e1e1e",
//     paddingVertical: 10,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: 15,
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: "600",
//     color: "white",
//   },
//   colorPicker: {
//     flexDirection: "row",
//     justifyContent: "center",
//     paddingVertical: 5,
//   },
//   colorCircle: {
//     width: 20,
//     height: 20,
//     borderRadius: 10,
//     marginHorizontal: 4,
//     borderWidth: 2,
//   },
//   container: {
//     padding: 10,
//   },
//   titleinput: {
//     backgroundColor: "#fff",
//     padding: 10,
//     marginBottom: 10,
//     borderRadius: 5,
//     fontSize: 20,
//   },
//   contentinput: {
//     backgroundColor: "#fff",
//     padding: 10,
//     borderRadius: 5,
//     fontSize: 18,
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     padding: 10,
//     gap: 60,
//     alignItems: "center",
//     justifyContent: "flex-end",
//     marginBottom: 100,
//   },
//   button: {
//     backgroundColor: "gray",
//     padding: 10,
//     borderRadius: 8,
//     fontSize: 18,
//   },
// });

// export default Header;
