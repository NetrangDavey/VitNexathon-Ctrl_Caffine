import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import axios from 'axios';

const AI_Advisor = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const flatListRef = useRef();

  const handleSendMessage = async () => {
    if (userInput.trim() === '') return; // Prevent sending empty messages

    // Add user's message to chat
    const newUserMessage = { text: userInput.trim(), sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    const inputMessage = userInput.trim();
    setUserInput(''); // Clear input field

    // Construct request body as provided
    const data = {
      messages: [
        {
          role: 'user',
          content: inputMessage
        }
      ],
      web_access: false
    };

    // Prepare RapidAPI options for axios request
    const options = {
      method: 'POST',
      url: 'https://chatgpt-42.p.rapidapi.com/chatgpt',
      headers: {
        'x-rapidapi-key': 'b7981985f4msh11301965a67a59bp105ae8jsnf0c3aa9f025e',
        'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
        'Content-Type': 'application/json'
      },
      data
    };

    try {
      const response = await axios.request(options);
      
      // Extract reply text from response - adjust according to RapidAPI response structure
      const aiText =
        typeof response.data === 'string'
          ? response.data
          : response.data?.reply || "I'm sorry, I couldn't process that.";
          
      const aiResponse = { text: aiText, sender: 'ai' };
      setMessages((prevMessages) => [...prevMessages, aiResponse]);
    } catch (error) {
      console.error(error);
      const errorResponse = { text: "Error: Couldn't connect to the AI service.", sender: 'ai' };
      setMessages((prevMessages) => [...prevMessages, errorResponse]);
    }
  };

  useEffect(() => {
    // Auto-scroll chat to the bottom when messages update
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
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 40}
    >
      <View style={styles.chatContainer}>
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item, index) => index.toString()}
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
            multiline={true}
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
    backgroundColor: '#f0f0f0'
  },
  chatContainer: {
    flex: 1
  },
  messageContainer: {
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    maxWidth: '80%'
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF'
  },
  aiMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF'
  },
  messageText: {
    color: 'black'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#fff'
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    marginRight: 10
  },
  sendButton: {
    backgroundColor: '#007AFF',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold'
  }
});

export default AI_Advisor;