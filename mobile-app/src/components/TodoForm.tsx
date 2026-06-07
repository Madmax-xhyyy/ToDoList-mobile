import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Pressable, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import { Palette, Typography } from '../theme';

interface TodoFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (title: string, description: string) => Promise<void>;
  isSaving: boolean;
}

export function TodoFormModal({ isOpen, onClose, onSave, isSaving }: TodoFormModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSave = async () => {
    const trimmedTitle = title.trim();
    if (!trimmedTitle || isSaving) return;

    await onSave(trimmedTitle, description.trim());
    setTitle('');
    setDescription('');
  };

  const handleClose = () => {
    if (isSaving) return;
    setTitle('');
    setDescription('');
    onClose();
  };

  return (
    <Modal
      visible={isOpen}
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}
    >
      <Pressable style={styles.modalOverlay} onPress={handleClose}>
        <Pressable style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>New Task</Text>
            <TouchableOpacity onPress={handleClose} disabled={isSaving}>
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.form}>
            <Text style={styles.label}>Task Title</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Code Review"
              placeholderTextColor={Palette.textMuted}
              value={title}
              onChangeText={setTitle}
              editable={!isSaving}
            />

            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Add deep notes or context..."
              placeholderTextColor={Palette.textMuted}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              value={description}
              onChangeText={setDescription}
              editable={!isSaving}
            />

            <Pressable 
              style={[styles.saveButton, isSaving && styles.saveButtonDisabled]} 
              onPress={handleSave}
              disabled={isSaving}
            >
              {isSaving ? (
                <ActivityIndicator color={Palette.textPrimary} size="small" />
              ) : (
                <Text style={styles.saveButtonText}>Confirm Task</Text>
              )}
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(30, 27, 75, 0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Palette.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 40,
    maxHeight: '85%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: Palette.border,
  },
  modalTitle: {
    ...Typography.fontSans,
    fontSize: 18,
    fontWeight: '700',
    color: Palette.textPrimary,
  },
  closeButtonText: {
    ...Typography.fontSans,
    fontSize: 15,
    fontWeight: '600',
    color: Palette.textSecondary,
  },
  form: { 
    padding: 24 
  },
  label: { 
    ...Typography.fontSans,
    fontSize: 13, 
    fontWeight: '600', 
    color: Palette.textSecondary, 
    textTransform: 'uppercase', 
    marginBottom: 8, 
    letterSpacing: -0.3, 
  },
  input: { 
    ...Typography.fontSans,
    backgroundColor: Palette.surface, 
    borderWidth: 1, 
    borderColor: Palette.border, 
    borderRadius: 12, 
    padding: 14, 
    fontSize: 15, 
    color: Palette.textPrimary, 
    marginBottom: 24,
  },
  textArea: { 
    height: 120, 
  },
  saveButton: { 
    backgroundColor: Palette.accent, 
    borderRadius: 12, 
    paddingVertical: 16, 
    alignItems: 'center',
    justifyContent: 'center',
    height: 54, 
  },
  saveButtonDisabled: {
    opacity: 0.6
  },
  saveButtonText: { 
    ...Typography.fontSans,
    color: Palette.textPrimary, 
    fontWeight: '700', 
    fontSize: 15,
  }
});