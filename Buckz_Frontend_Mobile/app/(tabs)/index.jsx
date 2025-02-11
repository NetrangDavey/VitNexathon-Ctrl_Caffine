import React, { useState, useEffect, useContext, useRef } from 'react';
import { StyleSheet, ScrollView, Pressable, Dimensions, Image } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Text, View } from '@/components/Themed';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import axios from 'axios';
import { BASE_URL } from "../../constants/API";
const { width } = Dimensions.get('window');
export default function HomeScreen() {
  const [accountData, setAccountData] = useState({});
  const [error, setError] = useState(null);

  // API Calls
  const fetchData = async () => {
    try {
      console.log("BASE_URL:", BASE_URL);
      const response = await axios.get(`${BASE_URL}/users/7/`);
      console.log('Axios response:', response.data);
      setAccountData(response.data);
    } catch (err) {
      console.log(err);
      setError(`Failed to fetch data: ${err.message}`);
      console.error('Axios error:', err);
    } finally {
      console.log("Hgaya");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <LinearGradient colors={['#2A2D3E', '#1F1F2B']} style={styles.header}>
        <Animatable.View animation="fadeIn" style={styles.profileSection}>
          <Text style={styles.greeting}>Welcome back</Text>
          <Text style={styles.name}>{accountData.name}</Text>
          {/* <Text style={styles.accountNumber}>Acc: {accountData.accountNumber}</Text> */}
        </Animatable.View>
      </LinearGradient>

      {/* Balance Card */}
      <Animatable.View animation="fadeInUp" delay={300}>
        <LinearGradient
          colors={['#4C49ED', '#5D5FEF']}
          style={styles.balanceCard}
        >
          <View style={styles.balanceHeader}>
            <FontAwesome name="bank" size={24} color="#fff" />
            <Text style={styles.balanceTitle}>Total Balance</Text>
          </View>
          <Text style={styles.balanceAmount}>
            {/* ₹{accountData.balance?.toLocaleString()} */}
            ₹25,000
          </Text>
        </LinearGradient>
      </Animatable.View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        {[
          { icon: 'send', label: 'Send' },
          { icon: 'plus', label: 'Add Money' },
          { icon: 'exchange', label: 'Transfer' },
          { icon: 'qrcode', label: 'Scan' }
        ].map((action, index) => (
          <Animatable.View
            key={action.label}
            animation="zoomIn"
            delay={400 + (index * 100)}
          >
            <Pressable style={styles.actionButton}>
              <LinearGradient
                colors={['#2A2D3E', '#1F1F2B']}
                style={styles.actionGradient}
              >
                <FontAwesome name={action.icon} size={20} color="#00ff87" />
              </LinearGradient>
              <Text style={styles.actionLabel}>{action.label}</Text>
            </Pressable>
          </Animatable.View>
        ))}
      </View>

      {/* Financial Overview */}
      <View style={styles.overviewContainer}>
        <Animatable.View animation="fadeInLeft" delay={600}>
          <LinearGradient
            colors={['#2C2D3E', '#1F1F2B']}
            style={styles.overviewCard}
          >
            <FontAwesome name="line-chart" size={24} color="#00ff87" />
            <Text style={styles.overviewLabel}>Investments</Text>
            <Text style={styles.overviewAmount}>
              ₹{accountData.investments?.toLocaleString()}
            </Text>
          </LinearGradient>
        </Animatable.View>

        <Animatable.View animation="fadeInRight" delay={600}>
          <LinearGradient
            colors={['#2C2D3E', '#1F1F2B']}
            style={styles.overviewCard}
          >
            <FontAwesome name="money" size={24} color="#00ff87" />
            <Text style={styles.overviewLabel}>Loan Balance</Text>
            <Text style={styles.overviewAmount}>
              ₹{accountData.loanAmount?.toLocaleString()}
            </Text>
            <Text style={styles.dueDate}>Due: {accountData.loanDueDate}</Text>
          </LinearGradient>
        </Animatable.View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1B25',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  profileSection: {
    marginBottom: 20,
  },
  greeting: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.7,
  },
  name: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 5,
  },
  accountNumber: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.7,
    marginTop: 5,
  },
  balanceCard: {
    margin: 20,
    padding: 20,
    borderRadius: 20,
    height: 120,
  },
  balanceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  balanceTitle: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 10,
  },
  balanceAmount: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 10,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionGradient: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionLabel: {
    color: '#fff',
    fontSize: 12,
    marginTop: 8,
  },
  overviewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  overviewCard: {
    width: width * 0.43,
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
  },
  overviewLabel: {
    color: '#fff',
    fontSize: 14,
    marginTop: 10,
    opacity: 0.7,
  },
  overviewAmount: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5,
  },
  dueDate: {
    color: '#ff6b6b',
    fontSize: 12,
    marginTop: 5,
  },
});