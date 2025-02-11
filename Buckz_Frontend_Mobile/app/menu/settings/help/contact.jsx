"use client"

import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, ActivityIndicator } from 'react-native';
import { TextInput, Button, Title, Snackbar, Text, Card } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

export default function ContactSupport() {
  const [subject, setSubject] = useState('');
  const [messageBody, setMessageBody] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleSubmit = () => {
    if (!subject || !messageBody) {
      setSnackbarMessage("Please fill in both subject and message.");
      setSnackbarVisible(true);
      return;
    }
    setLoading(true);
    // Simulate an API call
    setTimeout(() => {
      setSnackbarMessage("Support request submitted successfully!");
      setSnackbarVisible(true);
      setLoading(false);
      setSubject('');
      setMessageBody('');
    }, 1500);
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#4C49ED', '#5D5FEF']}
        style={styles.headerGradient}
      >
        <Title style={styles.headerTitle}>Contact Support</Title>
        <Text style={styles.headerSubtitle}>We're here to help you</Text>
      </LinearGradient>

      <Animatable.View 
        animation="fadeInUp" 
        style={styles.contentContainer}
      >
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.contactInfo}>
              <MaterialCommunityIcons name="headphones" size={24} color="#4C49ED" />
              <Text style={styles.contactText}>24/7 Customer Support</Text>
            </View>
            
            <TextInput
              label="Subject"
              value={subject}
              onChangeText={setSubject}
              mode="outlined"
              style={styles.input}
              theme={{ colors: { primary: '#4C49ED' }}}
              left={<TextInput.Icon icon="format-title" />}
            />
            
            <TextInput
              label="Message"
              value={messageBody}
              onChangeText={setMessageBody}
              mode="outlined"
              multiline
              numberOfLines={5}
              style={[styles.input, styles.messageInput]}
              theme={{ colors: { primary: '#4C49ED' }}}
              left={<TextInput.Icon icon="message-text" />}
            />

            <Button 
              mode="contained" 
              onPress={handleSubmit} 
              style={styles.button} 
              disabled={loading}
              contentStyle={styles.buttonContent}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <>
                  <MaterialCommunityIcons name="send" size={18} color="#fff" />
                  <Text style={styles.buttonText}>Submit Request</Text>
                </>
              )}
            </Button>

            <View style={styles.alternativeContact}>
              <MaterialCommunityIcons name="phone" size={20} color="#666" />
              <Text style={styles.alternativeText}>
                Or call us at: +1 (800) 123-4567
              </Text>
            </View>
          </Card.Content>
        </Card>
      </Animatable.View>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        style={styles.snackbar}
      >
        {snackbarMessage}
      </Snackbar>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerGradient: {
    padding: 30,
    paddingTop: 60,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headerSubtitle: {
    color: '#fff',
    opacity: 0.9,
    textAlign: 'center',
    marginTop: 8,
    fontSize: 16,
  },
  contentContainer: {
    padding: 16,
    marginTop: -20,
  },
  card: {
    borderRadius: 12,
    elevation: 4,
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 8,
  },
  contactText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  input: {
    marginVertical: 8,
    backgroundColor: '#fff',
  },
  messageInput: {
    height: 120,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#4C49ED',
    borderRadius: 8,
    elevation: 2,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  buttonText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 16,
  },
  alternativeContact: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
  },
  alternativeText: {
    marginLeft: 8,
    color: '#666',
    fontSize: 14,
  },
  snackbar: {
    borderRadius: 8,
  },
});