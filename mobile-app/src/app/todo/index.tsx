import React, { useMemo, useCallback, useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { useTodos, useTodoMutations } from '../../hooks/useTodos';
import { TodoItem } from '../../components/TodoItem';
import { TodoFormModal } from '../../components/TodoForm'; 
import { TodoDetailsModal } from '../../components/TodoDetailsModal';
import { DeleteConfirmationModal } from '../../components/DeleteConfirmationModal';
import { useTodoStore } from '../../store/useTodoStore';
import { Palette, Typography } from '../../theme';
import { Todo } from '../../types/todo';

export default function TodoListScreen() {
  const { data: todos, isLoading } = useTodos();
  const { updateTodo, deleteTodo, createTodo, isCreating } = useTodoMutations();
  const { filter, setFilter } = useTodoStore();
  
  // UI Visibility States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Data Context States
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [todoToDelete, setTodoToDelete] = useState<Todo | null>(null);

  // 🛠️ State Machine Queue: Houses transit tasks waiting for the details modal to unmount
  const [pendingEditTodo, setPendingEditTodo] = useState<Todo | null>(null);

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

  // 🛠️ Lifecycle Watcher: Acts as a native traffic controller
  useEffect(() => {
    if (!isDetailsOpen && pendingEditTodo) {
      setSelectedTodo(pendingEditTodo); // Handover the target to form focus context
      setIsFormOpen(true);              // Fire modal open signal safely
      setPendingEditTodo(null);         // Flush layout transit queue
    }
  }, [isDetailsOpen, pendingEditTodo]);

  const handleSaveTodo = async (title: string, description: string) => {
    try {
      if (selectedTodo) {
        await updateTodo({ 
          id: selectedTodo.id, 
          data: { title, description: description || undefined } 
        });
      } else {
        await createTodo({ title, description: description || undefined });
      }
      setIsFormOpen(false);
      setSelectedTodo(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenCreateModal = () => {
    setSelectedTodo(null); 
    setIsFormOpen(true);
  };

  const handleViewDetails = useCallback((todo: Todo) => {
    setSelectedTodo(todo);
    setIsDetailsOpen(true);
  }, []);

  // 🛠️ Seamless state machine handler replaces artificial timeouts
  const handleTransitionToEdit = useCallback((todo: Todo) => {
    setPendingEditTodo(todo); // Register todo context inside safe placeholder queue
    setIsDetailsOpen(false);   // Trigger detail exit animation sequence natively
  }, []);

  const handleTriggerDeletePrompt = useCallback((todo: Todo) => {
    setTodoToDelete(todo);
    setIsDeleteOpen(true);
  }, []);

  const handleConfirmDelete = async () => {
    if (todoToDelete) {
      try {
        await deleteTodo(todoToDelete.id);
        setIsDeleteOpen(false);
        setTodoToDelete(null);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const renderTodoItem = useCallback(({ item }: { item: Todo }) => (
    <TodoItem
      todo={item}
      onToggle={() => updateTodo({ id: item.id, data: { isCompleted: !item.isCompleted } })}
      onDelete={() => handleTriggerDeletePrompt(item)}
      onPress={() => handleViewDetails(item)}
    />
  ), [updateTodo, handleTriggerDeletePrompt, handleViewDetails]);

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
          onPress={handleOpenCreateModal} 
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

      {/* Creation/Editing Modal Context */}
      <TodoFormModal
        isOpen={isFormOpen}
        todo={selectedTodo} 
        onClose={() => {
          setIsFormOpen(false);
          setSelectedTodo(null);
        }}
        onSave={handleSaveTodo}
        isSaving={isCreating}
      />

      {/* Detail Inspector Modal View Context */}
      <TodoDetailsModal
        todo={selectedTodo}
        isOpen={isDetailsOpen}
        onClose={() => {
          setIsDetailsOpen(false);
          // Protect selectedTodo data context if an active transition queue loop is running
          if (!pendingEditTodo) {
            setSelectedTodo(null);
          }
        }}
        onEdit={handleTransitionToEdit} 
      />

      {/* Delete Confirmation Dialog Context */}
      <DeleteConfirmationModal
        isOpen={isDeleteOpen}
        title={todoToDelete?.title || ''}
        onClose={() => {
          setIsDeleteOpen(false);
          setTodoToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
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
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.08)' 
  },
  topAddButtonText: { ...Typography.fontSans, color: Palette.textPrimary, fontSize: 15, fontWeight: '700' },
  filterContainer: { paddingHorizontal: 24, marginTop: 16, marginBottom: 20 },
  segmentedControl: { flexDirection: 'row', backgroundColor: '#EFEAD8', borderRadius: 12, padding: 4 },
  segmentSegment: { flex: 1, paddingVertical: 10, alignItems: 'center', justifyContent: 'center', borderRadius: 9 },
  segmentSegmentActive: { 
    backgroundColor: Palette.surface, 
    elevation: 2, 
    boxShadow: '0px 2px 4px rgba(15, 23, 42, 0.06)' 
  },
  filterText: { ...Typography.fontSans, fontSize: 13, fontWeight: '600', color: Palette.textSecondary },
  filterTextActive: { color: Palette.textPrimary },
  loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  listContent: { paddingHorizontal: 24, paddingBottom: 40 },
  emptyContainer: { paddingVertical: 64, alignItems: 'center', justifyContent: 'center' },
  emptyText: { ...Typography.fontSans, color: Palette.textMuted, fontSize: 14, fontWeight: '500' }
});