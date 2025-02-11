import React, { useEffect } from 'react'
import { View, ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'

const CheckLogin = () => {
    const router = useRouter()

    useEffect(() => {
        const checkLoginStatus = async () => {
            const isLoggedIn = await AsyncStorage.getItem('isLoggedIn')
            if (isLoggedIn === 'true') {
                router.push("/(tabs)")
            } else {
                router.push("/menu/login")
            }
        }

        checkLoginStatus()
    }, [])

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    )
}

export default CheckLogin