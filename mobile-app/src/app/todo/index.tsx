import React, { useMemo, useCallback, useState } from 'react';
import { StyleSheet, View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { useTodos, useTodoMutations } from '../../hooks/useTodos';
import { TodoItem } from '../../components/TodoItem';
import { TodoFormModal } from '../../components/TodoForm'; 
import { TodoDetailsModal } from '../../components/TodoDetailsModal';
import { useTodoStore } from '../../store/useTodoStore';
import { Palette, Typography } from '../../theme';
import { Todo } from '../../types/todo';

export default function TodoListScreen() {
  const { data: todos, isLoading } = useTodos();
  const { updateTodo, deleteTodo, createTodo, isCreating } = useTodoMutations();
  const { filter, setFilter } = useTodoStore();
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const filteredTodos = useMemo(() => {
    if (!todos) return [];
    return todos.filter((todo) => {
      if (filter === 'completed') return todo.isCompleted;
      if (filter === 'pending') return !todo.isCompleted;
      return true;
    });
  }, [todos, filter]);

  const remainingCount = useMemo(() => {
    if (!todos) return 0;
    return todos.filter((t) => !t.isCompleted).length;
  }, [todos]);

  const handleCreateTodo = async (title: string, description: string) => {
    try {
      await createTodo({ title, description: description || undefined });
      setIsFormOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  // Triggers context drawer focus cleanly without utilizing layout router pushes
  const handleViewDetails = useCallback((todo: Todo) => {
    setSelectedTodo(todo);
    setIsDetailsOpen(true);
  }, []);

  const renderTodoItem = useCallback(({ item }: { item: Todo }) => (
    <TodoItem
      todo={item}
      onToggle={() => updateTodo({ id: item.id, data: { isCompleted: !item.isCompleted } })}
      onDelete={() => deleteTodo(item.id)}
      onPress={() => handleViewDetails(item)} // Replaced dynamic route link with modal hook handler
    />
  ), [updateTodo, deleteTodo, handleViewDetails]);

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: '', headerShown: false }} />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Workspace</Text>
        <Text style={styles.headerSubtitle}>
          {remainingCount === 0 
            ? 'All clear for deep work.' 
            : `${remainingCount} ${remainingCount === 1 ? 'task' : 'tasks'} to focus on.`
          }
        </Text>
      </View>

      <View style={styles.actionContainer}>
        <TouchableOpacity 
          style={styles.topAddButton} 
          onPress={() => setIsFormOpen(true)} 
          activeOpacity={0.8}
        >
          <Text style={styles.topAddButtonText}>＋ Add a New Task</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.filterContainer}>
        <View style={styles.segmentedControl}>
          {(['pending', 'completed'] as const).map((type) => {
            const isActive = filter === type;
            return (
              <TouchableOpacity
                key={type}
                style={[styles.segmentSegment, isActive && styles.segmentSegmentActive]}
                onPress={() => setFilter(type)}
              >
                <Text style={[styles.filterText, isActive && styles.filterTextActive]}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="small" color={Palette.textPrimary} />
        </View>
      ) : (
        <FlatList
          data={filteredTodos}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={renderTodoItem}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No tasks found in this section.</Text>
            </View>
          }
        />
      )}

      {/* Creation Modal View Context */}
      <TodoFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleCreateTodo}
        isSaving={isCreating}
      />

      {/* Detail Inspector Modal View Context */}
      <TodoDetailsModal
        todo={selectedTodo}
        isOpen={isDetailsOpen}
        onClose={() => {
          setIsDetailsOpen(false);
          setSelectedTodo(null);
        }}
        onDelete={deleteTodo}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Palette.background },
  header: { paddingHorizontal: 24, paddingTop: 24, paddingBottom: 4 },
  headerTitle: { ...Typography.fontSans, fontSize: 32, fontWeight: '800', color: Palette.textPrimary, letterSpacing: -0.8 },
  headerSubtitle: { ...Typography.fontSans, fontSize: 15, fontWeight: '500', color: Palette.textSecondary, marginTop: 6, letterSpacing: -0.2 },
  actionContainer: { paddingHorizontal: 24, marginTop: 16 },
  topAddButton: { 
    backgroundColor: Palette.accent, 
    paddingVertical: 14, 
    borderRadius: 12, 
    alignItems: 'center', 
    justifyContent: 'center', 
    elevation: 3, 
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.08)' // Fixed deprecated shadow properties
  },
  topAddButtonText: { ...Typography.fontSans, color: Palette.textPrimary, fontSize: 15, fontWeight: '700' },
  filterContainer: { paddingHorizontal: 24, marginTop: 16, marginBottom: 20 },
  segmentedControl: { flexDirection: 'row', backgroundColor: '#EFEAD8', borderRadius: 12, padding: 4 },
  segmentSegment: { flex: 1, paddingVertical: 10, alignItems: 'center', justifyContent: 'center', borderRadius: 9 },
  segmentSegmentActive: { 
    backgroundColor: Palette.surface, 
    elevation: 2, 
    boxShadow: '0px 2px 4px rgba(15, 23, 42, 0.06)' // Fixed deprecated shadow properties
  },
  filterText: { ...Typography.fontSans, fontSize: 13, fontWeight: '600', color: Palette.textSecondary },
  filterTextActive: { color: Palette.textPrimary },
  loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  listContent: { paddingHorizontal: 24, paddingBottom: 40 },
  emptyContainer: { paddingVertical: 64, alignItems: 'center', justifyContent: 'center' },
  emptyText: { ...Typography.fontSans, color: Palette.textMuted, fontSize: 14, fontWeight: '500' }
});