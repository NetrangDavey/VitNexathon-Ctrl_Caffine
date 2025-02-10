import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, ScrollView } from 'react-native';
import { Text, View } from '@/components/Themed';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function ModalScreen() {
  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#2A2D3E', '#1F1F2B']}
        style={styles.gradient}>
        
        <Animatable.View animation="fadeIn" style={styles.heroSection}>
          <Text style={styles.title}>Buckz</Text>
          <Text style={styles.subtitle}>Your Financial Freedom Companion</Text>
        </Animatable.View>

        <Animatable.View animation="fadeInUp" delay={300} style={styles.descriptionCard}>
          <Text style={styles.description}>
            A comprehensive financial platform designed to empower everyday users in India. 
            Offering P2P lending, smart investments, AI-powered finance tracking, and gamified 
            learning for teens.
          </Text>
        </Animatable.View>

        <View style={styles.featuresContainer}>
          <Animatable.View animation="zoomIn" delay={400} style={styles.featureCard}>
            <FontAwesome name="exchange" size={24} color="#00ff87" />
            <Text style={styles.featureTitle}>P2P Lending</Text>
            <Text style={styles.featureText}>Secure lending and borrowing with AI-powered risk assessment</Text>
          </Animatable.View>

          <Animatable.View animation="zoomIn" delay={500} style={styles.featureCard}>
            <FontAwesome name="line-chart" size={24} color="#00ff87" />
            <Text style={styles.featureTitle}>Smart Investments</Text>
            <Text style={styles.featureText}>Data-driven investment insights for everyone</Text>
          </Animatable.View>

          <Animatable.View animation="zoomIn" delay={600} style={styles.featureCard}>
            <FontAwesome name="gamepad" size={24} color="#00ff87" />
            <Text style={styles.featureTitle}>Teen Finance</Text>
            <Text style={styles.featureText}>Gamified financial education for teenagers</Text>
          </Animatable.View>
        </View>

        <Animatable.View animation="fadeInUp" delay={700} style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>10K+</Text>
            <Text style={styles.statLabel}>Active Users</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>₹50M+</Text>
            <Text style={styles.statLabel}>Transactions</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>4.8⭐</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
        </Animatable.View>

        <Animatable.View animation="fadeInUp" delay={800} style={styles.footer}>
          <Text style={styles.footerText}>Made with ❤️ by</Text>
          <Text style={styles.teamName}>TEAM CTRL CAFFEINE</Text>
        </Animatable.View>

        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      </LinearGradient>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1B25',
  },
  gradient: {
    flex: 1,
    padding: 20,
  },
  heroSection: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 30,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#00ff87',
    textAlign: 'center',
  },
  descriptionCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 20,
    borderRadius: 15,
    marginBottom: 30,
  },
  description: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  featuresContainer: {
    marginBottom: 30,
    backgroundColor: 'rgba(255, 255, 255, 0)',
  },
  featureCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    alignItems: 'center',
  },
  featureTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  featureText: {
    color: '#fff',
    opacity: 0.7,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 40,
  },
  statItem: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 15,
    padding: 20,
  },
  statNumber: {
    color: '#00ff87',
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#fff',
    opacity: 0.7,
  },
  footer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  footerText: {
    color: '#fff',
    opacity: 0.7,
  },
  teamName: {
    color: '#00ff87',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },
});