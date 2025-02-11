import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, View } from '@/components/Themed';
import TabHeader from '../../components/Header/TabHeader';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

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
            tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          }}
        />
        <Tabs.Screen
          name="usertracker"
          options={{
            title: 'USER TRACKER',
            headerShown: true,
            header: () => <TabHeader title="USER TRACKER" />,
            tabBarIcon: ({ color }) => <TabBarIcon name="money" color={color} />,
          }}
        />
        <Tabs.Screen
          name="investment"
          options={{
            title: 'INVESTMENT',
            headerShown: true,
            header: () => <TabHeader title="INVESTMENT" />,
            tabBarIcon: ({ color }) => <TabBarIcon name="money" color={color} />,
          }}
        />
        <Tabs.Screen
          name="AI_Advisor"
          options={{
            title: 'AI_Advisor',
            headerShown: true,
            header: () => <TabHeader title="AI_Advisor" />,
            tabBarIcon: ({ color }) => <TabBarIcon name="cogs" color={color} />,
          }}
        />
        <Tabs.Screen
          name="ptp"
          options={{
            title: 'PEER TO PEER',
            headerShown: true,
            header: () => <TabHeader title="PEER TO PEER" />,
            tabBarIcon: ({ color }) => <TabBarIcon name="cogs" color={color} />,
          }}
        />
        <Tabs.Screen
          name="Settings"
          options={{
            title: 'SETTINGS',
            headerShown: true,
            header: () => <TabHeader title="SETTINGS" />,
            tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
          }}
        />
      </Tabs>
    </KeyboardAvoidingView>
  );
}