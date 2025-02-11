import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Card, Switch, Title, Paragraph, Button, Snackbar, ActivityIndicator } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

export default function IntegrationSettings() {
  const [bankSync, setBankSync] = useState(false);
  const [googleDrive, setGoogleDrive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [message, setMessage] = useState('');

  const handleSync = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setMessage('Integration settings updated successfully!');
      setShowSnackbar(true);
      setLoading(false);
    }, 2000);
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#6441A5', '#2a0845']}
        style={styles.headerGradient}
      >
        <Title style={styles.headerTitle}>Integration & Sync</Title>
      </LinearGradient>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Bank Account Sync</Title>
          <Paragraph>Sync with your bank accounts</Paragraph>
          <Switch
            value={bankSync}
            onValueChange={() => setBankSync(!bankSync)}
            style={styles.switch}
          />
          {bankSync && (
            <View style={styles.syncInfo}>
              <Paragraph>Last synced: Today, 2:30 PM</Paragraph>
            </View>
          )}
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Google Drive Backup</Title>
          <Paragraph>Backup data to Google Drive</Paragraph>
          <Switch
            value={googleDrive}
            onValueChange={() => setGoogleDrive(!googleDrive)}
            style={styles.switch}
          />
          {googleDrive && (
            <View style={styles.syncInfo}>
              <Paragraph>Auto-backup enabled</Paragraph>
            </View>
          )}
        </Card.Content>
      </Card>

      <Button 
        mode="contained"
        style={styles.button}
        onPress={handleSync}
        disabled={loading}
      >
        {loading ? <ActivityIndicator color="white" /> : 'Sync Now'}
      </Button>

      <Snackbar
        visible={showSnackbar}
        onDismiss={() => setShowSnackbar(false)}
        duration={3000}
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
  syncInfo: {
    marginTop: 10,
    padding: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
  },
  button: {
    margin: 16,
    paddingVertical: 8,
    backgroundColor: '#6441A5',
  },
});