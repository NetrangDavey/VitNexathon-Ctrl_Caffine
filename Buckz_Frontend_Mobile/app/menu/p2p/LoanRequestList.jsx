import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { useNavigation } from 'expo-router';

const dummyLoanRequests = [
  { id: '1', borrower: 'Alice', amount: '5000', term: '12', purpose: 'Business expansion', status: 'Pending' },
  { id: '2', borrower: 'Bob', amount: '10000', term: '24', purpose: 'Home renovation', status: 'Under Review' },
];

export default function LoanRequestList() {
  const navigation = useNavigation();
  const [loanRequests, setLoanRequests] = useState([]);

  useEffect(() => {
    // Simulating an API call:
    setLoanRequests(dummyLoanRequests);
  }, []);

  const renderItem = ({ item }) => (
    <Card style={styles.card} onPress={() => navigation.navigate('p2p/LoanRequestDetail', { id: item.id })}>
      <Card.Content>
        <Title>{item.borrower}</Title>
        <Paragraph>Amount: ₹{item.amount}</Paragraph>
        <Paragraph>Term: {item.term} months</Paragraph>
        <Paragraph>Purpose: {item.purpose}</Paragraph>
        <Paragraph>Status: {item.status}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button onPress={() => navigation.navigate('p2p/LoanRequestDetail', { id: item.id })}>
          View Details
        </Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={loanRequests}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  card: { marginBottom: 15 },
});