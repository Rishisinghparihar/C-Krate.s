import React from "react";
import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar, View, Platform } from "react-native";

export default function TabLayout() {
  return (
    <SafeAreaProvider>
      {/* For Android manually add paddingTop for status bar */}
      <View style={{ flex: 1, paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 }}>
        <StatusBar
          barStyle="dark-content"
          translucent
          backgroundColor="transparent"
        />
        <Tabs
          screenOptions={{
            headerShown: false,
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              tabBarIcon: ({ color, size }) => (
                <FontAwesome name="home" size={size} color="black" />
              ),
            }}
          />
          <Tabs.Screen
            name="allNotes"
            options={{
              tabBarIcon: ({ color, size }) => (
                <Feather name="plus-square" size={size} color="black" />
              ),
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="person-circle-outline" size={size} color="black" />
              ),
            }}
          />
        </Tabs>
      </View>
    </SafeAreaProvider>
  );
}
