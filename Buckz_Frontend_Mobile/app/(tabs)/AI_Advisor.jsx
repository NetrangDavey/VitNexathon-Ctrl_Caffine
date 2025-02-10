import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';

const AI_Advisor = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const flatListRef = useRef();

  const handleSendMessage = () => {
    if (userInput.trim() === '') return; // Don't send empty messages

    const newUserMessage = { text: userInput.trim(), sender: 'user' };
    setMessages([...messages, newUserMessage]);
    setUserInput(''); // Clear input after sending

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const aiResponse = { text: `You said: ${userInput.trim()}`, sender: 'ai' }; // Replace with API response
      setMessages(prevMessages => [...prevMessages, aiResponse]);
    }, 500); // Simulate API delay

  };

    useEffect(() => {
        // Scroll to the bottom when messages change
        if (flatListRef.current) {
          flatListRef.current.scrollToEnd({ animated: true });
        }
      }, [messages]);


  const renderMessage = ({ item }) => (
    <View style={[styles.messageContainer, item.sender === 'user' ? styles.userMessage : styles.aiMessage]}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 40} // Adjust as needed
    >
      <View style={styles.chatContainer}>
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item, index) => index.toString()} // Use index as key for now
          ref={flatListRef}
          onContentSizeChange={() => {
            if (messages.length > 0) {
              flatListRef.current.scrollToEnd({ animated: true });
            }
          }}
          contentContainerStyle={{ padding: 10 }}
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type your message..."
            value={userInput}
            onChangeText={setUserInput}
            multiline={true} // Allow multiline input
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0', // Light background for chat area
  },
  chatContainer: {
    flex: 1, // Takes up full available space
  },
  messageContainer: {
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    maxWidth: '80%', // Prevents messages from taking up full width
  },
  userMessage: {
    alignSelf: 'flex-end', // Align user messages to the right
    backgroundColor: '#007AFF', // Blue for user messages (iOS style)
  },
  aiMessage: {
    alignSelf: 'flex-start', // Align AI messages to the left
    backgroundColor: '#FFFFFF', // White for AI messages
  },
  messageText: {
    color: 'black',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#fff', // White background for input area
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#007AFF', // Blue send button
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AI_Advisor;