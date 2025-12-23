import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { GlassCard } from '../components/GlassCard';
import { colors, fontSize, spacing, borderRadius } from '../theme';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your AI agricultural assistant. Ask me anything about chilli price predictions, market trends, or agricultural insights.',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputText('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(inputText),
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const getAIResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('price') || lowerQuestion.includes('cost')) {
      return 'Based on our Random Forest model with 98.2% accuracy, current chilli prices are around ₹28,500 per quintal. Prices are expected to increase by 8-12% in the next quarter due to seasonal factors and reduced rainfall in key growing regions.';
    } else if (lowerQuestion.includes('accuracy') || lowerQuestion.includes('reliable')) {
      return 'Our prediction models are highly accurate! The Random Forest model achieves 98.2% accuracy with an R² score of 0.998, trained on 100,000+ samples from 2010-2024. This makes our predictions very reliable for agricultural planning.';
    } else if (lowerQuestion.includes('market') || lowerQuestion.includes('city')) {
      return 'We track prices across 8 major markets: Bangalore, Delhi, Mumbai, Guntur, Hyderabad, Chennai, Pune, and Kolkata. Guntur typically has lower prices as it\'s a production center, while Mumbai and Delhi command premium prices.';
    } else if (lowerQuestion.includes('variety') || lowerQuestion.includes('type')) {
      return 'We analyze 6 chilli varieties: Guntur, Byadgi, Teja, Sannam, Kashmiri, and Warangal. Kashmiri chillies typically fetch the highest prices (₹35,000+), while Sannam is more affordable (₹26,000-29,000).';
    } else {
      return 'I can help you with price predictions, market analysis, variety comparisons, and agricultural insights. What specific information would you like to know?';
    }
  };

  return (
    <LinearGradient
      colors={[colors.background, colors.surface]}
      style={styles.container}
    >
      <KeyboardAvoidingView 
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={100}
      >
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((message) => (
            <View
              key={message.id}
              style={[
                styles.messageContainer,
                message.isUser ? styles.userMessage : styles.aiMessage,
              ]}
            >
              {!message.isUser && (
                <View style={styles.aiIcon}>
                  <Ionicons name="sparkles" size={16} color={colors.primary} />
                </View>
              )}
              <GlassCard style={styles.messageBubble}>
                <Text style={styles.messageText}>{message.text}</Text>
              </GlassCard>
            </View>
          ))}
        </ScrollView>

        <View style={styles.inputContainer}>
          <GlassCard style={styles.inputCard}>
            <TextInput
              style={styles.input}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Ask about prices, trends, markets..."
              placeholderTextColor={colors.textSecondary}
              multiline
              maxLength={500}
            />
            <TouchableOpacity
              style={styles.sendButton}
              onPress={handleSend}
              disabled={!inputText.trim()}
            >
              <LinearGradient
                colors={[colors.primary, colors.secondary]}
                style={styles.sendGradient}
              >
                <Ionicons name="send" size={20} color={colors.text} />
              </LinearGradient>
            </TouchableOpacity>
          </GlassCard>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
    paddingBottom: spacing.lg,
  },
  messageContainer: {
    marginBottom: spacing.md,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  userMessage: {
    justifyContent: 'flex-end',
  },
  aiMessage: {
    justifyContent: 'flex-start',
  },
  aiIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: `${colors.primary}20`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  messageBubble: {
    maxWidth: '80%',
  },
  messageText: {
    fontSize: fontSize.sm,
    color: colors.text,
    lineHeight: 20,
  },
  inputContainer: {
    padding: spacing.md,
    paddingBottom: spacing.lg,
  },
  inputCard: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    fontSize: fontSize.md,
    color: colors.text,
    maxHeight: 100,
    paddingRight: spacing.sm,
  },
  sendButton: {
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  sendGradient: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
