import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Card, Switch, Title, Paragraph, Button, Snackbar } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

export default function NotificationSettings() {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#00C9FF', '#92FE9D']}
        style={styles.headerGradient}
      >
        <Title style={styles.headerTitle}>Notification Preferences</Title>
      </LinearGradient>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Push Notifications</Title>
          <Paragraph>Receive instant updates on your device</Paragraph>
          <Switch
            value={pushEnabled}
            onValueChange={() => setPushEnabled(!pushEnabled)}
            style={styles.switch}
          />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Email Notifications</Title>
          <Paragraph>Get updates in your inbox</Paragraph>
          <Switch
            value={emailEnabled}
            onValueChange={() => setEmailEnabled(!emailEnabled)}
            style={styles.switch}
          />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>SMS Notifications</Title>
          <Paragraph>Receive text message alerts</Paragraph>
          <Switch
            value={smsEnabled}
            onValueChange={() => setSmsEnabled(!smsEnabled)}
            style={styles.switch}
          />
        </Card.Content>
      </Card>

      <Button 
        mode="contained"
        style={styles.button}
        onPress={() => setShowSnackbar(true)}
      >
        Save Preferences
      </Button>

      <Snackbar
        visible={showSnackbar}
        onDismiss={() => setShowSnackbar(false)}
        duration={3000}
      >
        Notification preferences updated!
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
    padding: 20,
    marginBottom: 16,
  },
  headerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  card: {
    margin: 8,
    elevation: 4,
  },
  switch: {
    alignSelf: 'flex-end',
    marginTop: -40,
  },
  button: {
    margin: 16,
    paddingVertical: 8,
    backgroundColor: '#00C9FF',
  },
});