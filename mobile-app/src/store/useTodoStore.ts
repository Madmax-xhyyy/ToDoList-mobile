import { create } from 'zustand';

export type FilterType = 'all' | 'pending' | 'completed';

interface TodoUIState {
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
  selectedTodoId: string | null;
  setSelectedTodoId: (id: string | null) => void;
  resetUIState: () => void;
}

export const useTodoStore = create<TodoUIState>((set) => ({
  filter: 'all',
  selectedTodoId: null,
  
  setFilter: (filter) => set({ filter }),
  
  setSelectedTodoId: (id) => set({ selectedTodoId: id }),
  
  resetUIState: () => set({ filter: 'all', selectedTodoId: null }),
}));