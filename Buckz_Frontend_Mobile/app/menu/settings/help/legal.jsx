"use client"

import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Dimensions } from 'react-native';
import { Card, Title, Text, Button, Provider, Portal, Modal } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const legalDocs = [
  {
    id: 1,
    title: 'Terms and Conditions',
    icon: 'file-document-outline',
    color: '#FF6B6B',
    preview: 'Our terms and conditions outline the rules and guidelines for using our services.',
    content: ` 1.1 INTRODUCTION

Welcome to Buckz (the “Platform”), operated by TEAM CTRL CAFFEINE (“we,” “us,” or “our”). These Terms and Conditions (“Terms”) govern your access to and use of our mobile application, website, and related services (collectively, the “Service”). By accessing or using the Service, you (“User”) agree to be bound by these Terms. If you do not agree, please do not access or use the Service.

 1.2 DEFINITIONS

- User: Any natural or legal person accessing the Service.
- Borrower: A User who seeks to obtain a loan via the peer-to-peer lending feature.
- Lender: A User who provides funds through the peer-to-peer lending feature.
- KYC: Know Your Customer process, which is mandatory for all Users.
- Agreement: These Terms together with any additional agreements referenced herein.

 1.3 ELIGIBILITY

- Users must be at least 18 years old.
- Users below 18 may access only the designated sections of the Platform (e.g., financial education modules) subject to parental or legal guardian consent as detailed in the Teenagers’ Agreement.
- All Users must comply with applicable Indian laws, including without limitation, the Information Technology Act, 2000, and the Indian Contract Act, 1872.

 1.4 ACCOUNT REGISTRATION & KYC

- Users are required to register and complete a KYC process, including providing government-issued identification (such as PAN, Aadhaar, address proof) and other relevant documents.
- Users are responsible for maintaining the confidentiality of their account credentials and for all activities that occur under their account.

 1.5 SERVICE USAGE

 1.5.1 Peer-to-Peer Lending

- Lenders and Borrowers engage directly on the Platform. All transactions are subject to pre-approved risk assessments, credit scoring, and legally binding loan agreements (see Section 3).
- Borrowers must commit to the repayment schedule as set forth in their Loan Agreement.

 1.5.2 Investment & Financial Advice

- The Platform may offer investment insights and financial planning information for informational purposes only.
- Such content is not a substitute for professional financial advice. Users are responsible for their own investment decisions.

 1.5.3 Personal Finance Tracking & Gamified Education

- The Platform provides tools to track personal finance data and interactive educational content, including content for minors (subject to parental consent as detailed in Section 4).

 1.6 INTELLECTUAL PROPERTY

- All intellectual property, including trademarks, logos, and content on the Platform, is the property of or licensed to Buckz.
- Unauthorized reproduction, modification, or distribution of the content is strictly prohibited.

 1.7 PAYMENT, FEES, AND CHARGES

- Fees for the use of certain features or services will be clearly disclosed before any transaction is completed.
- Users are responsible for any fees or charges incurred during the use of the Service.

 1.8 TERMINATION

- We reserve the right to suspend or terminate any User’s account for violations of these Terms or any applicable laws without prior notice.
- Users may terminate their account by following the prescribed procedure on the Platform, subject to any outstanding obligations.

 1.9 LIMITATION OF LIABILITY

- In no event shall Buckz, its affiliates, or its officers be liable for any indirect, incidental, or consequential damages, or any loss of profits arising out of or in connection with the use or inability to use the Service.
- Users agree to indemnify and hold harmless Buckz from any claims or losses arising from their use of the Service.

 1.10 DISPUTE RESOLUTION

- Any disputes arising out of or related to these Terms shall be resolved through binding arbitration in accordance with the laws of India.
- Failing an arbitration agreement, the dispute shall be subject to the exclusive jurisdiction of the courts in [Insert Jurisdiction, e.g., Mumbai, India].

 1.11 MODIFICATIONS

- Buckz reserves the right to modify or update these Terms at any time. Continued use of the Service constitutes acceptance of the modified Terms.
- Users will be notified of material changes via email or a notice on the Platform.

 1.12 GOVERNING LAW

- These Terms and all related transactions are governed by and construed in accordance with the laws of India.

 1.13 CONTACT INFORMATION

- For questions or concerns regarding these Terms, please contact us at:Email: pychunk.gov@gmail.com`
  },
  {
    id: 2,
    title: 'Privacy Policy',
    icon: 'shield-account',
    color: '#4ECDC4',
    preview: 'Learn how we collect, use, and protect your personal information.',
    content: ` 2.1 INTRODUCTION

This Privacy Policy explains how Buckz collects, uses, and discloses personal information in accordance with applicable Indian laws, including the Information Technology Act, 2000, and related regulations.

 2.2 INFORMATION COLLECTED

- **Personal Identification Data:** Name, email address, mobile number, PAN, Aadhaar, address proof, and photograph.
- **Financial Data:** Transaction histories, credit scores, and other financial details necessary for risk assessment.
- **Usage Data:** Information regarding usage patterns, device information, cookies, and log data.

 2.3 PURPOSE OF DATA COLLECTION

- To provide, maintain, and enhance the Service.
- To perform KYC and AML (Anti-Money Laundering) verification.
- To facilitate peer-to-peer lending transactions, including risk assessment and credit scoring.
- To communicate important service-related notifications and marketing information (subject to consent).
- To improve the Platform through analytics and user feedback.

 2.4 DATA SHARING & DISCLOSURE

- **Third-Party Service Providers:** Your data may be shared with trusted third-party vendors for processing payments, analytics, customer support, and other operational services.
- **Debt Recovery:** In the event of a Borrower’s default, Buckz reserves the right to share necessary personal and financial information with professional debt recovery agencies and legal representatives as permitted under Indian law.
- **Legal Compliance:** Data may be disclosed to comply with legal obligations or in response to lawful requests by public authorities.

 2.5 DATA SECURITY

- All personal data is stored and processed using industry-standard encryption protocols.
- Regular security audits and updates are implemented to protect your data from unauthorized access, disclosure, or misuse.

 2.6 USER RIGHTS

- Users may request access to, correction of, or deletion of their personal data, subject to legal and contractual limitations.
- Requests should be submitted to privacy@buckzapp.in.

 2.7 DATA RETENTION

- Personal data will be retained only as long as necessary for the purposes for which it was collected or as required by applicable law.

 2.8 CHANGES TO THIS POLICY

- Buckz reserves the right to modify this Privacy Policy at any time. Changes will be posted on the Platform and will be effective immediately upon posting.

 2.9 CONTACT

- For any questions regarding this Privacy Policy, please contact: Email: pychunk.gov@gmail.com`
  },
  {
    id: 3,
    title: 'Loan Agreement',
    icon: 'cash-multiple',
    color: '#45B7D1',
    preview: 'Details about loan terms, conditions, and repayment obligations.',
    content: `1. Loan Terms
    This agreement governs the terms and conditions of loans between lenders and borrowers.

    2. Interest Rates
    Interest rates are calculated based on risk assessment and market conditions.
    
    3. Repayment Terms
    Borrowers must adhere to the agreed-upon repayment schedule.`
  },
  {
    id: 4,
    title: 'Teens Agreement',
    icon: 'account-child',
    color: '#96CEB4',
    preview: 'Special terms and conditions for users under 18 years of age.',
    content: `## 4. TEENAGERS’ AGREEMENT WITH PARENTAL/GUARDIAN CONSENT

*This Agreement (“Teenagers’ Agreement”) is designed for Users under the age of 18 (“Minor”). Access to certain features of the Buckz Platform by a Minor is subject to prior review and approval by a parent or legal guardian.*

 4.1 PARENTAL/GUARDIAN CONSENT

- The parent or legal guardian (“Guardian”) must review and approve the use of the Platform by the Minor.
- During registration, the Guardian is required to complete a consent form and provide verifiable contact details.

 4.2 CONSENT DECLARATION

By providing consent, the Guardian declares:

> “I, [Guardian Name], hereby give my informed consent for my child, [Child’s Name], to use the Buckz Platform. I have reviewed the Terms and Conditions, Privacy Policy, and Teenagers’ Agreement and accept all the obligations and restrictions set forth herein.”
> 

 4.3 USAGE RESTRICTIONS

- The Minor is granted access only to those services designated as age-appropriate (such as gamified financial education).
- Financial transactions (including lending and investing) are strictly prohibited for Minors unless otherwise authorized by applicable law and explicitly approved by the Guardian.

 4.4 DATA HANDLING

- The Minor’s personal data shall be handled in accordance with the Buckz Privacy Policy.
- The Guardian retains the right to access, review, or request deletion of the Minor’s personal data.

 4.5 DISPUTE RESOLUTION

- Any disputes arising under this Agreement shall be addressed in accordance with the general dispute resolution provisions set forth in the Buckz Terms and Conditions.

 4.6 CONFIRMATION

- By allowing the Minor to use the Platform, both the Minor and the Guardian acknowledge and agree to these terms` },
  {
    id: 5,
    title: 'Disclaimers',
    icon: 'alert-circle',
    color: '#FAD02C',
    preview: 'Important disclaimers regarding our services and liability limitations.',
    content: ` 5.1 GENERAL DISCLAIMER

- The Buckz Platform and its content are provided “as is” without warranties of any kind, whether express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.
- Buckz does not guarantee the completeness, accuracy, or timeliness of the information provided on the Platform.

 5.2 INVESTMENT AND FINANCIAL ADVICE DISCLAIMER

- All investment insights, financial planning advice, and market-related information provided through Buckz are for informational purposes only.
- Users should consult a qualified financial advisor before making any financial decisions. Buckz is not responsible for any investment losses or financial consequences arising from the use of the information provided.

 5.3 PEER-TO-PEER LENDING DISCLAIMER

- Participation in peer-to-peer lending carries inherent risks, including the risk of borrower default.
- Users acknowledge that Buckz does not guarantee the repayment of any loan and that all lending decisions are made at the sole discretion and risk of the Users involved.
- In the event of a default, the Borrower consents to the sharing of their relevant personal and financial information with debt recovery agencies, as detailed in the Privacy Policy and Loan Agreement.

 5.4 LIMITATION OF LIABILITY

- Under no circumstances shall Buckz be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use the Platform.
- Users agree to assume full responsibility for their actions and decisions based on the information provided by Buckz.`}
];

export default function LegalInformation() {
  const [visible, setVisible] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);

  const showDocument = (doc) => {
    setSelectedDoc(doc);
    setVisible(true);
  };

  return (
    <Provider>
      <ScrollView style={styles.container}>
        <LinearGradient colors={['#4C49ED', '#5D5FEF']} style={styles.header}>
          <Title style={styles.headerTitle}>Legal Documents</Title>
          <Text style={styles.headerSubtitle}>Important information about our services</Text>
        </LinearGradient>

        <View style={styles.cardsContainer}>
          {legalDocs.map((doc, index) => (
            <Animatable.View 
              key={doc.id} 
              animation="fadeInUp" 
              delay={index * 200}
            >
              <Card 
                style={[styles.card, { borderLeftColor: doc.color }]} 
                onPress={() => showDocument(doc)}
              >
                <Card.Content style={styles.cardContent}>
                  <View style={[styles.iconContainer, { backgroundColor: `${doc.color}20` }]}>
                    <MaterialCommunityIcons name={doc.icon} size={32} color={doc.color} />
                  </View>
                  <View style={styles.textContainer}>
                    <Title style={styles.cardTitle}>{doc.title}</Title>
                    <Text style={styles.preview}>{doc.preview}</Text>
                  </View>
                  <MaterialCommunityIcons name="chevron-right" size={24} color="#666" />
                </Card.Content>
              </Card>
            </Animatable.View>
          ))}
        </View>

        <Portal>
          <Modal
            visible={visible}
            onDismiss={() => setVisible(false)}
            contentContainerStyle={styles.modalContainer}
          >
            {selectedDoc && (
              <View>
                <LinearGradient 
                  colors={[selectedDoc.color, `${selectedDoc.color}80`]}
                  style={styles.modalHeader}
                >
                  <Title style={styles.modalTitle}>{selectedDoc.title}</Title>
                </LinearGradient>
                <ScrollView style={styles.modalContent}>
                  <Text style={styles.modalText}>{selectedDoc.content}</Text>
                </ScrollView>
                <Button 
                  mode="contained" 
                  onPress={() => setVisible(false)}
                  style={[styles.closeButton, { backgroundColor: selectedDoc.color }]}
                >
                  Close
                </Button>
              </View>
            )}
          </Modal>
        </Portal>
        <Text style={{textAlign: 'center', color: '#666', fontSize: 12, marginTop: 16}}>
            {'You agree to our legal documents by using our services and by signing up in our app.\n\nBuckz v1.0.0\n\nMade with ❤️ by Ctrl Caffine Team\n\n\n\n\n'}
        </Text>
      </ScrollView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 30,
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
    opacity: 1, // Changed from 0.8 to 1
    textAlign: 'center',
    marginTop: 8,
    fontSize: 16, // Added font size
  },
  cardsContainer: {
    padding: 16,
    marginTop: -20,
  },
  card: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 4,
    borderLeftWidth: 4,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
    marginRight: 8,
  },
  cardTitle: {
    fontSize: 18, // Increased from 16
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#fff', // Added darker color
  },
  preview: {
    fontSize: 14, // Increased from 12
    color: '#444', // Changed from #666 to darker
    lineHeight: 20, // Added line height
  },
  modalContainer: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 12,
    overflow: 'hidden',
    maxHeight: '80%',
  },
  modalHeader: {
    padding: 20,
  },
  modalTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textShadow: '1px 1px 3px rgba(0,0,0,0.2)', // Added text shadow for better contrast
  },
  modalContent: {
    padding: 20,
    backgroundColor: '#fff', // Ensure white background
  },
  modalText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#222', // Added darker color
    marginBottom: 8, // Added spacing between paragraphs
  },
  closeButton: {
    margin: 20,
    marginTop: 0,
  },
});