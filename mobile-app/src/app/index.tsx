import React from 'react';
import { StyleSheet, View, Text, Pressable, SafeAreaView } from 'react-native';
import { useRouter, Href } from 'expo-router';
import { Palette } from '../theme';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Decorative Minimalist Geometric Logo Mark */}
        <View style={styles.logoContainer}>
          <View style={styles.logoSquare}>
            <Text style={styles.logoText}>✓</Text>
          </View>
        </View>

        {/* Hero Copy Block */}
        <View style={styles.textContainer}>
          <Text style={styles.heroTitle}>Focus on what{'\n'}matters most.</Text>
          <Text style={styles.heroSubtitle}>
            A distraction-free workflow tailored for high-output engineers and deep-work sessions.
          </Text>
        </View>
      </View>

      {/* Persistent Call-to-Action Bar */}
      <View style={styles.footer}>
        <Pressable 
          style={styles.primaryButton} 
          onPress={() => router.push('/todos' as Href)}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </Pressable>
        <Text style={styles.versionText}>Production Build v1.0.0</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Palette.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  logoContainer: {
    marginBottom: 40,
  },
  logoSquare: {
    width: 64,
    height: 64,
    borderRadius: 18,
    backgroundColor: Palette.accent,
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)',
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '600',
  },
  textContainer: {
    gap: 16,
  },
  heroTitle: {
    fontSize: 40,
    fontWeight: '700',
    color: Palette.textPrimary,
    letterSpacing: -1.2,
    lineHeight: 48,
  },
  heroSubtitle: {
    fontSize: 16,
    color: Palette.textSecondary,
    lineHeight: 24,
    maxWidth: 300,
  },
  footer: {
    paddingHorizontal: 32,
    paddingBottom: 24,
    gap: 16,
  },
  primaryButton: {
    backgroundColor: Palette.accent,
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  versionText: {
    textAlign: 'center',
    fontSize: 12,
    color: Palette.textMuted,
    letterSpacing: 0.5,
  },
});