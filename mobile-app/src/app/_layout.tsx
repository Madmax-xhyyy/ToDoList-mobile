import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#F8FAFC' },
          headerShadowVisible: false,
          headerTitleStyle: { fontWeight: '600', color: '#0F172A' },
          headerTintColor: '#000000',
        }}
      >
        <Stack.Screen 
          name="index" 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="todos" 
          options={{ title: 'Tasks', headerLeft: () => null }} 
        />
        <Stack.Screen 
          name="manage" 
          options={{ presentation: 'modal', title: 'Manage Task' }} 
        />
        <Stack.Screen 
          name="todo/[id]" 
          options={{ title: 'Details' }} 
        />
      </Stack>
    </QueryClientProvider>
  );
}