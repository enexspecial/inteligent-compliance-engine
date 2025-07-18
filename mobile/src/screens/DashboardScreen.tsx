import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { listDocuments } from '../services/documentService';
import type { Document } from '../types';
import { sendLocalNotification } from '../utils/notification';
import { Ionicons } from '@expo/vector-icons';

const DashboardScreen: React.FC = () => {
  const { user, token } = useAuth();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocs = async () => {
      if (!token) return;
      setLoading(true);
      setError(null);
      try {
        const docs = await listDocuments(token);
        setDocuments(docs);
      } catch (err: any) {
        setError('Failed to load documents');
      } finally {
        setLoading(false);
      }
    };
    fetchDocs();
  }, [token]);

  const handleUpload = () => {
    Alert.alert('Go to Documents', 'Use the Documents tab to upload a new document.');
  };

  const handleAnalyze = () => {
    Alert.alert('Go to Analysis', 'Use the Analysis tab to start a new analysis.');
  };

  const handleNotify = async () => {
    await sendLocalNotification('Hello from Compliance Engine', 'This is a test notification!');
  };

  const renderRecentDoc = ({ item }: { item: Document }) => (
    <View style={styles.docItem}>
      <Text style={styles.docName}>{item.name}</Text>
      <Text style={styles.docDate}>Uploaded: {new Date(item.uploadedAt).toLocaleString()}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Notification Icon */}
        <TouchableOpacity style={styles.notificationIcon} onPress={handleNotify}>
          <Ionicons name="notifications-outline" size={28} color="#007bff" />
        </TouchableOpacity>
        <Text style={styles.title}>Dashboard</Text>
        <Text style={styles.welcome}>Welcome back, {user?.firstName || user?.name || 'User'}!</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>📊 Overview</Text>
          {loading ? (
            <ActivityIndicator size="small" color="#007bff" />
          ) : error ? (
            <Text style={styles.error}>{error}</Text>
          ) : (
            <Text style={styles.cardText}>You have {documents.length} document{documents.length === 1 ? '' : 's'}.</Text>
          )}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>📄 Recent Documents</Text>
          {loading ? (
            <ActivityIndicator size="small" color="#007bff" />
          ) : error ? (
            <Text style={styles.error}>{error}</Text>
          ) : (
            <FlatList
              data={documents.slice(0, 3)}
              keyExtractor={item => item.id}
              renderItem={renderRecentDoc}
              ListEmptyComponent={<Text style={styles.cardText}>No documents found.</Text>}
            />
          )}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>⚡ Quick Actions</Text>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <TouchableOpacity style={styles.actionBtn} onPress={handleUpload}>
              <Text style={styles.actionBtnText}>Upload Document</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn} onPress={handleAnalyze}>
              <Text style={styles.actionBtnText}>Start Analysis</Text>
            </TouchableOpacity>
          </View>
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
  docItem: {
    marginBottom: 10,
  },
  docName: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
  },
  docDate: {
    fontSize: 12,
    color: '#888',
  },
  actionBtn: {
    backgroundColor: '#007bff',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginRight: 8,
  },
  actionBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
  notificationIcon: {
    position: 'absolute',
    top: 18,
    right: 18,
    zIndex: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
});

export default DashboardScreen; 