import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  TouchableOpacity, 
  Alert,
  Dimensions 
} from 'react-native';
import { 
  Text,
  Title,
  ActivityIndicator,
  Card
} from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

const { width } = Dimensions.get('window');

// Simulated QR code data
const DEMO_QR_DATA = [
  { payeeName: "John Doe", upiId: "johndoe@upi", amount: "500", note: "Lunch" },
  { payeeName: "Coffee Shop", upiId: "coffee@upi", amount: "150", note: "Coffee" },
  { payeeName: "Grocery Store", upiId: "grocery@upi", amount: "1200", note: "Groceries" }
];

export default function ScanQR() {
    const [scanned, setScanned] = useState(false);
    const [paymentInfo, setPaymentInfo] = useState(null);
    const [loading, setLoading] = useState(false);

    // Simulate QR code scan
    const simulateScan = () => {
        setScanned(true);
        // Randomly select a demo payment
        const randomPayment = DEMO_QR_DATA[Math.floor(Math.random() * DEMO_QR_DATA.length)];
        setPaymentInfo(randomPayment);
    };

    const handlePayment = async () => {
        setLoading(true);
        try {
            // Simulate payment processing
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            Alert.alert(
                'Payment Successful! 🎉',
                `₹${paymentInfo.amount} sent to ${paymentInfo.payeeName}`,
                [{ text: 'OK', onPress: () => resetScanner() }]
            );
        } catch (error) {
            Alert.alert('Payment Failed', 'Please try again');
        } finally {
            setLoading(false);
        }
    };

    const resetScanner = () => {
        setScanned(false);
        setPaymentInfo(null);
    };

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            {!scanned ? (
                <Animatable.View 
                    animation="fadeIn"
                    style={styles.scannerContainer}
                >
                    <LinearGradient
                        colors={['#4C49ED', '#5D5FEF']}
                        style={styles.header}
                    >
                        <Title style={styles.headerTitle}>Scan & Pay</Title>
                    </LinearGradient>
                    
                    {/* Simulated Scanner View */}
                    <View style={styles.simulatedScanner}>
                        <View style={styles.overlay}>
                            <View style={styles.scanFrame}>
                                <MaterialCommunityIcons 
                                    name="qrcode-scan" 
                                    size={100} 
                                    color="#fff" 
                                />
                            </View>
                        </View>
                        <TouchableOpacity 
                            style={styles.scanButton}
                            onPress={simulateScan}
                        >
                            <Text style={styles.scanButtonText}>
                                Tap to Simulate Scan
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Animatable.View>
            ) : (
                // Payment Details View (keep existing code)
                <Animatable.View 
                    animation="fadeInUpBig"
                    style={styles.paymentContainer}
                >
                    <Card style={styles.paymentCard}>
                        <Card.Content>
                            <Title style={styles.cardTitle}>Payment Details</Title>
                            <View style={styles.detailsContainer}>
                                {/* ... existing payment details code ... */}
                                <View style={styles.detailRow}>
                                    <MaterialCommunityIcons name="account" size={24} color="#4C49ED" />
                                    <Text style={styles.detailText}>
                                        {paymentInfo?.payeeName}
                                    </Text>
                                </View>
                                <View style={styles.detailRow}>
                                    <MaterialCommunityIcons name="at" size={24} color="#4C49ED" />
                                    <Text style={styles.detailText}>
                                        {paymentInfo?.upiId}
                                    </Text>
                                </View>
                                <View style={styles.detailRow}>
                                    <MaterialCommunityIcons name="currency-inr" size={24} color="#4C49ED" />
                                    <Text style={styles.detailText}>
                                        ₹{paymentInfo?.amount}
                                    </Text>
                                </View>
                                {paymentInfo?.note && (
                                    <View style={styles.detailRow}>
                                        <MaterialCommunityIcons name="note-text" size={24} color="#4C49ED" />
                                        <Text style={styles.detailText}>
                                            {paymentInfo.note}
                                        </Text>
                                    </View>
                                )}
                            </View>
                            <TouchableOpacity
                                style={[styles.payButton, loading && styles.payButtonDisabled]}
                                onPress={handlePayment}
                                disabled={loading}
                            >
                                {loading ? (
                                    <ActivityIndicator color="#fff" />
                                ) : (
                                    <Text style={styles.payButtonText}>Pay Now</Text>
                                )}
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={styles.cancelButton} 
                                onPress={resetScanner}
                                disabled={loading}
                            >
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </TouchableOpacity>
                        </Card.Content>
                    </Card>
                </Animatable.View>
            )}
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    header: {
        padding: 20,
        paddingTop: 60,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    headerTitle: {
        color: '#fff',
        fontSize: 24,
        textAlign: 'center',
    },
    scannerContainer: {
        flex: 1,
    },
    scanner: {
        flex: 1,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    scanFrame: {
        width: width * 0.7,
        height: width * 0.7,
        borderWidth: 2,
        borderColor: '#fff',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scanText: {
        position: 'absolute',
        bottom: 50,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: '#fff',
        fontSize: 16,
        backgroundColor: 'rgba(0,0,0,0.7)',
        padding: 15,
    },
    paymentContainer: {
        flex: 1,
        padding: 20,
    },
    paymentCard: {
        borderRadius: 15,
        elevation: 4,
    },
    cardTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#4C49ED',
    },
    detailsContainer: {
        backgroundColor: '#f8f8f8',
        padding: 20,
        borderRadius: 12,
        marginBottom: 20,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    detailText: {
        fontSize: 16,
        marginLeft: 10,
        flex: 1,
    },
    payButton: {
        backgroundColor: '#4C49ED',
        padding: 15,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 10,
    },
    payButtonDisabled: {
        opacity: 0.7,
    },
    payButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    cancelButton: {
        padding: 15,
        borderRadius: 12,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#FF4444',
    },
    cancelButtonText: {
        color: '#FF4444',
        fontSize: 18,
        fontWeight: 'bold',
    },
    permissionText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginTop: 10,
    },
    retryButton: {
        marginTop: 20,
        padding: 15,
        backgroundColor: '#4C49ED',
        borderRadius: 12,
    },
    retryButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    simulatedScanner: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    scanButton: {
        position: 'absolute',
        bottom: 100,
        backgroundColor: '#4C49ED',
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 25,
        elevation: 5,
    },
    scanButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});