import React, { useState } from 'react';
import {
    Text,
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { useTheme } from '../../context/ThemeContext';

const { width } = Dimensions.get('window');

const CustomButton = ({ onPress, loading, disabled, children, style }) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        {
          backgroundColor: colors.primary,
          padding: 15,
          borderRadius: 12,
          alignItems: 'center',
          opacity: disabled ? 0.7 : 1
        },
        style
      ]}
    >
      {loading ? (
        <ActivityIndicator color={colors.white} />
      ) : (
        <Text style={{ color: colors.white, fontSize: 16, fontWeight: 'bold' }}>
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
};

// Predefined amounts and payment methods remain the same
const quickAmounts = [500, 1000, 2000, 5000];

const paymentMethods = [
  { id: '1', name: 'Debit Card', icon: 'credit-card' },
  { id: '2', name: 'UPI', icon: 'qrcode' },
  { id: '3', name: 'Net Banking', icon: 'bank' },
  { id: '4', name: 'Credit Card', icon: 'credit-card-plus' },
];

export default function AddMoney() {
  const { colors } = useTheme();
  const [amount, setAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAddMoney = async () => {
    if (!amount || !selectedMethod) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowSuccess(true);
    }, 2000);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <LinearGradient colors={[colors.primary, colors.secondary]} style={styles.header}>
        <Animatable.View animation="fadeIn">
          <Text style={styles.headerTitle}>Add Money</Text>
          <Text style={styles.headerSubtitle}>Add money to your wallet instantly</Text>
        </Animatable.View>
      </LinearGradient>

      <Animatable.View animation="fadeInUp" style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Enter Amount</Text>
          <TextInput
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            style={styles.amountInput}
            placeholder="Enter amount"
            placeholderTextColor="#999"
          />
          
          <View style={styles.quickAmounts}>
            {quickAmounts.map((quickAmount) => (
              <TouchableOpacity
                key={quickAmount}
                onPress={() => setAmount(quickAmount.toString())}
                style={[
                  styles.amountChip,
                  amount === quickAmount.toString() && { backgroundColor: colors.primary }
                ]}
              >
                <Text style={[
                  styles.amountChipText,
                  amount === quickAmount.toString() && { color: colors.white }
                ]}>
                  ₹{quickAmount}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Payment methods grid */}
        <Text style={styles.sectionTitle}>Payment Method</Text>
        <View style={styles.methodsGrid}>
          {paymentMethods.map((method) => (
            <TouchableOpacity
              key={method.id}
              onPress={() => setSelectedMethod(method)}
              style={[
                styles.methodCard,
                selectedMethod?.id === method.id && { borderColor: colors.primary }
              ]}
            >
              <MaterialCommunityIcons
                name={method.icon}
                size={30}
                color={colors.primary}
              />
              <Text style={styles.methodName}>{method.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <CustomButton
          onPress={handleAddMoney}
          loading={loading}
          disabled={!amount || !selectedMethod}
          style={styles.addButton}
        >
          Add Money
        </CustomButton>
      </Animatable.View>

      <Modal
        visible={showSuccess}
        transparent
        animationType="fade"
        onRequestClose={() => setShowSuccess(false)}
      >
        <View style={styles.modalContainer}>
          <Animatable.View animation="zoomIn" style={styles.successContent}>
            <MaterialCommunityIcons name="check-circle" size={80} color="#4CAF50" />
            <Text style={styles.successTitle}>Money Added Successfully!</Text>
            <Text style={styles.successAmount}>₹{amount}</Text>
            <CustomButton
              onPress={() => {
                setShowSuccess(false);
                setAmount('');
                setSelectedMethod(null);
              }}
              style={styles.successButton}
            >
              Done
            </CustomButton>
          </Animatable.View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  headerSubtitle: {
    color: '#fff',
    opacity: 0.9,
    textAlign: 'center',
    marginTop: 5,
  },
  content: {
    padding: 20,
    marginTop: -20,
  },
  card: {
    borderRadius: 15,
    elevation: 4,
    backgroundColor: '#fff',
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 15,
  },
  amountInput: {
    fontSize: 24,
    backgroundColor: 'transparent',
  },
  quickAmounts: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 15,
    gap: 10,
  },
  amountChip: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 20,
  },
  amountChipText: {
    fontSize: 16,
  },
  methodsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  methodCard: {
    width: width * 0.44,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
    elevation: 2,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  methodName: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '500',
  },
  addButton: {
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  successContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginTop: 20,
  },
  successAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#4C49ED',
    marginTop: 15,
  },
  successButton: {
    marginTop: 30,
    width: '100%',
  },
});