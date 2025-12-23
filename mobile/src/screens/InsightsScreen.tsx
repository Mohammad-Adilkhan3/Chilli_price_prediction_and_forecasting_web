import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { GlassCard } from '../components/GlassCard';
import { colors, fontSize, spacing, borderRadius } from '../theme';
import { generateInsights } from '../utils/mockData';

export default function InsightsScreen() {
  const insights = generateInsights();

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'positive': return 'checkmark-circle';
      case 'negative': return 'alert-circle';
      case 'warning': return 'warning';
      default: return 'information-circle';
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'positive': return colors.success;
      case 'negative': return colors.error;
      case 'warning': return colors.warning;
      default: return colors.primary;
    }
  };

  return (
    <LinearGradient
      colors={[colors.background, colors.surface]}
      style={styles.container}
    >
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>AI Market Insights</Text>
        <Text style={styles.subtitle}>
          Real-time analysis and predictions powered by machine learning
        </Text>

        {insights.map((insight) => (
          <GlassCard key={insight.id} style={styles.insightCard}>
            <View style={styles.insightHeader}>
              <View style={[
                styles.iconContainer,
                { backgroundColor: `${getInsightColor(insight.type)}20` }
              ]}>
                <Ionicons 
                  name={getInsightIcon(insight.type)} 
                  size={24} 
                  color={getInsightColor(insight.type)} 
                />
              </View>
              <View style={styles.insightTitleContainer}>
                <Text style={styles.insightTitle}>{insight.title}</Text>
                <View style={styles.confidenceBadge}>
                  <Text style={styles.confidenceText}>
                    {insight.confidence}% confidence
                  </Text>
                </View>
              </View>
            </View>
            <Text style={styles.insightDescription}>{insight.description}</Text>
          </GlassCard>
        ))}

        <GlassCard style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <Ionicons name="information-circle" size={20} color={colors.primary} />
            <Text style={styles.infoTitle}>About Insights</Text>
          </View>
          <Text style={styles.infoText}>
            Insights are generated using advanced AI algorithms analyzing market trends, 
            weather patterns, and historical data to provide actionable intelligence.
          </Text>
        </GlassCard>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  title: {
    fontSize: fontSize.xxl,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
    lineHeight: 22,
  },
  insightCard: {
    marginBottom: spacing.md,
  },
  insightHeader: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  insightTitleContainer: {
    flex: 1,
  },
  insightTitle: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  confidenceBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.surfaceLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  confidenceText: {
    fontSize: fontSize.xs,
    color: colors.primary,
    fontWeight: '600',
  },
  insightDescription: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  infoCard: {
    marginTop: spacing.md,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  infoTitle: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.text,
    marginLeft: spacing.sm,
  },
  infoText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    lineHeight: 20,
  },
});
