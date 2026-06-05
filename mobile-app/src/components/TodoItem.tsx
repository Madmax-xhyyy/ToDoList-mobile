import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Todo } from '../hooks/useTodos';
import { Palette } from '../theme/index';

interface TodoItemProps {
  todo: Todo;
  onToggle: () => void;
  onPress: () => void;
  onDelete: () => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onPress, onDelete }) => {
  return (
    <View style={[styles.card, todo.isCompleted && styles.cardCompleted]}>
      <Pressable style={styles.pressArea} onPress={onPress}>
        <Pressable onPress={onToggle} style={styles.checkboxContainer}>
          <View style={[styles.checkbox, todo.isCompleted && styles.checkboxChecked]} />
        </Pressable>
        
        <View style={styles.textContainer}>
          <Text style={[styles.title, todo.isCompleted && styles.textMuted]} numberOfLines={1}>
            {todo.title}
          </Text>
          {todo.description ? (
            <Text style={[styles.description, todo.isCompleted && styles.textMuted]} numberOfLines={2}>
              {todo.description}
            </Text>
          ) : null}
        </View>
      </Pressable>

      <Pressable style={styles.deleteButton} onPress={onDelete}>
        <Text style={styles.deleteText}>✕</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: Palette.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Palette.border,
  },
  cardCompleted: {
    opacity: 0.6,
    backgroundColor: '#FAFAFA',
  },
  pressArea: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxContainer: {
    paddingRight: 14,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: Palette.textMuted,
    backgroundColor: 'transparent',
  },
  checkboxChecked: {
    backgroundColor: Palette.accent,
    borderColor: Palette.accent,
  },
  textContainer: {
    flex: 1,
    paddingRight: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: Palette.textPrimary,
    letterSpacing: -0.3,
  },
  description: {
    fontSize: 13,
    color: Palette.textSecondary,
    marginTop: 4,
    lineHeight: 18,
  },
  textMuted: {
    textDecorationLine: 'line-through',
    color: Palette.textMuted,
  },
  deleteButton: {
    padding: 8,
  },
  deleteText: {
    color: Palette.textMuted,
    fontSize: 14,
  },
});