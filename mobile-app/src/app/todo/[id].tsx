import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useTodos } from '../../hooks/useTodos';

export default function TodoDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: todos, isLoading } = useTodos();

  // Find targeted entity in cache proxy
  const todo = todos?.find((t) => t.id === id);

  if (isLoading) return <ActivityIndicator color="#000" style={{ flex: 1 }} />;
  if (!todo) return <View style={styles.center}><Text>Task not found.</Text></View>;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentCard}>
        <View style={styles.statusBadgeRow}>
          <View style={[styles.badge, todo.isCompleted ? styles.badgeSuccess : styles.badgePending]}>
            <Text style={[styles.badgeText, todo.isCompleted ? styles.badgeTextSuccess : styles.badgeTextPending]}>
              {todo.isCompleted ? 'Completed' : 'Active'}
            </Text>
          </View>
        </View>

        <Text style={styles.title}>{todo.title}</Text>
        <Text style={styles.description}>
          {todo.description || 'No additional insights added to this task.'}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  contentCard: { backgroundColor: '#FFFFFF', margin: 24, padding: 24, borderRadius: 24, borderWidth: 1, borderColor: '#E2E8F0' },
  statusBadgeRow: { flexDirection: 'row', marginBottom: 16 },
  badge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  badgeSuccess: { backgroundColor: '#DCFCE7' },
  badgePending: { backgroundColor: '#FEF9C3' },
  badgeText: { fontSize: 12, fontWeight: '600' },
  badgeTextSuccess: { color: '#166534' },
  badgeTextPending: { color: '#854D0E' },
  title: { fontSize: 24, fontWeight: '700', color: '#0F172A', letterSpacing: -0.5, marginBottom: 12 },
  description: { fontSize: 15, color: '#475569', lineHeight: 22 }
});