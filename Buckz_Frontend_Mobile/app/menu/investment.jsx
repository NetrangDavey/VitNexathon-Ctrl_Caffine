import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

const { width } = Dimensions.get('window');

// Sample data - Replace with real data from your API
const portfolioData = {
  totalInvestment: 150000,
  currentValue: 175000,
  profit: 25000,
  profitPercentage: 16.67,
  stocks: [
    { name: 'RELIANCE', value: 50000, change: 12.5 },
    { name: 'TCS', value: 40000, change: 8.3 },
    { name: 'HDFC', value: 35000, change: -2.1 },
    { name: 'INFY', value: 25000, change: 5.4 },
  ],
  performanceData: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      data: [140000, 145000, 155000, 150000, 165000, 175000],
    }],
  }
};

// Trending stocks recommendations
const trendingStocks = [
  { symbol: 'ADANIENT', name: 'Adani Enterprises', trend: 'up', recommendation: 'Buy' },
  { symbol: 'HDFCBANK', name: 'HDFC Bank', trend: 'stable', recommendation: 'Hold' },
  { symbol: 'TATASTEEL', name: 'Tata Steel', trend: 'up', recommendation: 'Strong Buy' },
  { symbol: 'WIPRO', name: 'Wipro Ltd', trend: 'down', recommendation: 'Wait' },
];

export default function Investment() {
  const [activeTab, setActiveTab] = useState('portfolio');

  const renderPortfolioHeader = () => (
    <LinearGradient colors={['#4C49ED', '#5D5FEF']} style={styles.headerCard}>
      <Animatable.View animation="fadeIn" style={styles.portfolioInfo}>
        <Text style={styles.headerTitle}>Portfolio Value</Text>
        <Text style={styles.portfolioValue}>₹{portfolioData.currentValue.toLocaleString()}</Text>
        <View style={styles.profitSection}>
          <Text style={[styles.profitText, { color: portfolioData.profit >= 0 ? '#4CAF50' : '#FF5252' }]}>
            {portfolioData.profit >= 0 ? '+' : '-'}₹{Math.abs(portfolioData.profit).toLocaleString()}
            ({portfolioData.profitPercentage}%)
          </Text>
        </View>
      </Animatable.View>
    </LinearGradient>
  );

  const renderStocksList = () => (
    <Animatable.View animation="fadeInUp" style={styles.stocksContainer}>
      <Text style={styles.sectionTitle}>Your Investments</Text>
      {portfolioData.stocks.map((stock, index) => (
        <TouchableOpacity key={index} style={styles.stockCard}>
          <View style={styles.stockInfo}>
            <Text style={styles.stockName}>{stock.name}</Text>
            <Text style={styles.stockValue}>₹{stock.value.toLocaleString()}</Text>
          </View>
          <Text style={[styles.stockChange, { color: stock.change >= 0 ? '#4CAF50' : '#FF5252' }]}>
            {stock.change >= 0 ? '+' : ''}{stock.change}%
          </Text>
        </TouchableOpacity>
      ))}
    </Animatable.View>
  );

  const renderTrendingStocks = () => (
    <Animatable.View animation="fadeInUp" delay={300} style={styles.trendingContainer}>
      <Text style={styles.sectionTitle}>Trending Stocks</Text>
      {trendingStocks.map((stock, index) => (
        <TouchableOpacity key={index} style={styles.trendingCard}>
          <View style={styles.trendingInfo}>
            <Text style={styles.trendingSymbol}>{stock.symbol}</Text>
            <Text style={styles.trendingName}>{stock.name}</Text>
          </View>
          <View style={[styles.recommendationTag, 
            { backgroundColor: stock.recommendation === 'Buy' ? '#4CAF50' : 
              stock.recommendation === 'Hold' ? '#FFA000' : '#FF5252' }]}>
            <Text style={styles.recommendationText}>{stock.recommendation}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </Animatable.View>
  );

  const renderPerformanceChart = () => (
    <View style={styles.chartContainer}>
      <Text style={styles.sectionTitle}>Portfolio Performance</Text>
      <LineChart
        data={portfolioData.performanceData}
        width={width - 40}
        height={220}
        chartConfig={{
          backgroundColor: '#1e1e1e',
          backgroundGradientFrom: '#1e1e1e',
          backgroundGradientTo: '#1e1e1e',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(93, 95, 239, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        bezier
        style={styles.chart}
      />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {renderPortfolioHeader()}
      {renderPerformanceChart()}
      {renderStocksList()}
      {renderTrendingStocks()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  headerCard: {
    padding: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  portfolioInfo: {
    alignItems: 'center',
    padding: 20,
  },
  headerTitle: {
    fontSize: 16,
    color: '#FFF',
    opacity: 0.8,
  },
  portfolioValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFF',
    marginVertical: 10,
  },
  profitSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profitText: {
    fontSize: 18,
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 15,
  },
  stocksContainer: {
    padding: 20,
  },
  stockCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  stockInfo: {
    flex: 1,
  },
  stockName: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: '500',
  },
  stockValue: {
    fontSize: 14,
    color: '#FFF',
    opacity: 0.8,
  },
  stockChange: {
    fontSize: 16,
    fontWeight: '500',
  },
  chartContainer: {
    padding: 20,
    backgroundColor: '#1e1e1e',
    margin: 20,
    borderRadius: 16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  trendingContainer: {
    padding: 20,
  },
  trendingCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  trendingInfo: {
    flex: 1,
  },
  trendingSymbol: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: '500',
  },
  trendingName: {
    fontSize: 14,
    color: '#FFF',
    opacity: 0.8,
  },
  recommendationTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  recommendationText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '500',
  },
});