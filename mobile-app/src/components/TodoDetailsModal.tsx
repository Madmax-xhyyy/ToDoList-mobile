import React from 'react';
import { StyleSheet, View, Text, Pressable, TouchableOpacity, Modal } from 'react-native';
import { Palette, Typography } from '../theme';
import { Todo } from '../types/todo';

interface TodoDetailsModalProps {
  todo: Todo | null;
  isOpen: boolean;
  onClose: () => void;
  onDelete: (id: string) => void;
}

export function TodoDetailsModal({ todo, isOpen, onClose, onDelete }: TodoDetailsModalProps) {
  if (!todo) return null;

  const handleDelete = () => {
    onDelete(todo.id);
    onClose();
  };

  return (
    <Modal
      visible={isOpen}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <Pressable style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <View style={styles.statusBadgeContainer}>
              <View style={[styles.statusDot, todo.isCompleted && styles.statusDotCompleted]} />
              <Text style={styles.statusText}>
                {todo.isCompleted ? 'Completed' : 'In Progress'}
              </Text>
            </View>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.contentBody}>
            <Text style={styles.taskTitle}>{todo.title}</Text>
            
            <Text style={styles.label}>Description</Text>
            <Text style={[styles.taskDescription, !todo.description && styles.taskDescriptionEmpty]}>
              {todo.description || 'No additional description provided for this task.'}
            </Text>

            <TouchableOpacity 
              style={styles.deleteButton} 
              onPress={handleDelete}
              activeOpacity={0.8}
            >
              <Text style={styles.deleteButtonText}>Delete Task</Text>
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
    backgroundColor: 'rgba(30, 27, 75, 0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Palette.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 40,
    maxHeight: '80%',
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
  statusBadgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFEAD8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#F59E0B',
    marginRight: 8,
  },
  statusDotCompleted: {
    backgroundColor: '#10B981',
  },
  statusText: {
    ...Typography.fontSans,
    fontSize: 12,
    fontWeight: '700',
    color: Palette.textPrimary,
    textTransform: 'uppercase',
  },
  closeButtonText: {
    ...Typography.fontSans,
    fontSize: 15,
    fontWeight: '600',
    color: Palette.textSecondary,
  },
  contentBody: {
    padding: 24,
  },
  taskTitle: {
    ...Typography.fontSans,
    fontSize: 24,
    fontWeight: '800',
    color: Palette.textPrimary,
    letterSpacing: -0.5,
    marginBottom: 24,
  },
  label: {
    ...Typography.fontSans,
    fontSize: 12,
    fontWeight: '600',
    color: Palette.textSecondary,
    textTransform: 'uppercase',
    marginBottom: 8,
    letterSpacing: -0.2,
  },
  taskDescription: {
    ...Typography.fontSans,
    fontSize: 15,
    color: Palette.textPrimary,
    lineHeight: 22,
    marginBottom: 32,
  },
  taskDescriptionEmpty: {
    color: Palette.textMuted,
    fontStyle: 'italic',
  },
  deleteButton: {
    borderWidth: 1,
    borderColor: '#EF4444',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButtonText: {
    ...Typography.fontSans,
    color: '#EF4444',
    fontWeight: '600',
    fontSize: 15,
  },
});