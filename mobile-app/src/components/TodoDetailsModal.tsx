import React from 'react';
import { StyleSheet, View, Text, Pressable, TouchableOpacity, Modal } from 'react-native';
import { Palette, Typography } from '../theme';
import { Todo } from '../types/todo';
import { Ionicons } from '@expo/vector-icons';

interface TodoDetailsModalProps {
  todo: Todo | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (todo: Todo) => void;
}

export function TodoDetailsModal({ todo, isOpen, onClose, onEdit }: TodoDetailsModalProps) {
  if (!todo) return null;

  const handleEditClick = () => {
    onEdit(todo);
    onClose();
  };

  return (
    <Modal
      visible={isOpen}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
      accessibilityViewIsModal={true}
      aria-modal={true}
    >
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <Pressable style={styles.modalContent} pointerEvents="auto">
          
          <View style={styles.modalHeader}>
            <View style={styles.statusBadgeContainer}>
              <View style={[styles.statusDot, todo.isCompleted && styles.statusDotCompleted]} />
              <Text style={styles.statusText}>
                {todo.isCompleted ? 'Completed' : 'In Progress'}
              </Text>
            </View>
            <TouchableOpacity 
              onPress={onClose}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            >
              <Ionicons name="close" size={22} color={Palette.textSecondary} />
            </TouchableOpacity>
          </View>

          <View style={styles.contentBody}>
            <Text style={styles.taskTitle}>{todo.title}</Text>
            
            <Text style={styles.label}>Description</Text>
            <Text style={[styles.taskDescription, !todo.description && styles.taskDescriptionEmpty]}>
              {todo.description || 'No additional details provided for this task.'}
            </Text>

            <TouchableOpacity 
              style={styles.editButton} 
              onPress={handleEditClick}
              activeOpacity={0.8}
            >
              <Text style={styles.editButtonText}>Edit Details</Text>
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
    maxHeight: '80%',
    borderWidth: 1,
    borderColor: Palette.border,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 12,
  },
  statusBadgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#F59E0B',
    marginRight: 6,
  },
  statusDotCompleted: {
    backgroundColor: '#10B981',
  },
  statusText: {
    ...Typography.fontSans,
    fontSize: 12,
    fontWeight: '700',
    color: Palette.textSecondary,
    letterSpacing: 0.2,
    textTransform: 'uppercase',
  },
  contentBody: {
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  taskTitle: {
    ...Typography.fontSans,
    fontSize: 24,
    fontWeight: '800',
    color: Palette.textPrimary,
    letterSpacing: -0.6,
    marginBottom: 20,
  },
  label: {
    ...Typography.fontSans,
    fontSize: 11,
    fontWeight: '700',
    color: Palette.textMuted,
    textTransform: 'uppercase',
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  taskDescription: {
    ...Typography.fontSans,
    fontSize: 15,
    color: Palette.textPrimary,
    lineHeight: 22,
    letterSpacing: -0.1,
    marginBottom: 36,
  },
  taskDescriptionEmpty: {
    color: Palette.textMuted,
    fontStyle: 'italic',
  },
  editButton: {
    backgroundColor: Palette.accent, 
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.04)',
  },
  editButtonText: {
    ...Typography.fontSans,
    color: Palette.textPrimary,
    fontWeight: '700',
    fontSize: 15,
    letterSpacing: -0.1,
  },
});