import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Pressable, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import { Palette, Typography } from '../theme';
import { Todo } from '../types/todo';
import { Ionicons } from '@expo/vector-icons';

interface TodoFormModalProps {
  isOpen: boolean;
  todo: Todo | null;
  onClose: () => void;
  onSave: (title: string, description: string) => Promise<void>;
  isSaving: boolean;
}

export function TodoFormModal({ isOpen, todo, onClose, onSave, isSaving }: TodoFormModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null); // 👈 Track validation messages

  useEffect(() => {
    if (isOpen) {
      setError(null); // Clear errors whenever the modal pops open
      if (todo) {
        setTitle(todo.title);
        setDescription(todo.description || '');
      } else {
        setTitle('');
        setDescription('');
      }
    }
  }, [isOpen, todo]);

  // Clear validation warning state dynamically as the user types
  const handleTitleChange = (text: string) => {
    setTitle(text);
    if (error && text.trim()) {
      setError(null);
    }
  };

  const handleSave = async () => {
    const trimmedTitle = title.trim();
    
    // Validation check: prevent execution if title is blank
    if (!trimmedTitle) {
      setError('Task title is required');
      return;
    }

    if (isSaving) return;

    try {
      await onSave(trimmedTitle, description.trim());
      setTitle('');
      setDescription('');
      setError(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleClose = () => {
    if (isSaving) return;
    setTitle('');
    setDescription('');
    setError(null); // Clean error state on drop closure
    onClose();
  };

  return (
    <Modal
      visible={isOpen}
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}
      accessibilityViewIsModal={true}
      aria-modal={true}
    >
      <Pressable style={styles.modalOverlay} onPress={handleClose}>
        <Pressable style={styles.modalContent} pointerEvents="auto">
          
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{todo ? 'Edit Task' : 'New Task'}</Text>
            <TouchableOpacity 
              onPress={handleClose} 
              disabled={isSaving}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            >
              <Ionicons name="close" size={22} color={Palette.textSecondary} />
            </TouchableOpacity>
          </View>

          <View style={styles.form}>
            <Text style={styles.label}>Task Title</Text>
            <TextInput
              style={[
                styles.input, 
                error ? styles.inputError : null, // 👈 Applies crimson border on validation failure
                { marginBottom: error ? 8 : 24 } // Tighten base margin if validation subtext displays
              ]}
              placeholder="What needs to be done?"
              placeholderTextColor={Palette.textMuted}
              value={title}
              onChangeText={handleTitleChange}
              editable={!isSaving}
            />
            
            {/* Inline validation feedback component */}
            {error && <Text style={styles.errorText}>{error}</Text>}

            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Add notes, links, or context..."
              placeholderTextColor={Palette.textMuted}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              value={description}
              onChangeText={setDescription}
              editable={!isSaving}
            />

            <TouchableOpacity 
              style={[styles.saveButton, isSaving && styles.saveButtonDisabled]} 
              onPress={handleSave}
              disabled={isSaving}
              activeOpacity={0.8}
            >
              {isSaving ? (
                <ActivityIndicator color={Palette.textPrimary} size="small" />
              ) : (
                <Text style={styles.saveButtonText}>
                  {todo ? 'Save Changes' : 'Create Task'}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.25)', 
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Palette.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 42,
    maxHeight: '85%',
    borderWidth: 1,
    borderColor: Palette.border,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 8,
  },
  modalTitle: {
    ...Typography.fontSans,
    fontSize: 20,
    fontWeight: '800',
    color: Palette.textPrimary,
    letterSpacing: -0.5,
  },
  form: { 
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  label: { 
    ...Typography.fontSans,
    fontSize: 11, 
    fontWeight: '700', 
    color: Palette.textMuted, 
    textTransform: 'uppercase', 
    marginBottom: 8, 
    letterSpacing: 0.5, 
  },
  input: { 
    ...Typography.fontSans,
    backgroundColor: Palette.surface, 
    borderWidth: 1, 
    borderColor: Palette.border, 
    borderRadius: 12, 
    paddingHorizontal: 16,
    paddingVertical: 14, 
    fontSize: 15, 
    color: Palette.textPrimary, 
    letterSpacing: -0.1,
  },
  inputError: {
    borderColor: '#DC2626', // Premium matte red outline accentuation
  },
  errorText: {
    ...Typography.fontSans,
    color: '#DC2626',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 16,
    paddingLeft: 4,
  },
  textArea: { 
    height: 100, 
    paddingTop: 14,
    marginBottom: 24,
  },
  saveButton: { 
    backgroundColor: Palette.accent, 
    borderRadius: 12, 
    paddingVertical: 15, 
    alignItems: 'center',
    justifyContent: 'center',
    height: 52, 
    elevation: 2,
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.04)',
    marginTop: 8,
  },
  saveButtonDisabled: {
    opacity: 0.6
  },
  saveButtonText: { 
    ...Typography.fontSans,
    color: Palette.textPrimary, 
    fontWeight: '700', 
    fontSize: 15,
    letterSpacing: -0.1,
  }
});