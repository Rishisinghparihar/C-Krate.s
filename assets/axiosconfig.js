import AsyncStorage from "@react-native-async-storage/async-storage";

export const getConfig = async () => {
  const token = await AsyncStorage.getItem("token") || "";  // Ensure token is never null
  console.log("Token: ", token);
  return {
    headers: {
      "Content-Type": "application/json",
      "Authorization": token,  // Ensure correct format
    },
  };
};
