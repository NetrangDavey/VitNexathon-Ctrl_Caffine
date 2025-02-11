import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import { Card, Title, Text, Avatar, IconButton } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const settingsOptions = [
  { 
    title: 'Profile & Account Information', 
    route: '../menu/settings/profile',
    icon: 'account-circle',
    color: '#FF6B6B'
  },
  { 
    title: 'Security Settings', 
    route: '../menu/settings/security',
    icon: 'shield-check',
    color: '#4ECDC4'
  },
  { 
    title: 'Notification Preferences', 
    route: '../menu/settings/notifications',
    icon: 'bell',
    color: '#45B7D1'
  },
  { 
    title: 'Display and Theme Settings', 
    route: '../menu/settings/display',
    icon: 'palette',
    color: '#96CEB4'
  },
  { 
    title: 'Integration & Data Management', 
    route: '../menu/settings/integration',
    icon: 'database',
    color: '#6C5CE7'
  },
  { 
    title: 'Help, Support & Legal', 
    route: '../menu/settings/help',
    icon: 'help-circle',
    color: '#FAD02C'
  },
  { 
    title: 'Additional Customization Options', 
    route: '../menu/settings/customize',
    icon: 'cog',
    color: '#FF8B94'
  },
];

export default function Settings() {
  const router = useRouter();

  const handlePress = (route) => {
    router.push(route);
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#4C49ED', '#5D5FEF']}
        style={styles.headerGradient}
      >
        <Animatable.View 
          animation="fadeIn" 
          style={styles.profileContainer}
        >
          <Avatar.Image
            size={80}
            source={require('../../assets/default-profile.png')}
            style={styles.avatar}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.name}>John Doe</Text>
            <Text style={styles.email}>john.doe@example.com</Text>
          </View>
          <IconButton
            icon="chevron-right"
            iconColor="#fff"
            size={24}
            onPress={() => handlePress('../menu/settings/profile')}
          />
        </Animatable.View>
      </LinearGradient>

      <View style={styles.settingsContainer}>
        {settingsOptions.map((option, index) => (
          <Animatable.View 
            key={index}
            animation="fadeInUp"
            delay={index * 100}
          >
            <TouchableOpacity onPress={() => handlePress(option.route)}>
              <Card style={[styles.card, { borderLeftColor: option.color }]}>
                <Card.Content style={styles.cardContent}>
                  <View style={styles.iconContainer}>
                    <MaterialCommunityIcons 
                      name={option.icon} 
                      size={24} 
                      color={option.color}
                    />
                  </View>
                  <View style={styles.textContainer}>
                    <Title style={styles.cardTitle}>{option.title}</Title>
                  </View>
                  <MaterialCommunityIcons 
                    name="chevron-right" 
                    size={24} 
                    color="#666"
                  />
                </Card.Content>
              </Card>
            </TouchableOpacity>
          </Animatable.View>
        ))}
      </View>
      <Text style={{ textAlign: 'center', marginVertical: 20, opacity: 0.6 }}>
        Buckz v1.0.0  
        Made with ❤️ by Ctrl Caffine Team
        </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerGradient: {
    padding: 20,
    paddingTop: 40,
    marginBottom: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  avatar: {
    backgroundColor: '#fff',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 15,
  },
  name: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  email: {
    color: '#fff',
    opacity: 0.8,
  },
  settingsContainer: {
    padding: 16,
  },
  card: {
    marginBottom: 12,
    borderRadius: 12,
    elevation: 4,
    borderLeftWidth: 4,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
  },
});