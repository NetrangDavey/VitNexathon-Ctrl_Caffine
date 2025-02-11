import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph, Button, TextInput, Snackbar } from 'react-native-paper';
import { useNavigation, useSearchParams } from 'expo-router';

export default function DigitalSignature() {
  const navigation = useNavigation();
  const { id } = useSearchParams();
  const [signature, setSignature] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleSignNow = () => {
    if (!signature) {
      setSnackbarMessage('Please provide your signature.');
      setSnackbarVisible(true);
      return;
    }
    // Simulate sending signature to the API:
    setSnackbarMessage('Signature Captured Successfully!');
    setSnackbarVisible(true);
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Digital Loan Agreement</Title>
          <Paragraph>
            This is a preview of your digital loan agreement. Please review it and provide your signature below.
          </Paragraph>
          <TextInput
            label="Your Signature (Type your name)"
            value={signature}
            onChangeText={setSignature}
            style={styles.input}
          />
          <Button mode="contained" onPress={handleSignNow} style={styles.button}>
            Sign Now
          </Button>
        </Card.Content>
      </Card>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
      >
        {snackbarMessage}
      </Snackbar>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: '#ffffff' },
  card: { marginBottom: 20 },
  input: { marginTop: 20, marginBottom: 15 },
  button: { marginTop: 10 },
});