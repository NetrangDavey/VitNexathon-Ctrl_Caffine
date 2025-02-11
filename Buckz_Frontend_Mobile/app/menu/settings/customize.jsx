import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Card, Title, Paragraph, Button, Snackbar, RadioButton, Text, ColorPicker } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';

export default function CustomizeSettings() {
  const [layout, setLayout] = useState('grid');
  const [accent, setAccent] = useState('#1DA1F2');
  const [showSnackbar, setShowSnackbar] = useState(false);

  const layouts = [
    { label: 'Grid View', value: 'grid' },
    { label: 'List View', value: 'list' },
    { label: 'Compact View', value: 'compact' }
  ];

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#1DA1F2', '#0D8ECF']}
        style={styles.headerGradient}
      >
        <Title style={styles.headerTitle}>Customize Your Experience</Title>
      </LinearGradient>

      <Animatable.View animation="fadeIn" duration={1000}>
        <Card style={styles.card}>
          <Card.Content>
            <Title>Layout Preferences</Title>
            <RadioButton.Group onValueChange={value => setLayout(value)} value={layout}>
              {layouts.map((item) => (
                <View key={item.value} style={styles.radioItem}>
                  <RadioButton value={item.value} />
                  <Text>{item.label}</Text>
                </View>
              ))}
            </RadioButton.Group>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Title>Quick Actions</Title>
            <View style={styles.quickActions}>
              {['Transfer', 'Pay Bills', 'Investments'].map((action) => (
                <Button 
                  key={action}
                  mode="outlined" 
                  style={styles.actionButton}
                >
                  {action}
                </Button>
              ))}
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Title>Widget Settings</Title>
            <Paragraph>Choose widgets to display on your dashboard</Paragraph>
            <View style={styles.widgetGrid}>
              {['Balance', 'Transactions', 'Goals', 'Budget'].map((widget) => (
                <Button 
                  key={widget}
                  mode="contained" 
                  style={[styles.widgetButton, { backgroundColor: accent }]}
                >
                  {widget}
                </Button>
              ))}
            </View>
          </Card.Content>
        </Card>
      </Animatable.View>

      <Button 
        mode="contained"
        style={[styles.saveButton, { backgroundColor: accent }]}
        onPress={() => setShowSnackbar(true)}
      >
        Save Customization
      </Button>

      <Snackbar
        visible={showSnackbar}
        onDismiss={() => setShowSnackbar(false)}
        duration={3000}
      >
        Changes saved successfully!
      </Snackbar>
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
    marginBottom: 16,
  },
  headerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  card: {
    margin: 8,
    elevation: 4,
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  widgetGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  widgetButton: {
    margin: 4,
    flex: 1,
    minWidth: '45%',
  },
  saveButton: {
    margin: 16,
    paddingVertical: 8,
  },
});