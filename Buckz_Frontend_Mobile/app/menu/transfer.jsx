import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {
  Text,
  Title,
  Card,
  TextInput,
  Button,
  Avatar,
  Chip,
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

const { width } = Dimensions.get('window');

// Sample bank accounts
const bankAccounts = [
  { id: '1', name: 'Savings Account', number: '****4321', balance: 25000, bank: 'SBI' },
  { id: '2', name: 'Current Account', number: '****8765', balance: 50000, bank: 'HDFC' },
];

// Sample recent transactions
const recentTransfers = [
  { id: '1', name: 'John Doe', account: '****9876', bank: 'ICICI', amount: 5000 },
  { id: '2', name: 'Sarah Smith', account: '****5432', bank: 'Axis', amount: 3000 },
];

export default function Transfer() {
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [amount, setAmount] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const handleTransfer = async () => {
    setLoading(true);
    // Simulate transfer process
    setTimeout(() => {
      setLoading(false);
      setStep(3); // Show success
    }, 2000);
  };

  const renderStep1 = () => (
    <Animatable.View animation="fadeIn">
      <Title style={styles.sectionTitle}>Select Source Account</Title>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {bankAccounts.map((account) => (
          <TouchableOpacity
            key={account.id}
            onPress={() => setSelectedAccount(account)}
          >
            <Card
              style={[
                styles.accountCard,
                selectedAccount?.id === account.id && styles.selectedCard,
              ]}
            >
              <LinearGradient
                colors={['#4C49ED', '#5D5FEF']}
                style={styles.cardGradient}
              >
                <MaterialCommunityIcons name="bank" size={24} color="#fff" />
                <Text style={styles.bankName}>{account.bank}</Text>
                <Text style={styles.accountNumber}>{account.number}</Text>
                <Text style={styles.balance}>₹{account.balance.toLocaleString()}</Text>
              </LinearGradient>
            </Card>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Title style={styles.sectionTitle}>Recent Transfers</Title>
      {recentTransfers.map((transfer) => (
        <Card key={transfer.id} style={styles.transferCard}>
          <Card.Content style={styles.transferContent}>
            <View style={styles.transferLeft}>
              <Avatar.Text size={40} label={transfer.name.substring(0, 2)} />
              <View style={styles.transferInfo}>
                <Text style={styles.transferName}>{transfer.name}</Text>
                <Text style={styles.transferAccount}>{transfer.account}</Text>
              </View>
            </View>
            <Text style={styles.transferAmount}>₹{transfer.amount}</Text>
          </Card.Content>
        </Card>
      ))}
    </Animatable.View>
  );

  const renderStep2 = () => (
    <Animatable.View animation="fadeInRight">
      <Card style={styles.transferForm}>
        <Card.Content>
          <TextInput
            label="Account Number"
            value={accountNumber}
            onChangeText={setAccountNumber}
            style={styles.input}
            keyboardType="numeric"
          />
          <TextInput
            label="IFSC Code"
            value={ifscCode}
            onChangeText={setIfscCode}
            style={styles.input}
          />
          <TextInput
            label="Amount"
            value={amount}
            onChangeText={setAmount}
            style={styles.input}
            keyboardType="numeric"
            left={<TextInput.Affix text="₹" />}
          />
          <Button
            mode="contained"
            onPress={handleTransfer}
            loading={loading}
            style={styles.button}
          >
            Transfer Money
          </Button>
        </Card.Content>
      </Card>
    </Animatable.View>
  );

  const renderStep3 = () => (
    <Animatable.View animation="zoomIn" style={styles.successContainer}>
      <MaterialCommunityIcons name="check-circle" size={80} color="#4CAF50" />
      <Title style={styles.successTitle}>Transfer Successful!</Title>
      <Text style={styles.successText}>
        ₹{amount} has been transferred successfully
      </Text>
      <Button
        mode="contained"
        onPress={() => {
          setStep(1);
          setAmount('');
          setAccountNumber('');
          setIfscCode('');
        }}
        style={styles.button}
      >
        Make Another Transfer
      </Button>
    </Animatable.View>
  );

  return (
    <ScrollView style={styles.container}>
      <LinearGradient colors={['#4C49ED', '#5D5FEF']} style={styles.header}>
        <Title style={styles.headerTitle}>Transfer Money</Title>
        <View style={styles.stepsContainer}>
          <Chip
            selected={step >= 1}
            style={styles.stepChip}
            textStyle={styles.stepText}
          >
            1. Select Account
          </Chip>
          <Chip
            selected={step >= 2}
            style={styles.stepChip}
            textStyle={styles.stepText}
          >
            2. Transfer Details
          </Chip>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
      </View>

      {step === 1 && selectedAccount && (
        <Button
          mode="contained"
          onPress={() => setStep(2)}
          style={styles.floatingButton}
        >
          Continue
        </Button>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
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
  stepsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  stepChip: {
    marginHorizontal: 5,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  stepText: {
    color: '#fff',
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 15,
  },
  accountCard: {
    width: width * 0.7,
    marginRight: 15,
    elevation: 4,
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: '#4C49ED',
  },
  cardGradient: {
    padding: 20,
    borderRadius: 12,
  },
  bankName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  accountNumber: {
    color: '#fff',
    opacity: 0.8,
    marginTop: 5,
  },
  balance: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 15,
  },
  transferCard: {
    marginBottom: 10,
    elevation: 2,
  },
  transferContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transferLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transferInfo: {
    marginLeft: 10,
  },
  transferName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  transferAccount: {
    color: '#666',
  },
  transferAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4C49ED',
  },
  transferForm: {
    padding: 10,
    elevation: 4,
  },
  input: {
    marginBottom: 15,
    backgroundColor: 'transparent',
  },
  button: {
    marginTop: 10,
    backgroundColor: '#4C49ED',
  },
  floatingButton: {
    margin: 20,
    backgroundColor: '#4C49ED',
  },
  successContainer: {
    alignItems: 'center',
    padding: 20,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#4CAF50',
  },
  successText: {
    fontSize: 16,
    color: '#666',
    marginVertical: 20,
  },
});