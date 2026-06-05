import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Pressable, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { useTodoMutations } from '../hooks/useTodos';

export default function ManageTodoScreen() {
  const router = useRouter();
  const { createMutation } = useTodoMutations();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSave = () => {
    if (!title.trim()) return;
    createMutation.mutate(
      { title, description },
      { onSuccess: () => router.back() }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Task Title</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Code Review"
          placeholderTextColor="#94A3B8"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Add deep notes or context..."
          placeholderTextColor="#94A3B8"
          multiline
          numberOfLines={4}
          value={description}
          onChangeText={setDescription}
        />

        <Pressable style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Confirm Task</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  form: { padding: 24 },
  label: { fontSize: 13, fontWeight: '600', color: '#475569', textTransform: 'uppercase', marginBottom: 8, letterSpacing: 0.5 },
  input: { backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 12, padding: 14, fontSize: 15, color: '#1E293B', marginBottom: 24 },
  textArea: { height: 100, textAlignVertical: 'top' },
  saveButton: { backgroundColor: '#000000', borderRadius: 12, paddingVertical: 16, alignItems: 'center' },
  saveButtonText: { color: '#FFFFFF', fontWeight: '600', fontSize: 15 }
});