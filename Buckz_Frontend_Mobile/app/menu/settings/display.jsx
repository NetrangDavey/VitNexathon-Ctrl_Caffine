import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Card, Switch, Title, Paragraph, Button, RadioButton, Text } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

export default function DisplaySettings() {
  const [theme, setTheme] = useState('light');
  const [fontSize, setFontSize] = useState('medium');

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#FF6B6B', '#FF8E53']}
        style={styles.headerGradient}
      >
        <Title style={styles.headerTitle}>Display Settings</Title>
      </LinearGradient>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Theme</Title>
          <RadioButton.Group onValueChange={value => setTheme(value)} value={theme}>
            <View style={styles.radioItem}>
              <RadioButton value="light" />
              <Text>Light</Text>
            </View>
            <View style={styles.radioItem}>
              <RadioButton value="dark" />
              <Text>Dark</Text>
            </View>
            <View style={styles.radioItem}>
              <RadioButton value="system" />
              <Text>System Default</Text>
            </View>
          </RadioButton.Group>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Font Size</Title>
          <RadioButton.Group onValueChange={value => setFontSize(value)} value={fontSize}>
            <View style={styles.radioItem}>
              <RadioButton value="small" />
              <Text>Small</Text>
            </View>
            <View style={styles.radioItem}>
              <RadioButton value="medium" />
              <Text>Medium</Text>
            </View>
            <View style={styles.radioItem}>
              <RadioButton value="large" />
              <Text>Large</Text>
            </View>
          </RadioButton.Group>
        </Card.Content>
      </Card>

      <Button 
        mode="contained"
        style={styles.button}
        onPress={() => {}}
      >
        Apply Changes
      </Button>
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
  button: {
    margin: 16,
    paddingVertical: 8,
    backgroundColor: '#FF6B6B',
  },
});