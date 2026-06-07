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
        {/* Your primary welcome or landing screen */}
        <Stack.Screen 
          name="index" 
          options={{ headerShown: false }} 
        />

        {/* Your new main task workspace screen (todo/index.tsx) */}
        <Stack.Screen 
          name="todo/index" 
          options={{ headerShown: false }} 
        />

        {/* Catch-all route definition for task fallback actions if needed */}
        <Stack.Screen 
          name="todo/[id]" 
          options={{ title: 'Details', headerShown: false }} 
        />
      </Stack>
    </QueryClientProvider>
  );
}