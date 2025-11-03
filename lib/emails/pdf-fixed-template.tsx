import React from "react"
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer"

// Simple styles for fixed PDF
const styles = StyleSheet.create({
  page: {
    padding: 50,
    backgroundColor: '#0A0A0A',
    color: '#FFFFFF',
    fontFamily: 'Helvetica',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#60A5FA',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 30,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  section: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#E5C97E',
  },
  text: {
    fontSize: 12,
    marginBottom: 8,
    color: '#FFFFFF',
    lineHeight: 1.5,
  },
  listItem: {
    fontSize: 12,
    marginBottom: 6,
    color: '#D1D5DB',
    paddingLeft: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 50,
    left: 50,
    right: 50,
    textAlign: 'center',
    fontSize: 10,
    color: '#999999',
    fontStyle: 'italic',
  },
})

/**
 * Simple fixed PDF template - no dynamic data required
 * This is a fallback version that always works
 */
export function SimplePDFDocument() {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>LifeClock Report</Text>
        <Text style={styles.subtitle}>Your Eternal Report</Text>
        
        <View style={styles.section}>
          <Text style={styles.heading}>Your Report Contains:</Text>
          <Text style={styles.listItem}>• Your Life Index and Stage</Text>
          <Text style={styles.listItem}>• The 3 Hidden Forces</Text>
          <Text style={styles.listItem}>  - Your Shadow: what you refuse to see</Text>
          <Text style={styles.listItem}>  - Your Fear: what paralyzes you</Text>
          <Text style={styles.listItem}>  - Your Power: what you dare not use</Text>
          <Text style={styles.listItem}>• Your 47 Revelations</Text>
          <Text style={styles.listItem}>• Your Energy Profile</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>About Your Report</Text>
          <Text style={styles.text}>
            This report has been generated based on your responses to 100 questions.
            It reveals patterns, insights, and hidden forces that shape your life journey.
          </Text>
        </View>

        <Text style={styles.footer}>
          "Time is no longer counted. It belongs to you."{'\n'}
          Generated on {new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </Text>
      </Page>
    </Document>
  )
}

