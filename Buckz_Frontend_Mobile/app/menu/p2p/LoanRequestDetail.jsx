import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { useNavigation, useRoute } from 'expo-router';

export default function LoanRequestDetail() {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params;

  // Dummy data for demonstration:
  const loanRequest = {
    id,
    borrower: 'Alice',
    amount: '5000',
    interest: '10%',
    term: '12',
    purpose: 'Business expansion',
    additionalNotes: 'Need funds to expand business operations.',
    status: 'Pending',
  };

  const handleCommitFunds = () => {
    // Make an API call here to commit funds
    alert('Funds Committed Successfully!');
  };

  const handleSignAgreement = () => {
    navigation.navigate('p2p/DigitalSignature', { id });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>{loanRequest.borrower}</Title>
          <Paragraph>Loan Amount: ₹{loanRequest.amount}</Paragraph>
          <Paragraph>Interest Rate: {loanRequest.interest}</Paragraph>
          <Paragraph>Term: {loanRequest.term} months</Paragraph>
          <Paragraph>Purpose: {loanRequest.purpose}</Paragraph>
          <Paragraph>Notes: {loanRequest.additionalNotes}</Paragraph>
          <Paragraph>Status: {loanRequest.status}</Paragraph>
        </Card.Content>
        <Card.Actions style={styles.actions}>
          <Button mode="contained" onPress={handleCommitFunds}>
            Commit Funds
          </Button>
          <Button mode="outlined" onPress={handleSignAgreement}>
            Sign Agreement
          </Button>
        </Card.Actions>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#f5f5f5', flexGrow: 1 },
  card: { marginBottom: 20 },
  actions: { justifyContent: 'space-around', padding: 10 },
});