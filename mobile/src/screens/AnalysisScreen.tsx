import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { listDocuments } from '../services/documentService';
import { requestAnalysis, getAnalysisResult } from '../services/analysisService';
import type { Document, AnalysisJob } from '../types';

const AnalysisScreen: React.FC = () => {
  const { token } = useAuth();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loadingDocs, setLoadingDocs] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const [analysisJob, setAnalysisJob] = useState<AnalysisJob | null>(null);
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch documents on mount
  useEffect(() => {
    const fetchDocs = async () => {
      if (!token) return;
      setLoadingDocs(true);
      setError(null);
      try {
        const docs = await listDocuments(token);
        setDocuments(docs);
      } catch (err: any) {
        setError('Failed to load documents');
      } finally {
        setLoadingDocs(false);
      }
    };
    fetchDocs();
  }, [token]);

  // Request analysis for selected document
  const handleAnalyze = async (doc: Document) => {
    if (!token) return;
    setSelectedDoc(doc);
    setAnalyzing(true);
    setError(null);
    setAnalysisJob(null);
    try {
      const job = await requestAnalysis(token, doc.id);
      setAnalysisJob(job);
      // Optionally, poll for result if status is not completed
      if (job.status !== 'completed') {
        setAnalysisLoading(true);
        // Simple polling (for demo): try up to 5 times
        let resultJob = job;
        for (let i = 0; i < 5; i++) {
          await new Promise(res => setTimeout(res, 2000));
          resultJob = await getAnalysisResult(token, job.id);
          if (resultJob.status === 'completed' || resultJob.status === 'failed') break;
        }
        setAnalysisJob(resultJob);
        setAnalysisLoading(false);
      }
    } catch (err: any) {
      setError('Failed to request analysis');
    } finally {
      setAnalyzing(false);
    }
  };

  const renderDocItem = ({ item }: { item: Document }) => (
    <TouchableOpacity style={styles.docItem} onPress={() => handleAnalyze(item)} disabled={analyzing}>
      <View style={{ flex: 1 }}>
        <Text style={styles.docName}>{item.name}</Text>
        <Text style={styles.docDate}>Uploaded: {new Date(item.uploadedAt).toLocaleString()}</Text>
      </View>
      <Text style={styles.analyzeBtn}>Analyze</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Analysis</Text>
      <Text style={styles.subtitle}>Select a document to analyze for compliance</Text>
      {loadingDocs ? (
        <ActivityIndicator size="large" color="#007bff" style={{ marginTop: 30 }} />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <FlatList
          data={documents}
          keyExtractor={item => item.id}
          renderItem={renderDocItem}
          contentContainerStyle={documents.length === 0 ? styles.emptyList : undefined}
          ListEmptyComponent={<Text style={styles.emptyText}>No documents found.</Text>}
        />
      )}
      {analyzing && <ActivityIndicator size="small" color="#007bff" style={{ marginTop: 20 }} />}
      {selectedDoc && analysisJob && (
        <View style={styles.resultCard}>
          <Text style={styles.resultTitle}>Analysis Result for: {selectedDoc.name}</Text>
          <Text>Status: {analysisJob.status}</Text>
          {analysisLoading && <ActivityIndicator size="small" color="#007bff" style={{ marginTop: 10 }} />}
          {analysisJob.status === 'completed' && (
            <Text style={styles.resultText}>{JSON.stringify(analysisJob.result, null, 2)}</Text>
          )}
          {analysisJob.status === 'failed' && (
            <Text style={styles.error}>Analysis failed.</Text>
          )}
        </View>
      )}
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
  docItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  docName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  docDate: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  analyzeBtn: {
    color: '#007bff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
  },
  resultCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  resultText: {
    fontFamily: 'monospace',
    fontSize: 13,
    color: '#222',
    marginTop: 8,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#888',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 40,
  },
});

export default AnalysisScreen; 