import React from 'react';
import { StyleSheet, View, Text, Pressable, TouchableOpacity, Modal } from 'react-native';
import { Palette, Typography } from '../theme';
import { Ionicons } from '@expo/vector-icons';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteConfirmationModal({ isOpen, title, onClose, onConfirm }: DeleteConfirmationModalProps) {
  return (
    <Modal
      visible={isOpen}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
      accessibilityViewIsModal={true}
      aria-modal={true}
    >
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <Pressable style={styles.alertBox} pointerEvents="auto">
          
          <View style={styles.iconWrapper}>
            <Ionicons name="trash-outline" size={24} color="#EF4444" />
          </View>

          <Text style={styles.alertTitle}>Delete Task</Text>
          
          <Text style={styles.alertSubtitle}>
            Are you sure you want to permanently remove{' '}
            <Text style={styles.taskTitle}>“{title}”</Text>? This action cannot be reversed.
          </Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.cancelButton} 
              onPress={onClose}
              activeOpacity={0.7}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.confirmButton} 
              onPress={onConfirm}
              activeOpacity={0.8}
            >
              <Text style={styles.confirmButtonText}>Delete</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  alertBox: {
    backgroundColor: Palette.background,
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 320, 
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Palette.border,
    elevation: 4,
    boxShadow: '0px 12px 32px rgba(15, 23, 42, 0.08)', 
  },
  iconWrapper: {
    marginBottom: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertTitle: {
    ...Typography.fontSans,
    fontSize: 19,
    fontWeight: '700',
    color: Palette.textPrimary,
    letterSpacing: -0.4,
    marginBottom: 10,
  },
  alertSubtitle: {
    ...Typography.fontSans,
    fontSize: 14,
    color: Palette.textSecondary,
    textAlign: 'center',
    lineHeight: 21,
    letterSpacing: -0.1,
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  taskTitle: {
    fontWeight: '600',
    color: Palette.textPrimary,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    gap: 10,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: Palette.surface,
    borderWidth: 1,
    borderColor: Palette.border,
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    ...Typography.fontSans,
    color: Palette.textPrimary, 
    fontWeight: '600',
    fontSize: 14,
    letterSpacing: -0.1,
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#DC2626',
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmButtonText: {
    ...Typography.fontSans,
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
    letterSpacing: -0.1,
  },
});