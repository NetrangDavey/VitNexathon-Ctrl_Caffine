import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, Pressable, Dimensions } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Text, View } from '@/components/Themed';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import axios from 'axios';
import { BASE_URL } from "../../constants/API";
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const [accountData, setAccountData] = useState({});
  const [error, setError] = useState(null);

  // Quick actions data with routes
  const quickActions = [
    { 
      icon: 'send', 
      label: 'Send', 
      route: '/menu/send',
      gradient: ['#4C49ED', '#5D5FEF']
    },
    { 
      icon: 'plus', 
      label: 'Add Money', 
      route: '/menu/add-money',
      gradient: ['#FF6B6B', '#FF8E8E']
    },
    { 
      icon: 'exchange', 
      label: 'Transfer', 
      route: '/menu/transfer',
      gradient: ['#4CAF50', '#66BB6A']
    },
    { 
      icon: 'qrcode', 
      label: 'Scan', 
      route: '/menu/scan',
      gradient: ['#FF9800', '#FFA726']
    }
  ];

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/users/7/`);
      setAccountData(response.data);
    } catch (err) {
      setError(`Failed to fetch data: ${err.message}`);
      console.error('Fetch error:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleNavigation = (route) => {
    try {
      router.push(route);
    } catch (err) {
      console.error('Navigation error:', err);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <LinearGradient colors={['#2A2D3E', '#1F1F2B']} style={styles.header}>
        <Animatable.View animation="fadeIn" style={styles.profileSection}>
          <Text style={styles.greeting}>Welcome back</Text>
          <Text style={styles.name}>{accountData.name || 'User'}</Text>
        </Animatable.View>
      </LinearGradient>

      {/* Balance Card */}
      <Animatable.View animation="fadeInUp" delay={300}>
        <Pressable onPress={() => handleNavigation('/menu/balance')}>
          <LinearGradient colors={['#4C49ED', '#5D5FEF']} style={styles.balanceCard}>
            <View style={styles.balanceHeader}>
              <FontAwesome name="bank" size={24} color="#fff" />
              <Text style={styles.balanceTitle}>Total Balance</Text>
            </View>
            <Text style={styles.balanceAmount}>
              ₹{(accountData.balance || 0).toLocaleString()}
            </Text>
          </LinearGradient>
        </Pressable>
      </Animatable.View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        {quickActions.map((action, index) => (
          <Animatable.View
            key={action.label}
            animation="zoomIn"
            delay={400 + (index * 100)}
          >
            <Pressable 
              style={styles.actionButton}
              onPress={() => handleNavigation(action.route)}
            >
              <LinearGradient
                colors={action.gradient}
                style={styles.actionGradient}
              >
                <FontAwesome name={action.icon} size={20} color="#fff" />
              </LinearGradient>
              <Text style={styles.actionLabel}>{action.label}</Text>
            </Pressable>
          </Animatable.View>
        ))}
      </View>

      {/* Financial Overview */}
      <View style={styles.overviewContainer}>
        <Animatable.View animation="fadeInLeft" delay={600}>
          <Pressable onPress={() => handleNavigation('../menu/investment')}>
            <LinearGradient
              colors={['#2C2D3E', '#1F1F2B']}
              style={styles.overviewCard}
            >
              <FontAwesome name="line-chart" size={24} color="#00ff87" />
              <Text style={styles.overviewLabel}>Investments</Text>
              <Text style={styles.overviewAmount}>
                ₹{(accountData.investments || 0).toLocaleString()}
              </Text>
            </LinearGradient>
          </Pressable>
        </Animatable.View>

        <Animatable.View animation="fadeInRight" delay={600}>
          <Pressable onPress={() => handleNavigation('../menu/loan')}>
            <LinearGradient
              colors={['#2C2D3E', '#1F1F2B']}
              style={styles.overviewCard}
            >
              <FontAwesome name="money" size={24} color="#00ff87" />
              <Text style={styles.overviewLabel}>Loan Balance</Text>
              <Text style={styles.overviewAmount}>
                ₹{(accountData.loanAmount || 0).toLocaleString()}
              </Text>
              <Text style={styles.dueDate}>
                Due: {accountData.loanDueDate || 'N/A'}
              </Text>
            </LinearGradient>
          </Pressable>
        </Animatable.View>
      </View>

      {/* Add Glowing Lines Effect */}
      <View style={styles.glowingLinesContainer}>
        <View style={[styles.glowingLine, styles.glowingLineLeft]} />
        <View style={[styles.glowingLine, styles.glowingLineRight]} />
      </View>

      {/* Footer Section */}
      <View style={styles.footer}>
        <Text style={styles.appName}>BUCKZ</Text>
        <View style={styles.divider} />
        <Text style={styles.craftedBy}>Crafted with ❤️ by</Text>
        <Text style={styles.teamName}>CTRL CAFFIENE</Text>
      </View>

      {/* Add some bottom padding for scroll */}
      <View style={{ height: 10 }} />
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
    padding: 25,
    borderRadius: 20,
    height: 120,
    elevation: 5,
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
    marginHorizontal: 5,
  },
  actionGradient: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  actionLabel: {
    color: '#fff',
    fontSize: 14,
    marginTop: 8,
    fontWeight: '500',
  },
  overviewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  overviewCard: {
    width: width * 0.43,
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 5,
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
  glowingLinesContainer: {
    height: 60,
    position: 'relative',
    marginVertical: 20,
    overflow: 'hidden',
  },
  glowingLine: {
    height: 2,
    width: width * 0.4,
    backgroundColor: '#4C49ED',
    position: 'absolute',
    top: '50%',
  },
  glowingLineLeft: {
    left: 0,
    transform: [{ rotate: '-45deg' }],
    shadowColor: '#4C49ED',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  },
  glowingLineRight: {
    right: 0,
    transform: [{ rotate: '45deg' }],
    shadowColor: '#5D5FEF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(44, 45, 62, 0.7)',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 20,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 4,
    textShadowColor: '#4C49ED',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  divider: {
    width: width * 0.3,
    height: 2,
    backgroundColor: '#4C49ED',
    marginVertical: 15,
    shadowColor: '#4C49ED',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
  },
  craftedBy: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.7,
    marginBottom: 5,
  },
  teamName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 2,
    textShadowColor: '#5D5FEF',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
});