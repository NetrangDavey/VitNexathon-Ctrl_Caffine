import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Title, Snackbar } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

export default function LoanRequestForm() {
  const [loanAmount, setLoanAmount] = useState('');
  const [repaymentTerm, setRepaymentTerm] = useState('');
  const [purpose, setPurpose] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleSubmit = () => {
    if (!loanAmount || !repaymentTerm || !purpose) {
      setSnackbarMessage('Please fill in all fields.');
      setSnackbarVisible(true);
      return;
    }
    // API call to submit the loan request would go here.
    setSnackbarMessage('Loan Request Submitted Successfully!');
    setSnackbarVisible(true);
    setLoanAmount('');
    setRepaymentTerm('');
    setPurpose('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <LinearGradient colors={['#4C49ED', '#5D5FEF']} style={styles.header}>
        <Title style={styles.headerTitle}>New Loan Request</Title>
      </LinearGradient>
      <View style={styles.formContainer}>
        <TextInput
          label="Loan Amount"
          value={loanAmount}
          onChangeText={setLoanAmount}
          keyboardType="numeric"
          style={styles.input}
        />
        <TextInput
          label="Repayment Term (months)"
          value={repaymentTerm}
          onChangeText={setRepaymentTerm}
          keyboardType="numeric"
          style={styles.input}
        />
        <TextInput
          label="Purpose"
          value={purpose}
          onChangeText={setPurpose}
          multiline
          style={[styles.input, { height: 100 }]}
        />
        <Button mode="contained" onPress={handleSubmit} style={styles.button}>
          Submit Request
        </Button>
      </View>
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
  container: { flexGrow: 1, backgroundColor: '#f5f5f5' },
  header: {
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 28,
  },
  formContainer: {
    padding: 20,
  },
  input: { marginBottom: 15 },
  button: { marginTop: 10 },
});