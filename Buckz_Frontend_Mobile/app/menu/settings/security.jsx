import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Modal, Image, Linking } from 'react-native';
import { Card, Switch, Title, Paragraph, Button, TextInput, Snackbar } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import QRCode from 'react-native-qrcode-svg';

export default function SecuritySettings() {
  const [isBiometric, setBiometric] = useState(false);
  const [is2FA, set2FA] = useState(false);
  const [isPinEnabled, setPinEnabled] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [authCode, setAuthCode] = useState('');
  const [enrollmentData, setEnrollmentData] = useState(null);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [qrLink, setQrLink] = useState('');

  const handleSave = () => {
    setShowSnackbar(true);
  };

  const handle2FAToggle = async () => {
    if (!is2FA) {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const encodedParams = new URLSearchParams();
        encodedParams.set('secret', 'IH225HMVWDS3XJVY');
        encodedParams.set('account', 'User1'); // Should come from user context
        encodedParams.set('issuer', 'BUCKZ');
        encodedParams.set('printQR', 'true');

        const response = await axios.request({
          method: 'POST',
          url: 'https://microsoft-authenticator.p.rapidapi.com/enroll/',
          headers: {
            'x-rapidapi-key': 'b7981985f4msh11301965a67a59bp105ae8jsnf0c3aa9f025e',
            'x-rapidapi-host': 'microsoft-authenticator.p.rapidapi.com',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: encodedParams,
        });

        if (response.data && response.data.link) {
          setQrLink(response.data.link);
          setShowQRModal(true);
        } else {
          throw new Error('Invalid QR code data received');
        }
      } catch (error) {
        console.error('2FA Error:', error);
        setShowSnackbar(true);
        setSnackbarMessage(error.message || 'Failed to enable 2FA. Please try again later.');
      }
    } else {
      set2FA(false);
    }
  };

  const handleOpenLink = async () => {
    try {
      await Linking.openURL(qrLink);
    } catch (error) {
      setSnackbarMessage('Could not open the link');
      setShowSnackbar(true);
    }
  };

  const validateAuthCode = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const encodedParams = new URLSearchParams();
      encodedParams.set('secret', 'IH225HMVWDS3XJVY');
      encodedParams.set('code', authCode);

      const response = await axios.request({
        method: 'POST',
        url: 'https://microsoft-authenticator.p.rapidapi.com/validate/',
        headers: {
          'x-rapidapi-key': 'b7981985f4msh11301965a67a59bp105ae8jsnf0c3aa9f025e',
          'x-rapidapi-host': 'microsoft-authenticator.p.rapidapi.com',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: encodedParams,
      });

      if (response.data && response.data.valid) {
        set2FA(true);
        setShowQRModal(false);
        setShowSnackbar(true);
        setSnackbarMessage('2FA enabled successfully!');
      } else {
        throw new Error('Invalid authentication code');
      }
    } catch (error) {
      console.error('Validation Error:', error);
      setShowSnackbar(true);
      setSnackbarMessage(error.message || 'Failed to validate code. Please try again.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={styles.headerGradient}
      >
        <Title style={styles.headerTitle}>Security Center</Title>
      </LinearGradient>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Biometric Authentication</Title>
          <Paragraph>Use fingerprint or face recognition to login</Paragraph>
          <Switch
            value={isBiometric}
            onValueChange={() => setBiometric(!isBiometric)}
            style={styles.switch}
          />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Two-Factor Authentication</Title>
          <Paragraph>Add an extra layer of security</Paragraph>
          <Switch
            value={is2FA}
            onValueChange={handle2FAToggle}
            style={styles.switch}
          />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>PIN Lock</Title>
          <Paragraph>Enable PIN protection</Paragraph>
          <Switch
            value={isPinEnabled}
            onValueChange={() => setPinEnabled(!isPinEnabled)}
            style={styles.switch}
          />
        </Card.Content>
      </Card>

      <Button 
        mode="contained"
        style={styles.button}
        onPress={handleSave}
      >
        Save Changes
      </Button>

      <Modal visible={showQRModal} onDismiss={() => setShowQRModal(false)}>
        <View style={styles.modalContent}>
          <Title style={styles.modalTitle}>Set up 2FA</Title>
          <Paragraph style={styles.modalParagraph}>
            Scan this QR code with your authenticator app or click the button below to open the link:
          </Paragraph>
          
          {qrLink && (
            <View style={styles.qrContainer}>
              <QRCode
                value={qrLink}
                size={200}
                color="black"
                backgroundColor="white"
              />
              <Button 
                mode="contained" 
                onPress={handleOpenLink}
                style={styles.linkButton}
              >
                Open Auth Link
              </Button>
            </View>
          )}
          
          <TextInput
            label="Enter Authentication Code"
            value={authCode}
            onChangeText={setAuthCode}
            keyboardType="numeric"
            style={styles.input}
          />
          <View style={styles.buttonContainer}>
            <Button 
              mode="contained" 
              onPress={validateAuthCode}
              style={styles.verifyButton}
            >
              Verify
            </Button>
            <Button 
              mode="outlined" 
              onPress={() => setShowQRModal(false)}
              style={styles.cancelButton}
            >
              Cancel
            </Button>
          </View>
        </View>
      </Modal>

      <Snackbar
        visible={showSnackbar}
        onDismiss={() => setShowSnackbar(false)}
        duration={3000}
      >
        {snackbarMessage || 'Security settings updated successfully!'}
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
  switch: {
    alignSelf: 'flex-end',
    marginTop: -40,
  },
  button: {
    margin: 16,
    paddingVertical: 8,
    backgroundColor: '#4c669f',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 10,
  },
  modalParagraph: {
    textAlign: 'center',
    marginBottom: 20,
  },
  qrContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  linkButton: {
    marginTop: 15,
    width: '100%',
  },
  input: {
    marginTop: 20,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  verifyButton: {
    flex: 1,
    marginRight: 10,
  },
  cancelButton: {
    flex: 1,
    marginLeft: 10,
  },
});