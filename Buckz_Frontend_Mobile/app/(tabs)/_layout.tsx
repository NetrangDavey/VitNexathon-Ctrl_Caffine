import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, View } from '@/components/Themed';
import TabHeader from '../../components/Header/TabHeader';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0} // Adjust as needed
    >
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          // Disable the static render of the header on web
          // to prevent a hydration error in React Navigation v6.
          headerShown: useClientOnlyValue(false, true),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
        title: 'HOME',
        headerShown: true,
        header: () => <TabHeader title="HOME" />,
        tabBarIcon: ({ color }) => <MaterialCommunityIcons name="home" size={28} color={color} style={{ marginBottom: -3 }} />,
          }}
        />
        <Tabs.Screen
          name="usertracker"
          options={{
        title: 'USER TRACKER',
        headerShown: true,
        header: () => <TabHeader title="USER TRACKER" />,
        tabBarIcon: ({ color }) => <MaterialCommunityIcons name="account-clock" size={28} color={color} style={{ marginBottom: -3 }} />,
          }}
        />
        <Tabs.Screen
          name="investment"
          options={{
        title: 'INVESTMENT',
        headerShown: true,
        header: () => <TabHeader title="INVESTMENT" />,
        tabBarIcon: ({ color }) => <MaterialCommunityIcons name="chart-line" size={28} color={color} style={{ marginBottom: -3 }} />,
          }}
        />
        <Tabs.Screen
          name="AI_Advisor"
          options={{
        title: 'AI_Advisor',
        headerShown: true,
        header: () => <TabHeader title="AI_Advisor" />,
        tabBarIcon: ({ color }) => <MaterialCommunityIcons name="robot" size={28} color={color} style={{ marginBottom: -3 }} />,
          }}
        />
        <Tabs.Screen
          name="ptp"
          options={{
        title: 'PEER TO PEER',
        headerShown: true,
        header: () => <TabHeader title="PEER TO PEER" />,
        tabBarIcon: ({ color }) => <MaterialCommunityIcons name="account-group" size={28} color={color} style={{ marginBottom: -3 }} />,
          }}
        />
        <Tabs.Screen
          name="Settings"
          options={{
        title: 'SETTINGS',
        headerShown: true,
        header: () => <TabHeader title="SETTINGS" />,
        tabBarIcon: ({ color }) => <MaterialCommunityIcons name="cog" size={28} color={color} style={{ marginBottom: -3 }} />,
          }}
        />
      </Tabs>
    </KeyboardAvoidingView>
  );
}