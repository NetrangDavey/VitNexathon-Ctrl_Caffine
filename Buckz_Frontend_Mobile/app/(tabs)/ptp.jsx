import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, Title } from 'react-native-paper';
import { useRouter } from 'expo-router';

export default function P2PIntegration() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Title style={styles.title}>P2P Integration</Title>
      <Button
        mode="contained"
        style={styles.button}
        onPress={() => router.push('../menu/p2p/LoanRequestList')}
      >
        Loan Request List
      </Button>
      <Button
        mode="contained"
        style={styles.button}
        onPress={() => router.push('../menu/p2p/LoanRequestForm')}
      >
        New Loan Request
      </Button>
      {/* Using a dummy "id" value for demonstration */}
      <Button
        mode="contained"
        style={styles.button}
        onPress={() => router.push('../menu/p2p/LoanRequestDetail', { id: '1' })}
      >
        Loan Request Detail
      </Button>
      <Button
        mode="contained"
        style={styles.button}
        onPress={() => router.push('../menu/p2p/DigitalSignature', { id: '1' })}
      >
        Digital Signature
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flexGrow: 1, 
    padding: 20, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#f5f5f5' 
  },
  title: { 
    marginBottom: 20, 
    fontSize: 24, 
    fontWeight: 'bold' 
  },
  button: { 
    marginVertical: 10, 
    width: '80%' 
  },
});