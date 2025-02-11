"use client"

import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native';
import { List, Title, Text, Searchbar } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

const faqData = [
  {
    category: 'Account',
    icon: 'account-circle',
    color: '#FF6B6B',
    items: [
      {
        question: 'How do I reset my password?',
        answer: 'You can reset your password by going to the Security Settings and tapping on Change Password.',
      },
      {
        question: 'How do I update my profile?',
        answer: 'Navigate to the Profile page under Settings and tap on the profile picture or edit the fields.',
      }
    ]
  },
  {
    category: 'Security',
    icon: 'shield-check',
    color: '#4ECDC4',
    items: [
      {
        question: 'How do I enable two-factor authentication?',
        answer: 'In Security Settings, toggle the Two-Factor Authentication switch to enable or disable it.',
      },
      {
        question: 'What should I do if I suspect unauthorized access?',
        answer: 'Immediately change your password and contact our support team for assistance.',
      }
    ]
  },
  {
    category: 'Payments',
    icon: 'cash-multiple',
    color: '#45B7D1',
    items: [
      {
        question: 'How do I add a payment method?',
        answer: 'Go to Payment Settings and select "Add Payment Method" to link your bank account or card.',
      },
      {
        question: 'Are my transactions secure?',
        answer: 'Yes, all transactions are encrypted and processed through secure payment gateways.',
      }
    ]
  }
];

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategory, setExpandedCategory] = useState(null);

  const filterFAQs = (query) => {
    return faqData.map(category => ({
      ...category,
      items: category.items.filter(item =>
        item.question.toLowerCase().includes(query.toLowerCase()) ||
        item.answer.toLowerCase().includes(query.toLowerCase())
      )
    })).filter(category => category.items.length > 0);
  };

  const displayData = searchQuery ? filterFAQs(searchQuery) : faqData;

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#4C49ED', '#5D5FEF']}
        style={styles.headerGradient}
      >
        <Title style={styles.headerTitle}>How can we help?</Title>
        <Searchbar
          placeholder="Search FAQs..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
          iconColor="#4C49ED"
        />
      </LinearGradient>

      <View style={styles.content}>
        {displayData.map((category, categoryIndex) => (
          <Animatable.View
            key={category.category}
            animation="fadeInUp"
            delay={categoryIndex * 200}
          >
            <List.Accordion
              title={category.category}
              left={props => (
                <MaterialCommunityIcons
                  name={category.icon}
                  size={24}
                  color={category.color}
                />
              )}
              expanded={expandedCategory === category.category}
              onPress={() => setExpandedCategory(
                expandedCategory === category.category ? null : category.category
              )}
              style={styles.categoryAccordion}
              titleStyle={styles.categoryTitle}
            >
              {category.items.map((item, itemIndex) => (
                <Animatable.View
                  key={itemIndex}
                  animation="fadeInDown"
                  duration={300}
                >
                  <List.Accordion
                    title={item.question}
                    titleStyle={styles.questionTitle}
                    style={styles.questionAccordion}
                  >
                    <View style={styles.answerContainer}>
                      <Text style={styles.answer}>{item.answer}</Text>
                    </View>
                  </List.Accordion>
                </Animatable.View>
              ))}
            </List.Accordion>
          </Animatable.View>
        ))}
      </View>
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
    textAlign: 'center',
    marginBottom: 20,
  },
  searchBar: {
    marginHorizontal: 20,
    borderRadius: 12,
    elevation: 4,
  },
  content: {
    padding: 16,
    marginTop: -20,
  },
  categoryAccordion: {
    backgroundColor: '#fff',
    marginBottom: 12,
    borderRadius: 12,
    elevation: 2,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  questionAccordion: {
    backgroundColor: '#f8f8f8',
    marginVertical: 4,
    borderRadius: 8,
  },
  questionTitle: {
    fontSize: 16,
    color: '#444',
  },
  answerContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginHorizontal: 8,
    marginBottom: 8,
  },
  answer: {
    fontSize: 14,
    lineHeight: 20,
    color: '#666',
  },
});