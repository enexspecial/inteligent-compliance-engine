import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  DrawerContentComponentProps,
  DrawerNavigationProp,
} from '@react-navigation/drawer';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import DocumentsScreen from './screens/DocumentsScreen';
import AnalysisScreen from './screens/AnalysisScreen';
import ProfileScreen from './screens/ProfileScreen';
import ProtectedRoute from './components/ProtectedRoute';
import { TouchableOpacity, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';

// Reminder: Run `npm install @react-navigation/drawer` if you haven't already.

export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();

type DrawerParamList = {
  Dashboard: undefined;
  Documents: undefined;
  Analysis: undefined;
  Profile: undefined;
};

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { logout } = useAuth();
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        onPress={logout}
        icon={({ color, size }: { color: string; size: number }) => (
          <Ionicons name="log-out-outline" size={size} color={color} />
        )}
      />
    </DrawerContentScrollView>
  );
}

function MainDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      drawerContent={(props: DrawerContentComponentProps) => <CustomDrawerContent {...props} />}
      screenOptions={({ navigation }: { navigation: DrawerNavigationProp<DrawerParamList> }) => ({
        headerStyle: { backgroundColor: '#007bff' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
        headerLeft: ({ tintColor }: { tintColor?: string }) => (
          <TouchableOpacity
            style={{ marginLeft: 15 }}
            onPress={() => navigation.toggleDrawer()}
          >
            <Ionicons name="menu" size={28} color={tintColor || '#fff'} />
          </TouchableOpacity>
        ),
      })}
    >
      <Drawer.Screen name="Dashboard" component={ProtectedRoute(DashboardScreen)} options={{ title: 'Dashboard' }} />
      <Drawer.Screen name="Documents" component={ProtectedRoute(DocumentsScreen)} options={{ title: 'Documents' }} />
      <Drawer.Screen name="Analysis" component={ProtectedRoute(AnalysisScreen)} options={{ title: 'Analysis' }} />
      <Drawer.Screen name="Profile" component={ProtectedRoute(ProfileScreen)} options={{ title: 'Profile' }} />
    </Drawer.Navigator>
  );
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  useEffect(() => {
    // Request notification permissions on mount
    (async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission required', 'Enable notifications to receive important updates.');
      }
    })();

    // Listen for notifications received while app is foregrounded
    const subscription = Notifications.addNotificationReceivedListener(notification => {
      // You can handle notification data here if needed
      // For demo, do nothing (alert will show by default)
    });
    return () => subscription.remove();
  }, []);

  return (
    <ThemeProvider>
      <AuthProvider>
        <NavigationContainer>
          <StatusBar style="auto" />
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Main" component={MainDrawer} />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </ThemeProvider>
  );
} 