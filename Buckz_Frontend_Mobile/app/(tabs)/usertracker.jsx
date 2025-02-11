import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Image, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { MaterialIcons } from '@expo/vector-icons';
import { BarChart } from 'react-native-chart-kit';
import { TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

const { width } = Dimensions.get('window');

// Sample user data
const userData = {
  name: "RAM SWAROOP PATEL SUPERSTAR",
  accountNumber: "**** **** 6065",
  balance: 5619225430.50,
  profileImage: "https://example.com/profile.jpg" // Replace with actual image URL
};

// Sample loans data
const loansData = [
  { lender: "RPX", amount: 50200, dueDate: "2025-04-15", status: "pending" },
  { lender: "BABU RAO", amount: 3000, dueDate: "2025-04-20", status: "pending" },
  { lender: "Ambani", amount: 2000, dueDate: "2025-04-25", status: "overdue" }
];

// Sample expenditure data for different categories
const expenditureData = {
  monthly: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [{
      data: [2000, 1500, 3000, 2500, 1800, 2200]
    }]
  },
  categories: {
    labels: ["Food", "Transport", "Shopping", "Bills", "Entertainment", "Healthcare","Education","Misc","Others"],
    datasets: [{
      data: [500, 300, 800, 1200, 400]
    }]
  }
};

// Add after other sample data
const transactionsData = [
  {
    id: '1',
    type: 'expense',
    amount: 2500,
    category: 'Food & Dining',
    date: '2024-02-11',
    note: 'Lunch with team'
  },
  {
    id: '2',
    type: 'received',
    amount: 15000,
    personName: 'John Doe',
    date: '2024-02-10',
    note: 'Project payment'
  },
  {
    id: '3',
    type: 'expense',
    amount: 1200,
    category: 'Transportation',
    date: '2024-02-09',
    note: 'Uber rides'
  },
  {
    id: '4',
    type: 'received',
    amount: 5000,
    personName: 'Sarah Smith',
    date: '2024-02-08',
    note: 'Debt repayment'
  },
  {
    id: '5',
    type: 'expense',
    amount: 3500,
    category: 'Shopping',
    date: '2024-02-07',
    note: 'New shoes'
  }
];

export default function UserTracker() {
  const [activeGraph, setActiveGraph] = useState('monthly');
  const [isSalaryModalVisible, setSalaryModalVisible] = useState(false);
  const [salary, setSalary] = useState('');
  const [salaryDate, setSalaryDate] = useState('1');
  const [userSalary, setUserSalary] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isTransactionModalVisible, setTransactionModalVisible] = useState(false);
  const [transactionType, setTransactionType] = useState('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [personName, setPersonName] = useState('');
  const [note, setNote] = useState('');
  const [transactions, setTransactions] = useState(transactionsData);

  const expenseCategories = [
    'Food & Dining',
    'Transportation',
    'Shopping',
    'Bills & Utilities',
    'Entertainment',
    'Healthcare',
    'Education',
    'Others'
  ];

  const saveSalarySettings = async () => {
    try {
      const salaryData = {
        amount: parseFloat(salary),
        date: parseInt(salaryDate),
        lastUpdated: moment().format('YYYY-MM-DD')
      };
      await AsyncStorage.setItem('salarySettings', JSON.stringify(salaryData));
      setUserSalary(salaryData);
      setSalaryModalVisible(false);
      Alert.alert('Success', 'Salary settings saved successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to save salary settings');
    }
  };

  const loadSalarySettings = async () => {
    try {
      const savedSalary = await AsyncStorage.getItem('salarySettings');
      if (savedSalary) {
        setUserSalary(JSON.parse(savedSalary));
      }
    } catch (error) {
      console.error('Error loading salary settings:', error);
    }
  };

  const saveTransactions = async (transactions) => {
    try {
      await AsyncStorage.setItem('transactions', JSON.stringify(transactions));
    } catch (error) {
      console.error('Error saving transactions:', error);
    }
  };

  const loadTransactions = async () => {
    try {
      const savedTransactions = await AsyncStorage.getItem('transactions');
      if (savedTransactions) {
        setTransactions(JSON.parse(savedTransactions));
      }
    } catch (error) {
      console.error('Error loading transactions:', error);
    }
  };

  const handleTransactionSubmit = async () => {
    try {
      if (!amount || (transactionType === 'expense' && !category) || 
          (transactionType === 'received' && !personName)) {
        Alert.alert('Error', 'Please fill all required fields');
        return;
      }

      const newTransaction = {
        id: Date.now().toString(), // Generate unique ID
        type: transactionType,
        amount: parseFloat(amount),
        category: transactionType === 'expense' ? category : null,
        personName: transactionType === 'received' ? personName : null,
        note,
        date: moment().format('YYYY-MM-DD')
      };

      const newTransactions = [newTransaction, ...transactions];
      setTransactions(newTransactions);
      await saveTransactions(newTransactions);
      
      // Update the UI
      setTransactionModalVisible(false);
      resetForm();
      Alert.alert('Success', 'Transaction recorded successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to save transaction');
    }
  };
  
  const resetForm = () => {
    setAmount('');
    setCategory('');
    setPersonName('');
    setNote('');
  };

  useEffect(() => {
    loadSalarySettings();
    loadTransactions();
  }, []);

  const renderUserHeader = () => (
    <LinearGradient colors={['#4C49ED', '#5D5FEF']} style={styles.headerCard}>
      <Animatable.View animation="fadeIn" style={styles.userInfo}>
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <MaterialIcons name="account-circle" size={60} color="#FFF" />
          </View>
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{userData.name}</Text>
            <Text style={styles.accountNumber}>Acc: {userData.accountNumber}</Text>
          </View>
        </View>
        <View style={styles.balanceSection}>
          <Text style={styles.balanceLabel}>Available Balance</Text>
          <Text style={styles.balanceAmount}>₹{userData.balance.toLocaleString()}</Text>
        </View>
      </Animatable.View>
    </LinearGradient>
  );

  const renderSalaryModal = () => (
    <Modal
      isVisible={isSalaryModalVisible}
      onBackdropPress={() => setSalaryModalVisible(false)}
      animationIn="slideInUp"
      animationOut="slideOutDown"
    >
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Set Monthly Salary</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Monthly Salary"
          keyboardType="numeric"
          value={salary}
          onChangeText={setSalary}
        />
        <TextInput
          style={styles.input}
          placeholder="Salary Credit Date (1-31)"
          keyboardType="numeric"
          value={salaryDate}
          onChangeText={setSalaryDate}
        />
        <View style={styles.modalButtons}>
          <TouchableOpacity
            style={[styles.modalButton, styles.cancelButton]}
            onPress={() => setSalaryModalVisible(false)}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.modalButton, styles.saveButton]}
            onPress={saveSalarySettings}
          >
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  const renderTransactionModal = () => (
    <Modal
      isVisible={isTransactionModalVisible}
      onBackdropPress={() => setTransactionModalVisible(false)}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      style={styles.modalView}
    >
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Add Transaction</Text>
        
        <View style={styles.segmentControl}>
          <TouchableOpacity 
            style={[
              styles.segmentButton,
              transactionType === 'expense' && styles.activeSegment
            ]}
            onPress={() => setTransactionType('expense')}
          >
            <Text style={[
              styles.segmentText,
              transactionType === 'expense' && styles.activeSegmentText
            ]}>Expense</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[
              styles.segmentButton,
              transactionType === 'received' && styles.activeSegment
            ]}
            onPress={() => setTransactionType('received')}
          >
            <Text style={[
              styles.segmentText,
              transactionType === 'received' && styles.activeSegmentText
            ]}>Received</Text>
          </TouchableOpacity>
        </View>
  
        <TextInput
          style={styles.input}
          placeholder="Enter Amount"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />
  
        {transactionType === 'expense' ? (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
            {expenseCategories.map((cat, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.categoryChip,
                  category === cat && styles.selectedCategoryChip
                ]}
                onPress={() => setCategory(cat)}
              >
                <Text style={[
                  styles.categoryChipText,
                  category === cat && styles.selectedCategoryChipText
                ]}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        ) : (
          <TextInput
            style={styles.input}
            placeholder="Enter Person's Name"
            value={personName}
            onChangeText={setPersonName}
          />
        )}
  
        <TextInput
          style={[styles.input, styles.noteInput]}
          placeholder="Add Note (Optional)"
          multiline
          value={note}
          onChangeText={setNote}
        />
  
        <View style={styles.modalButtons}>
          <TouchableOpacity
            style={[styles.modalButton, styles.cancelButton]}
            onPress={() => {
              setTransactionModalVisible(false);
              resetForm();
            }}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.modalButton, styles.saveButton]}
            onPress={handleTransactionSubmit}
          >
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  const renderSalaryInfo = () => (
    <TouchableOpacity
      style={styles.salaryContainer}
      onPress={() => setSalaryModalVisible(true)}
    >
      <View style={styles.salaryHeader}>
        <Text style={styles.salaryLabel}>Monthly Salary</Text>
        {userSalary && (
          <TouchableOpacity onPress={() => setIsEditMode(true)}>
            <MaterialIcons name="edit" size={24} color="#FFF" />
          </TouchableOpacity>
        )}
      </View>
      {userSalary ? (
        <View>
          <Text style={styles.salaryAmount}>₹{userSalary.amount.toLocaleString()}</Text>
          <Text style={styles.salaryDate}>
            Credit Date: {userSalary.date}st of every month
          </Text>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.addSalaryButton}
          onPress={() => setSalaryModalVisible(true)}
        >
          <Text style={styles.addSalaryText}>+ Add Salary Details</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );

  const renderLoansSection = () => (
    <Animatable.View animation="fadeInUp" style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Active Loans</Text>
      {loansData.map((loan, index) => (
        <View key={index} style={styles.loanCard}>
          <View style={styles.loanHeader}>
            <Text style={styles.lenderName}>{loan.lender}</Text>
            <Text style={[styles.loanStatus, 
              { color: loan.status === 'overdue' ? '#e74c3c' : '#2ecc71' }]}>
              {loan.status}
            </Text>
          </View>
          <View style={styles.loanDetails}>
            <Text style={styles.loanAmount}>₹{loan.amount}</Text>
            <Text style={styles.dueDate}>Due: {loan.dueDate}</Text>
          </View>
        </View>
      ))}
    </Animatable.View>
  );

  const renderExpenditureGraphs = () => (
    <Animatable.View animation="fadeInUp" delay={300} style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Expenditure Analysis</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <BarChart
          data={expenditureData[activeGraph]}
          width={width - 40}
          height={220}
          yAxisLabel="₹"
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(76, 73, 237, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          style={styles.chart}
        />
      </ScrollView>
      <View style={styles.graphToggle}>
        <TouchableOpacity 
          style={[styles.toggleButton, activeGraph === 'monthly' && styles.activeToggle]}
          onPress={() => setActiveGraph('monthly')}>
          <Text style={styles.toggleText}>Monthly</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.toggleButton, activeGraph === 'categories' && styles.activeToggle]}
          onPress={() => setActiveGraph('categories')}>
          <Text style={styles.toggleText}>Categories</Text>
        </TouchableOpacity>
      </View>
    </Animatable.View>
  );

  const renderTransactionsList = () => (
    <Animatable.View animation="fadeInUp" delay={400} style={styles.sectionContainer}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        <TouchableOpacity onPress={() => Alert.alert('View All', 'Show all transactions screen')}>
          <Text style={styles.viewAllButton}>View All</Text>
        </TouchableOpacity>
      </View>
      
      {transactions.slice(0, 3).map((transaction, index) => (
        <Animatable.View 
          key={transaction.id}
          animation="fadeInRight"
          delay={index * 100}
          style={styles.transactionCard}
        >
          <View style={styles.transactionLeft}>
            <View style={[
              styles.transactionIcon,
              { backgroundColor: transaction.type === 'expense' ? '#FFE5E5' : '#E3FFE5' }
            ]}>
              <MaterialIcons 
                name={transaction.type === 'expense' ? 'arrow-upward' : 'arrow-downward'} 
                size={24} 
                color={transaction.type === 'expense' ? '#FF4444' : '#4CAF50'}
              />
            </View>
            <View style={styles.transactionInfo}>
              <Text style={styles.transactionTitle}>
                {transaction.type === 'expense' ? transaction.category : transaction.personName}
              </Text>
              <Text style={styles.transactionDate}>
                {moment(transaction.date).format('MMM DD, YYYY')}
              </Text>
            </View>
          </View>
          <View style={styles.transactionRight}>
            <Text style={[
              styles.transactionAmount,
              { color: transaction.type === 'expense' ? '#FF4444' : '#4CAF50' }
            ]}>
              {transaction.type === 'expense' ? '-' : '+'}₹{transaction.amount}
            </Text>
            {transaction.note && (
              <Text style={styles.transactionNote} numberOfLines={1}>
                {transaction.note}
              </Text>
            )}
          </View>
        </Animatable.View>
      ))}
    </Animatable.View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {renderUserHeader()}
        {renderSalaryInfo()}
        {renderLoansSection()}
        {renderTransactionsList()}
        {renderExpenditureGraphs()}
      </ScrollView>
      {renderSalaryModal()}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setTransactionModalVisible(true)}
      >
        <MaterialIcons name="add" size={30} color="#FFF" />
      </TouchableOpacity>
      {renderTransactionModal()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  headerCard: {
    padding: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 20,
  },
  userInfo: {
    marginTop: 20,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImageContainer: {
    marginRight: 15,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  accountNumber: {
    fontSize: 14,
    color: '#FFF',
    opacity: 0.8,
  },
  balanceSection: {
    marginTop: 10,
  },
  balanceLabel: {
    fontSize: 14,
    color: '#FFF',
    opacity: 0.8,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
  },
  sectionContainer: {
    margin: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#2d3436',
  },
  loanCard: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2,
  },
  loanHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lenderName: {
    fontSize: 16,
    fontWeight: '500',
  },
  loanStatus: {
    fontSize: 12,
    fontWeight: '500',
  },
  loanDetails: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  loanAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4C49ED',
  },
  dueDate: {
    fontSize: 14,
    color: '#636e72',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  graphToggle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  toggleButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: '#dfe6e9',
  },
  activeToggle: {
    backgroundColor: '#4C49ED',
  },
  toggleText: {
    color: '#2d3436',
    fontWeight: '500',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#4C49ED',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  saveButton: {
    backgroundColor: '#4C49ED',
  },
  cancelButton: {
    backgroundColor: '#e74c3c',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  salaryContainer: {
    backgroundColor: 'rgba(4, 3, 3, 0.58)',
    marginLeft:20,marginRight: 20,
    padding: 15,
    borderRadius: 12,
    marginTop: 15,
  },
  salaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  salaryLabel: {
    fontSize: 16,
    color: '#FFF',
    opacity: 0.8,
  },
  salaryAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginTop: 5,
  },
  salaryDate: {
    fontSize: 14,
    color: '#FFF',
    opacity: 0.8,
    marginTop: 5,
  },
  addSalaryButton: {
    borderWidth: 1,
    borderColor: '#FFF',
    borderStyle: 'dashed',
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  addSalaryText: {
    color: '#FFF',
    fontSize: 16,
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4C49ED',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  modalView: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  segmentControl: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  segmentButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeSegment: {
    borderBottomColor: '#4C49ED',
  },
  segmentText: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  activeSegmentText: {
    color: '#4C49ED',
  },
  categoryScroll: {
    marginBottom: 15,
  },
  categoryChip: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: '#ecf0f1',
    marginRight: 10,
  },
  selectedCategoryChip: {
    backgroundColor: '#4C49ED',
  },
  categoryChipText: {
    color: '#7f8c8d',
  },
  selectedCategoryChipText: {
    color: '#FFF',
  },
  noteInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  viewAllButton: {
    color: '#4C49ED',
    fontSize: 14,
    fontWeight: '600',
  },
  transactionCard: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d3436',
  },
  transactionDate: {
    fontSize: 12,
    color: '#636e72',
    marginTop: 4,
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  transactionNote: {
    fontSize: 12,
    color: '#636e72',
    marginTop: 4,
    maxWidth: 150,
  },
});