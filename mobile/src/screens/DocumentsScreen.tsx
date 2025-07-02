import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DocumentsScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Documents</Text>
      <Text style={styles.subtitle}>Manage and upload your compliance documents</Text>
      
      <View style={styles.content}>
        <Text style={styles.placeholder}>
          📄 Document Management{'\n\n'}
          Document upload, management, and processing functionality will be implemented here.{'\n\n'}
          Features will include:{'\n'}
          • File upload with camera integration{'\n'}
          • Document list and search{'\n'}
          • Document processing status{'\n'}
          • File preview and download
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: '#666',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholder: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
});

export default DocumentsScreen; 