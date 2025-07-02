import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

const DashboardScreen: React.FC = () => {
  const { user } = useAuth();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Dashboard</Text>
        <Text style={styles.welcome}>Welcome back, {user?.firstName}!</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>📊 Overview</Text>
          <Text style={styles.cardText}>
            Your compliance overview and statistics will appear here.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>📄 Recent Documents</Text>
          <Text style={styles.cardText}>
            Your recently uploaded documents will be listed here.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>🔍 Analysis Results</Text>
          <Text style={styles.cardText}>
            Latest compliance analysis results will be shown here.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>⚡ Quick Actions</Text>
          <Text style={styles.cardText}>
            Quick access to common actions will be available here.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  welcome: {
    fontSize: 16,
    marginBottom: 20,
    color: '#666',
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  cardText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

export default DashboardScreen; 