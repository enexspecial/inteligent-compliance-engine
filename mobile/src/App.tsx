import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import DocumentsScreen from './screens/DocumentsScreen';
import AnalysisScreen from './screens/AnalysisScreen';
import ProfileScreen from './screens/ProfileScreen';
import ProtectedRoute from './components/ProtectedRoute';

export type RootStackParamList = {
  Login: undefined;
  Dashboard: undefined;
  Documents: undefined;
  Analysis: undefined;
  Profile: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NavigationContainer>
          <StatusBar style="auto" />
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
              headerStyle: {
                backgroundColor: '#007bff',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          >
            <Stack.Screen 
              name="Login" 
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="Dashboard" 
              component={ProtectedRoute(DashboardScreen)}
              options={{ title: 'Dashboard' }}
            />
            <Stack.Screen 
              name="Documents" 
              component={ProtectedRoute(DocumentsScreen)}
              options={{ title: 'Documents' }}
            />
            <Stack.Screen 
              name="Analysis" 
              component={ProtectedRoute(AnalysisScreen)}
              options={{ title: 'Analysis' }}
            />
            <Stack.Screen 
              name="Profile" 
              component={ProtectedRoute(ProfileScreen)}
              options={{ title: 'Profile' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </ThemeProvider>
  );
} 