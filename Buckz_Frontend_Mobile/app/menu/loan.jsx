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
  ProgressBar,
  DataTable,
  Button,
  Portal,
  Modal,
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { LineChart } from 'react-native-chart-kit';

const { width } = Dimensions.get('window');

// Sample loan data
const loanDetails = {
  principal: 500000,
  interestRate: 8.5,
  tenure: 36, // months
  startDate: '2024-01-15',
  emiAmount: 15750,
  paidEMIs: 2,
  remainingAmount: 468500,
  totalInterest: 67000,
  nextEMIDate: '2024-03-15',
  inflationRate: 6.2,
};

// Sample EMI history
const emiHistory = [
  { id: 1, date: '2024-01-15', amount: 15750, principal: 12500, interest: 3250 },
  { id: 2, date: '2024-02-15', amount: 15750, principal: 12750, interest: 3000 },
];

const chartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [{
    data: [500000, 468500, 455750, 443000, 430250, 417500],
  }],
};

export default function LoanScreen() {
  const [showEMIDetails, setShowEMIDetails] = useState(false);
  const [loading, setLoading] = useState(false);

  const progressPercentage = 
    ((loanDetails.principal - loanDetails.remainingAmount) / loanDetails.principal);

  const handlePayEMI = () => {
    setLoading(true);
    // Simulate EMI payment
    setTimeout(() => {
      setLoading(false);
      // Show success message
    }, 2000);
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient colors={['#4C49ED', '#5D5FEF']} style={styles.header}>
        <Animatable.View animation="fadeIn">
          <Title style={styles.headerTitle}>Loan Dashboard</Title>
          <Text style={styles.headerSubtitle}>Track and manage your loan</Text>
        </Animatable.View>
      </LinearGradient>

      <Animatable.View animation="fadeInUp" style={styles.content}>
        {/* Loan Progress Card */}
        <Card style={styles.progressCard}>
          <Card.Content>
            <View style={styles.amountRow}>
              <Text style={styles.amountLabel}>Loan Amount</Text>
              <Text style={styles.amountValue}>
                ₹{loanDetails.principal.toLocaleString()}
              </Text>
            </View>
            <ProgressBar 
              progress={progressPercentage} 
              color="#4C49ED" 
              style={styles.progressBar} 
            />
            <View style={styles.progressDetails}>
              <View style={styles.progressItem}>
                <Text style={styles.progressLabel}>Paid</Text>
                <Text style={styles.progressValue}>
                  ₹{(loanDetails.principal - loanDetails.remainingAmount).toLocaleString()}
                </Text>
              </View>
              <View style={styles.progressItem}>
                <Text style={styles.progressLabel}>Remaining</Text>
                <Text style={styles.progressValue}>
                  ₹{loanDetails.remainingAmount.toLocaleString()}
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* EMI Details Card */}
        <Card style={styles.emiCard}>
          <Card.Content>
            <Title style={styles.cardTitle}>EMI Details</Title>
            <View style={styles.emiGrid}>
              <View style={styles.emiItem}>
                <MaterialCommunityIcons name="calendar" size={24} color="#4C49ED" />
                <Text style={styles.emiLabel}>Next EMI Date</Text>
                <Text style={styles.emiValue}>{loanDetails.nextEMIDate}</Text>
              </View>
              <View style={styles.emiItem}>
                <MaterialCommunityIcons name="cash" size={24} color="#4C49ED" />
                <Text style={styles.emiLabel}>EMI Amount</Text>
                <Text style={styles.emiValue}>₹{loanDetails.emiAmount}</Text>
              </View>
              <View style={styles.emiItem}>
                <MaterialCommunityIcons name="percent" size={24} color="#4C49ED" />
                <Text style={styles.emiLabel}>Interest Rate</Text>
                <Text style={styles.emiValue}>{loanDetails.interestRate}%</Text>
              </View>
              <View style={styles.emiItem}>
                <MaterialCommunityIcons name="chart-line" size={24} color="#4C49ED" />
                <Text style={styles.emiLabel}>Inflation Impact</Text>
                <Text style={styles.emiValue}>{loanDetails.inflationRate}%</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Loan Chart */}
        <Card style={styles.chartCard}>
          <Card.Content>
            <Title style={styles.cardTitle}>Loan Progress</Title>
            <LineChart
              data={chartData}
              width={width - 60}
              height={220}
              chartConfig={{
                backgroundColor: '#fff',
                backgroundGradientFrom: '#fff',
                backgroundGradientTo: '#fff',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(76, 73, 237, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: '#4C49ED',
                },
              }}
              bezier
              style={styles.chart}
            />
          </Card.Content>
        </Card>

        {/* EMI History */}
        <Card style={styles.historyCard}>
          <Card.Content>
            <Title style={styles.cardTitle}>EMI History</Title>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Date</DataTable.Title>
                <DataTable.Title numeric>Principal</DataTable.Title>
                <DataTable.Title numeric>Interest</DataTable.Title>
                <DataTable.Title numeric>Total</DataTable.Title>
              </DataTable.Header>

              {emiHistory.map((emi) => (
                <DataTable.Row key={emi.id}>
                  <DataTable.Cell>{emi.date}</DataTable.Cell>
                  <DataTable.Cell numeric>₹{emi.principal}</DataTable.Cell>
                  <DataTable.Cell numeric>₹{emi.interest}</DataTable.Cell>
                  <DataTable.Cell numeric>₹{emi.amount}</DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>
          </Card.Content>
        </Card>

        <Button
          mode="contained"
          onPress={handlePayEMI}
          loading={loading}
          style={styles.payButton}
        >
          Pay EMI Now
        </Button>
      </Animatable.View>
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
  progressCard: {
    borderRadius: 15,
    elevation: 4,
    marginBottom: 15,
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  amountLabel: {
    fontSize: 16,
    color: '#666',
  },
  amountValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4C49ED',
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  progressDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  progressItem: {
    alignItems: 'center',
  },
  progressLabel: {
    fontSize: 14,
    color: '#666',
  },
  progressValue: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  emiCard: {
    borderRadius: 15,
    elevation: 4,
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  emiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  emiItem: {
    width: '48%',
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: 'center',
  },
  emiLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
  emiValue: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  chartCard: {
    borderRadius: 15,
    elevation: 4,
    marginBottom: 15,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  historyCard: {
    borderRadius: 15,
    elevation: 4,
    marginBottom: 15,
  },
  payButton: {
    backgroundColor: '#4C49ED',
    marginVertical: 20,
    borderRadius: 12,
    elevation: 4,
  },
});