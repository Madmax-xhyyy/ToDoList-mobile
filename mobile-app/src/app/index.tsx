import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Palette, Typography } from '../theme';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoText}>✓</Text>
        </View>

        <Text style={styles.title}>Simplify Your Day</Text>
        <Text style={styles.subtitle}>
          A minimal space designed to help you capture tasks, stay organized, and clear your mind.
        </Text>
      </View>

      <TouchableOpacity 
        style={styles.startButton} 
        onPress={() => router.push('/todo')} 
        activeOpacity={0.8}
      >
        <Text style={styles.startButtonText}>Get Started</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: Palette.surface, 
    paddingHorizontal: 24, 
    justifyContent: 'space-between', 
    paddingBottom: 20 
  },
  content: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingHorizontal: 12 
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Palette.accent, 
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
    elevation: 4, // Keep for Android native shadow support
    boxShadow: `0px 6px 10px rgba(251, 191, 36, 0.2)`, // Combined shadow styles (using a generic hex opacity overlay or Palette token hex if it supports it)
  },
  logoText: { 
    color: Palette.textPrimary, 
    fontSize: 36, 
    fontWeight: 'bold' 
  },
  title: { 
    fontSize: 32, 
    fontWeight: '800', 
    color: Palette.textPrimary, 
    textAlign: 'center', 
    marginBottom: 16, 
    ...Typography.fontSans, 
    letterSpacing: -0.5,
  },
  subtitle: { 
    fontSize: 16, 
    color: Palette.textSecondary, 
    textAlign: 'center', 
    lineHeight: 24, 
    paddingHorizontal: 10,
    ...Typography.fontSans
  },
  startButton: {
    backgroundColor: Palette.accent, 
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3, // Keep for Android native shadow support
    marginBottom: 12,
    boxShadow: `0px 4px 8px rgba(251, 191, 36, 0.3)`, // Clean cross-platform shadow string syntax
  },
  startButtonText: { 
    color: Palette.textPrimary, 
    fontSize: 16, 
    fontWeight: '700',
    ...Typography.fontSans
  }
});