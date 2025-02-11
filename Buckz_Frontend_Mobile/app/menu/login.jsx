"use client"

import { useState } from "react"
import { View, StyleSheet, Image } from "react-native"
import { TextInput, Button, Title, Snackbar } from "react-native-paper"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect } from "react"
import { ActivityIndicator } from "react-native"
import { useNavigation } from "expo-router"
import { useRouter } from "expo-router"

const router = useRouter()
// Test users (in a real app, this would be in a secure database)
const testUsers = [
  { id: "1234567890", password: "password123" },
  { id: "9876543210", password: "password456" },
]

const LoginScreen = ({ navigation }) => {
  const [id, setId] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [visible, setVisible] = useState(false)

  const handleLogin = async () => {
    // Check if the user is already logged in,
    // then skip further redirects if so.
    const alreadyLoggedIn = await AsyncStorage.getItem('isLoggedIn')
    if (alreadyLoggedIn === 'true') {
      console.log("User already logged in.");
      return;
    }

    // Validate credentials
    const user = testUsers.find((user) => user.id === id && user.password === password);
    if (user) {
      await AsyncStorage.setItem('isLoggedIn', 'true')
      await AsyncStorage.setItem('userID', id)
      // Using router.replace to redirect properly with expo-router.
      // router.push('../(tabs)/index.jsx')
    } else {
      setError("Invalid ID or password")
      setVisible(true)
    }
  }

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/digilocker-logo.png")} style={styles.logo} />
      <Title style={styles.title}>DigiLocker Authentication</Title>
      <TextInput label="ID Number" value={id} onChangeText={setId} style={styles.input} keyboardType="numeric" />
      <TextInput label="Password" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        Login
      </Button>
      <Snackbar visible={visible} onDismiss={() => setVisible(false)} duration={3000}>
        {error}
      </Snackbar>
    </View>
  )
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
})

export default LoginScreen

