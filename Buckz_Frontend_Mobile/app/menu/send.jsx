// Language: javascript
import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  RefreshControl,
  Dimensions,
  Modal
} from 'react-native';
import {
  Card,
  Title,
  Text,
  Searchbar,
  Button,
  ActivityIndicator,
  Chip,
  TextInput,
  Avatar
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import axios from 'axios';
import { LineChart } from 'react-native-chart-kit';
import LottieView from 'lottie-react-native';
import Svg, { Path } from 'react-native-svg';
import Animated, { 
  useAnimatedProps,
  withTiming,
  useSharedValue,
  withSequence,
  withDelay,
  runOnJS
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const contacts = [
  { id: '1', name: 'HARSH SRIVASTAVA', phone: '+91 9876543210', avatar: 'HS', recent: true },
  { id: '2', name: 'NETRANG V DAVEY', phone: '+91 9876543211', avatar: 'ND', recent: true },
  { id: '3', name: 'DEEPAK MARLECHA', phone: '+91 9876543212', avatar: 'DM', recent: true },
  { id: '4', name: 'RAMSWAROOP PATEL', phone: '+91 9876543213', avatar: 'RP', recent: true },
];

const AnimatedPath = Animated.createAnimatedComponent(Path);

const SuccessCheckmark = () => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withSequence(
      withTiming(1, { duration: 500 }),
      withDelay(100, withTiming(0, { duration: 300 }))
    );
  }, []);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: 100 - (progress.value * 100),
  }));

  return (
    <Svg width="100" height="100" viewBox="0 0 100 100">
      <AnimatedPath
        d="M20 50l20 20 40-40"
        stroke="#4C49ED"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        strokeDasharray={100}
        animatedProps={animatedProps}
      />
    </Svg>
  );
};

export default function SendMoney() {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSend = async () => {
    if (!selectedUser || !amount || amount <= 0) {
      return;
    }

    setLoading(true);
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      setShowSuccess(true);
      // Reset form after success
      setTimeout(() => {
        setShowSuccess(false);
        setSelectedUser(null);
        setAmount('');
        setNote('');
      }, 3000);
    }, 1500);
  };

  const renderSuccessModal = () => (
    <Modal
      visible={showSuccess}
      transparent
      animationType="fade"
      onRequestClose={() => setShowSuccess(false)}
    >
      <View style={styles.modalContainer}>
        <Animatable.View 
          animation="zoomIn" 
          style={styles.successCard}
        >
          <View style={styles.checkmarkContainer}>
            <SuccessCheckmark />
          </View>
          <Title style={styles.successTitle}>Payment Successful!</Title>
          <Text style={styles.successText}>
            ₹{amount} sent to {selectedUser?.name}
          </Text>
          <Button
            mode="contained"
            onPress={() => setShowSuccess(false)}
            style={styles.doneButton}
          >
            Done
          </Button>
        </Animatable.View>
      </View>
    </Modal>
  );

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#4C49ED', '#5D5FEF']}
        style={styles.headerGradient}
      >
        <Title style={styles.headerTitle}>Send Money</Title>
      </LinearGradient>

      <Animatable.View animation="fadeInUp" style={styles.contentContainer}>
        <Card style={styles.mainCard}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.contactsScroll}
          >
            {contacts
              .filter(contact => 
                contact.name.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((contact) => (
                <TouchableOpacity
                  key={contact.id}
                  onPress={() => setSelectedUser(contact)}
                  style={styles.contactButton}
                >
                  <Avatar.Text 
                    size={60} 
                    label={contact.avatar}
                    style={[
                      styles.avatar,
                      selectedUser?.id === contact.id && styles.selectedAvatar
                    ]}
                  />
                  <Text style={styles.contactName}>{contact.name}</Text>
                </TouchableOpacity>
              ))}
          </ScrollView>

          <Card.Content>
            <View style={styles.amountContainer}>
              <Text style={styles.currencySymbol}>₹</Text>
              <TextInput
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
                style={styles.amountInput}
                placeholder="0.00"
                theme={{ colors: { primary: '#4C49ED' }}}
              />
            </View>

            <TextInput
              label="Add a note"
              value={note}
              onChangeText={setNote}
              style={styles.noteInput}
              multiline
              numberOfLines={2}
            />

            <Button
              mode="contained"
              onPress={handleSend}
              loading={loading}
              disabled={!selectedUser || !amount || loading}
              style={styles.sendButton}
              contentStyle={styles.sendButtonContent}
            >
              {loading ? 'Processing...' : 'Send Money'}
            </Button>
          </Card.Content>
        </Card>
      </Animatable.View>

      {renderSuccessModal()}
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
    paddingTop: 60,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  searchBar: {
    marginHorizontal: 20,
    borderRadius: 12,
    elevation: 4,
  },
  content: {
    padding: 16,
  },
  tabContainer: {
    paddingVertical: 16,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
    marginTop: -20,
    borderRadius: 20,
    marginHorizontal: 16,
    elevation: 4,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  activeTab: {
    backgroundColor: '#4C49ED',
  },
  tabText: {
    color: '#666',
    fontWeight: 'bold',
  },
  activeTabText: {
    color: '#fff',
  },
  stockCard: {
    marginBottom: 12,
    borderRadius: 12,
    elevation: 4,
  },
  stockHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stockName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  stockDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 12,
  },
  change: {
    fontSize: 16,
    fontWeight: '500',
  },
  volumeContainer: {
    marginTop: 8,
  },
  volume: {
    color: '#666',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 16,
    color: '#333',
  },
  loader: {
    marginTop: 40,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    width: width * 0.8,
  },
  successAnimation: {
    width: 150,
    height: 150,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4C49ED',
    marginTop: 20,
  },
  successText: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
  },
  doneButton: {
    marginTop: 20,
    width: '100%',
    backgroundColor: '#4C49ED',
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 20,
    marginTop: 10,
  },
  contentContainer: {
    padding: 16,
  },
  mainCard: {
    marginBottom: 12,
    borderRadius: 12,
    elevation: 4,
  },
  contactsScroll: {
    marginBottom: 16,
  },
  contactButton: {
    alignItems: 'center',
    marginHorizontal: 8,
  },
  avatar: {
    backgroundColor: '#4C49ED',
  },
  selectedAvatar: {
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  contactName: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: 'bold',
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  currencySymbol: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
  },
  noteInput: {
    marginBottom: 16,
  },
  sendButton: {
    backgroundColor: '#4C49ED',
  },
  sendButtonContent: {
    paddingVertical: 8,
  },
  checkmarkContainer: {
    marginBottom: 20,
  },
  checkmarkContainer: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
    borderRadius: 50,
    marginBottom: 20,
  },
  successCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    width: width * 0.8,
    elevation: 5,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4C49ED',
    marginTop: 20,
  },
  successText: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
    textAlign: 'center',
  },
  doneButton: {
    marginTop: 20,
    width: '100%',
    backgroundColor: '#4C49ED',
  },
});
