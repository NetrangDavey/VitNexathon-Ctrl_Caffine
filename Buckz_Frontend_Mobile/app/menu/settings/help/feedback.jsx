"use client"

import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import { TextInput, Button, Title, Snackbar, Text, Card } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { Chip } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Feedback() {
  const [feedbackText, setFeedbackText] = useState('');
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleSubmit = () => {
    if (!feedbackText) {
      setSnackbarMessage("Please enter your feedback.");
      setSnackbarVisible(true);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setSnackbarMessage("Thank you for your valuable feedback!");
      setSnackbarVisible(true);
      setLoading(false);
      setFeedbackText('');
      setRating(0);
    }, 1500);
  };

  const renderStars = () => {
    return [...Array(5)].map((_, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => setRating(index + 1)}
        activeOpacity={0.7}
      >
        <MaterialCommunityIcons
          name={index < rating ? "star" : "star-outline"}
          size={32}
          color={index < rating ? "#FFD700" : "#666"}
          style={styles.star}
        />
      </TouchableOpacity>
    ));
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <LinearGradient
          colors={['#4C49ED', '#5D5FEF']}
          style={styles.headerGradient}
        >
          <Title style={styles.headerTitle}>Your Feedback Matters!</Title>
          <Text style={styles.headerSubtitle}>Help us improve your experience</Text>
        </LinearGradient>

        <Animatable.View 
          animation="fadeInUp" 
          style={styles.contentContainer}
        >
          <Card style={styles.card}>
            <Card.Content>
              <View style={styles.ratingContainer}>
                <Text style={styles.ratingTitle}>Rate your experience</Text>
                <View style={styles.starsContainer}>
                  {renderStars()}
                </View>
              </View>

              <TextInput
                label="Share your thoughts"
                value={feedbackText}
                onChangeText={setFeedbackText}
                mode="outlined"
                multiline
                numberOfLines={6}
                style={styles.feedbackInput}
                theme={{ colors: { primary: '#4C49ED' }}}
                left={<TextInput.Icon icon="message-draw" />}
              />

              <View style={styles.categories}>
                {['App Experience', 'Features', 'Performance', 'Support'].map((category) => (
                  <Chip 
                    key={category}
                    style={styles.chip}
                    textStyle={styles.chipText}
                  >
                    {category}
                  </Chip>
                ))}
              </View>

              <Button 
                mode="contained" 
                onPress={handleSubmit}
                style={styles.button}
                loading={loading}
                icon="send"
              >
                {loading ? 'Submitting...' : 'Submit Feedback'}
              </Button>
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
    </GestureHandlerRootView>
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
  ratingContainer: {
    alignItems: 'center',
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
  },
  ratingTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
    color: '#333',
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  star: {
    marginHorizontal: 4,
  },
  feedbackInput: {
    backgroundColor: '#fff',
    marginVertical: 16,
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  chip: {
    margin: 4,
    backgroundColor: '#4C49ED20',
  },
  chipText: {
    color: '#4C49ED',
  },
  button: {
    marginTop: 10,
    paddingVertical: 8,
    backgroundColor: '#4C49ED',
    borderRadius: 8,
  },
  snackbar: {
    borderRadius: 8,
  },
});