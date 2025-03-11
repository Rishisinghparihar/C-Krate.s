import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

export const pickImage = async (setImage) => {
  // Permission Check
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (status !== "granted") {
    Alert.alert("Permission Denied", "Gallery access is required to select an image.");
    return;
  }

  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaType.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });
  console.log(result);
  
  if (!result.canceled) {
    setImage(result.assets[0].uri); // Select ki gayi image ka URI save karo
  }
};
