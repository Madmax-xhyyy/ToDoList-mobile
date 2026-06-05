import React from 'react';
import { StyleSheet, View, Text, FlatList, ActivityIndicator, SafeAreaView, Pressable } from 'react-native';
import { useRouter, Href } from 'expo-router';
import { useTodos, useTodoMutations } from '../hooks/useTodos';
import { TodoItem } from '../components/TodoItem';
import { useTodoStore } from '../store/useTodoStore';
import { Palette } from '../theme';

export default function TodoListScreen() {
  const router = useRouter();
  const { data: todos, isLoading } = useTodos();
  const { updateMutation, deleteMutation } = useTodoMutations();
  const { filter, setFilter } = useTodoStore();

  const filteredTodos = todos?.filter((todo) => {
    if (filter === 'completed') return todo.isCompleted;
    if (filter === 'pending') return !todo.isCompleted;
    return true;
  }) ?? [];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerSubtitle}>
          {todos?.filter((t) => !t.isCompleted).length ?? 0} items remaining
        </Text>
      </View>

      {/* Segmented Filter Pills */}
      <View style={styles.filterBar}>
        {(['all', 'pending', 'completed'] as const).map((type) => (
          <Pressable
            key={type}
            style={[styles.filterPill, filter === type && styles.filterPillActive]}
            onPress={() => setFilter(type)}
          >
            <Text style={[styles.filterText, filter === type && styles.filterTextActive]}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Main Content List Feed Area */}
      {isLoading ? (
        <ActivityIndicator color={Palette.accent} style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={filteredTodos}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <TodoItem
              todo={item}
              onToggle={() => updateMutation.mutate({ id: item.id, isCompleted: !item.isCompleted })}
              onPress={() => router.push(`/todo/${item.id}` as Href)}
              onDelete={() => deleteMutation.mutate(item.id)}
            />
          )}
        />
      )}

      {/* Floating Action Button (FAB) for Creating New Tasks */}
      <Pressable 
        style={styles.fab} 
        onPress={() => router.push('/manage' as Href)}
      >
        <Text style={styles.fabText}>+</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: Palette.background 
  },
  header: { 
    paddingHorizontal: 24, 
    paddingBottom: 8 
  },
  headerSubtitle: { 
    fontSize: 15, 
    color: Palette.textSecondary 
  },
  filterBar: { 
    flexDirection: 'row', 
    paddingHorizontal: 24, 
    marginVertical: 16 
  },
  filterPill: { 
    paddingHorizontal: 16, 
    paddingVertical: 8, 
    borderRadius: 20, 
    marginRight: 8, 
    backgroundColor: Palette.border 
  },
  filterPillActive: { 
    backgroundColor: Palette.accent 
  },
  filterText: { 
    fontSize: 13, 
    fontWeight: '500', 
    color: Palette.textSecondary 
  },
  filterTextActive: { 
    color: '#FFFFFF' 
  },
  listContent: { 
    paddingHorizontal: 24, 
    paddingBottom: 100 
  },
  fab: { 
    position: 'absolute', 
    right: 24, 
    bottom: 32, 
    width: 56, 
    height: 56, 
    borderRadius: 28, 
    backgroundColor: Palette.accent, 
    justifyContent: 'center', 
    alignItems: 'center', 
    elevation: 4,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
  },
  fabText: { 
    color: '#FFFFFF', 
    fontSize: 24, 
    fontWeight: '300' 
  }
});