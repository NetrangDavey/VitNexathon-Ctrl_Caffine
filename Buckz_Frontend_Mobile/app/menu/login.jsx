"use client";

import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, ActivityIndicator } from "react-native";
import { TextInput, Button, Title, Snackbar } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

// Test users (for demonstration purposes)
const testUsers = [
  { id: "1234567890", password: "password123" },
  { id: "9876543210", password: "password456" },
];

export default function LoginScreen() {
  const router = useRouter();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Check if user is already logged in when the component mounts
  useEffect(() => {
    const checkLoggedIn = async () => {
      const alreadyLoggedIn = await AsyncStorage.getItem("isLoggedIn");
      if (alreadyLoggedIn === "true") {
        // Redirect to the tabs layout if already logged in
        router.replace("../(tabs)/index.jsx");
      }
    };
    checkLoggedIn();
  }, [router]);

  const handleLogin = async () => {
    setIsLoading(true);

    // Validate credentials
    const user = testUsers.find(
      (user) => user.id === id && user.password === password
    );
    if (user) {
      // Save login state in AsyncStorage
      await AsyncStorage.setItem("isLoggedIn", "true");
      await AsyncStorage.setItem("userID", id);
      // Redirect to the tabs layout (i.e. app/(tabs)/index.jsx)
      router.replace("../(tabs)/index.jsx");
    } else {
      setError("Invalid ID or password");
      setVisible(true);
    }
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/digilocker-logo.png")}
        style={styles.logo}
      />
      <Title style={styles.title}>DigiLocker Authentication</Title>
      <TextInput
        label="ID Number"
        value={id}
        onChangeText={setId}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button
        mode="contained"
        onPress={handleLogin}
        style={styles.button}
        disabled={isLoading}
      >
        {isLoading ? <ActivityIndicator color="#fff" /> : "Login"}
      </Button>
      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        duration={3000}
      >
        {error}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
  },
});
