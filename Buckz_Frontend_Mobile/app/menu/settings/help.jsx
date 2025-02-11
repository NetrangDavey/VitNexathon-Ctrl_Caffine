"use client"

import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { Card, Title, Paragraph, Divider, Button, Snackbar } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

const helpOptions = [
  {
    title: 'Help & FAQ',
    description: 'Find answers to common questions and troubleshooting tips.',
    icon: 'frequently-asked-questions',
    color: '#FF6B6B',
    route: './help/faq'
  },
  {
    title: 'Contact Support',
    description: 'Get in touch with our support team for assistance.',
    icon: 'headset',
    color: '#4ECDC4',
    route: './help/contact'
  },
  {
    title: 'Feedback & Suggestions',
    description: 'Submit feedback or feature requests.',
    icon: 'message-text',
    color: '#45B7D1',
    route: './help/feedback'
  },
  {
    title: 'Legal Information',
    description: 'Review our Privacy Policy, Terms & Conditions, and legal details.',
    icon: 'file-document',
    color: '#96CEB4',
    route: './help/legal'
  }
];

export default function Help() {
  const router = useRouter();
  const [snackbarVisible, setSnackbarVisible] = React.useState(false);
  const [message, setMessage] = React.useState('');

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#4C49ED', '#5D5FEF']}
        style={styles.headerGradient}
      >
        <Animatable.View animation="fadeIn">
          <View style={styles.headerContainer}>
            <MaterialCommunityIcons name="help-circle" size={40} color="#fff" />
            <Title style={styles.headerTitle}>Help & Support</Title>
          </View>
          <Text style={styles.headerSubtitle}>How can we help you today?</Text>
        </Animatable.View>
      </LinearGradient>

      <View style={styles.content}>
        {helpOptions.map((option, index) => (
          <Animatable.View 
            key={index}
            animation="fadeInUp"
            delay={index * 200}
          >
            <TouchableOpacity onPress={() => router.push(option.route)}>
              <Card style={[styles.card, { borderLeftColor: option.color }]}>
                <Card.Content style={styles.cardContent}>
                  <View style={[styles.iconContainer, { backgroundColor: `${option.color}20` }]}>
                    <MaterialCommunityIcons name={option.icon} size={24} color={option.color} />
                  </View>
                  <View style={styles.textContainer}>
                    <Title style={styles.cardTitle}>{option.title}</Title>
                    <Paragraph style={styles.cardDescription}>{option.description}</Paragraph>
                  </View>
                  <MaterialCommunityIcons name="chevron-right" size={24} color="#666" />
                </Card.Content>
              </Card>
            </TouchableOpacity>
          </Animatable.View>
        ))}

        <Animatable.View animation="fadeInUp" delay={800}>
          <Button 
            mode="contained" 
            icon="refresh"
            style={styles.refreshButton}
            onPress={() => { 
              setMessage('Help Center refreshed!'); 
              setSnackbarVisible(true); 
            }}
          >
            Refresh
          </Button>
        </Animatable.View>
      </View>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        style={styles.snackbar}
      >
        {message}
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
    marginBottom: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  headerSubtitle: {
    color: '#fff',
    opacity: 0.8,
    textAlign: 'center',
    marginTop: 8,
  },
  content: {
    padding: 16,
    marginTop: -20,
  },
  card: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 4,
    borderLeftWidth: 4,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
    marginRight: 8
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  cardDescription: {
    color: '#666',
  },
  refreshButton: {
    marginTop: 20,
  },
  snackbar: {
    marginBottom: 20,
  },
});