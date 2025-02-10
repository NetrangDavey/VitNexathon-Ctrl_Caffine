import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const TabHeader = ({ title }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(-300)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const overlayAnimation = useRef(new Animated.Value(0)).current;

  const toggleMenu = () => {
    console.log('Toggling menu');
    const toValue = isMenuOpen ? -300 : 0;
    const fadeValue = isMenuOpen ? 0 : 0.5;

    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: fadeValue,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(overlayAnimation, {
        toValue: isMenuOpen ? 0 : 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    setIsMenuOpen(!isMenuOpen);
  };

  const handleOutsidePress = () => {
    if (isMenuOpen) {
      toggleMenu();
    }
  };

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleMenu} style={styles.iconButton}>
          <MaterialIcons name="menu" size={28} color="#FFF" />
        </TouchableOpacity>

        <Text style={styles.title}>{title}</Text>

        <TouchableOpacity style={styles.iconButton}>
          <MaterialIcons name="account-circle" size={28} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* Backdrop (Overlay) */}
      {isMenuOpen && (
        <TouchableWithoutFeedback onPress={handleOutsidePress}>
          <Animated.View style={[styles.overlay, { opacity: overlayAnimation }]} />
        </TouchableWithoutFeedback>
      )}

      {/* Side Menu */}
      <Animated.View style={[styles.menu, { transform: [{ translateX: slideAnim }] }]} Visible={isMenuOpen}>
        <ScrollView style={styles.menuScrollView}>
          <View style={styles.menuItems}>
            {[
              { icon: 'home', label: 'Home' },
              { icon: 'account_balance_wallet', label: 'Wallet' },
              { icon: 'swap_horiz', label: 'Transactions' },
              { icon: 'settings', label: 'Settings' },
              { icon: 'help', label: 'Documentation / Help / FAQ' },
              { icon: 'feedback', label: 'User Feedback' },
              { icon: 'info', label: 'About / Contact Us' },
              { icon: 'policy', label: 'Legal & Privacy Policies' },
            ].map((item, index) => (
              <TouchableOpacity key={index} style={styles.menuItem}>
                <MaterialIcons name={item.icon} size={24} color="#FFF" />
                <Text style={styles.menuItemText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 60,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  iconButton: {
    padding: 8,
    borderRadius: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFF',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
  menu: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 280,
    zIndex: 999,
  },
  menuScrollView: {
    flex: 1,
  },
  menuItems: {
    marginTop: 40,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  menuItemText: {
    color: '#FFF',
    fontSize: 16,
    marginLeft: 16,
    fontWeight: '500',
  },
});

export default TabHeader;