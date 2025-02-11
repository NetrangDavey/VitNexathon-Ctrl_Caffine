"use client"

import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { TextInput, Button, Title, Text, Card, Avatar, Badge } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

export default function Profile() {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john@example.com');
  const [phone, setPhone] = useState('1234567890');
  const [profilePic, setProfilePic] = useState(null);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [message, setMessage] = useState('');

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      setMessage('Permission to access camera roll is required!');
      setSnackbarVisible(true);
      return;
    }
    
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setProfilePic(result.assets[0].uri);
    }
  };

  const handleUpdate = () => {
    setMessage("Profile updated successfully!");
    setSnackbarVisible(true);
  };

  const verificationData = {
    aadharNumber: "XXXX-XXXX-1234",
    panNumber: "ABCDE1234F",
    isVerified: true
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#4C49ED', '#5D5FEF']}
        style={styles.headerGradient}
      >
        <Animatable.View animation="fadeIn" style={styles.profileHeader}>
          <TouchableOpacity onPress={pickImage} style={styles.profileImageContainer}>
            {profilePic ? (
              <Image source={{ uri: profilePic }} style={styles.profilePic} />
            ) : (
              <Image source={require('../../../assets/default-profile.png')} style={styles.profilePic} />
            )}
            <View style={styles.cameraIconContainer}>
              <MaterialCommunityIcons name="camera" size={20} color="#fff" />
            </View>
          </TouchableOpacity>
          {verificationData.isVerified && (
            <Badge style={styles.verifiedBadge}>
              <MaterialCommunityIcons name="check-circle" size={20} color="#4CAF50" />
            </Badge>
          )}
        </Animatable.View>
      </LinearGradient>

      <Animatable.View animation="fadeInUp" style={styles.contentContainer}>
        <Card style={styles.infoCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Personal Information</Title>
            <TextInput
              label="Name"
              value={name}
              onChangeText={setName}
              mode="outlined"
              style={styles.input}
              theme={{ colors: { primary: '#4C49ED' }}}
            />
            <TextInput
              label="Email Address"
              value={email}
              onChangeText={setEmail}
              mode="outlined"
              style={styles.input}
              theme={{ colors: { primary: '#4C49ED' }}}
            />
            <TextInput
              label="Phone Number"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              mode="outlined"
              style={styles.input}
              theme={{ colors: { primary: '#4C49ED' }}}
            />
          </Card.Content>
        </Card>

        <Card style={[styles.infoCard, styles.verificationCard]}>
          <Card.Content>
            <View style={styles.verificationHeader}>
              <Title style={styles.sectionTitle}>Verification Details</Title>
              <MaterialCommunityIcons name="shield-check" size={24} color="#4CAF50" />
            </View>
            
            <View style={styles.verificationItem}>
              <Text style={styles.verificationLabel}>Aadhar Number</Text>
              <Text style={styles.verificationValue}>{verificationData.aadharNumber}</Text>
            </View>
            
            <View style={styles.verificationItem}>
              <Text style={styles.verificationLabel}>PAN Number</Text>
              <Text style={styles.verificationValue}>{verificationData.panNumber}</Text>
            </View>
          </Card.Content>
        </Card>

        <Button 
          mode="contained" 
          style={styles.button}
          contentStyle={styles.buttonContent}
          onPress={handleUpdate}
        >
          Update Profile
        </Button>
      </Animatable.View>
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
    alignItems: 'center',
  },
  profileHeader: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImageContainer: {
    position: 'relative',
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#fff',
  },
  cameraIconContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#4C49ED',
    padding: 8,
    borderRadius: 20,
    elevation: 4,
  },
  verifiedBadge: {
    position: 'absolute',
    right: -10,
    top: 0,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 4,
  },
  contentContainer: {
    padding: 16,
    marginTop: -20,
  },
  infoCard: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 4,
  },
  verificationCard: {
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  input: {
    marginVertical: 8,
    backgroundColor: '#fff',
  },
  verificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  verificationItem: {
    marginVertical: 8,
    padding: 12,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
  },
  verificationLabel: {
    color: '#666',
    fontSize: 14,
    marginBottom: 4,
  },
  verificationValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  button: {
    marginVertical: 10,
    borderRadius: 8,
    backgroundColor: '#4C49ED',
  },
  buttonContent: {
    paddingVertical: 8,
  },
});