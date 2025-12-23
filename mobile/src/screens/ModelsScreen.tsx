import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { GlassCard } from '../components/GlassCard';
import { MetricCard } from '../components/MetricCard';
import { colors, fontSize, spacing, borderRadius } from '../theme';
import { modelPerformanceData } from '../utils/mockData';

export default function ModelsScreen() {
  const bestModel = modelPerformanceData[0];

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
        <Text style={styles.title}>Model Performance</Text>
        <Text style={styles.subtitle}>
          Compare ML models and their prediction accuracy
        </Text>

        <GlassCard style={styles.bestModelCard}>
          <View style={styles.bestModelHeader}>
            <Ionicons name="trophy" size={32} color={colors.warning} />
            <View style={styles.bestModelText}>
              <Text style={styles.bestModelLabel}>Best Performing Model</Text>
              <Text style={styles.bestModelName}>{bestModel.name}</Text>
            </View>
          </View>
          <View style={styles.metricsRow}>
            <View style={styles.metricItem}>
              <Text style={styles.metricValue}>{bestModel.accuracy}%</Text>
              <Text style={styles.metricLabel}>Accuracy</Text>
            </View>
            <View style={styles.metricItem}>
              <Text style={styles.metricValue}>{bestModel.mae}</Text>
              <Text style={styles.metricLabel}>MAE</Text>
            </View>
            <View style={styles.metricItem}>
              <Text style={styles.metricValue}>{bestModel.r2Score}</Text>
              <Text style={styles.metricLabel}>R² Score</Text>
            </View>
          </View>
        </GlassCard>

        <Text style={styles.sectionTitle}>All Models</Text>

        {modelPerformanceData.map((model, index) => (
          <GlassCard key={model.name} style={styles.modelCard}>
            <View style={styles.modelHeader}>
              <View style={styles.modelRank}>
                <Text style={styles.rankText}>#{index + 1}</Text>
              </View>
              <Text style={styles.modelName}>{model.name}</Text>
            </View>

            <View style={styles.modelMetrics}>
              <View style={styles.modelMetricRow}>
                <Text style={styles.modelMetricLabel}>Accuracy</Text>
                <View style={styles.progressBar}>
                  <View 
                    style={[
                      styles.progressFill, 
                      { width: `${model.accuracy}%`, backgroundColor: colors.success }
                    ]} 
                  />
                </View>
                <Text style={styles.modelMetricValue}>{model.accuracy}%</Text>
              </View>

              <View style={styles.modelMetricRow}>
                <Text style={styles.modelMetricLabel}>MAE</Text>
                <View style={styles.progressBar}>
                  <View 
                    style={[
                      styles.progressFill, 
                      { width: `${100 - (model.mae * 10)}%`, backgroundColor: colors.primary }
                    ]} 
                  />
                </View>
                <Text style={styles.modelMetricValue}>{model.mae}</Text>
              </View>

              <View style={styles.modelMetricRow}>
                <Text style={styles.modelMetricLabel}>RMSE</Text>
                <View style={styles.progressBar}>
                  <View 
                    style={[
                      styles.progressFill, 
                      { width: `${100 - (model.rmse * 10)}%`, backgroundColor: colors.secondary }
                    ]} 
                  />
                </View>
                <Text style={styles.modelMetricValue}>{model.rmse}</Text>
              </View>

              <View style={styles.modelMetricRow}>
                <Text style={styles.modelMetricLabel}>R² Score</Text>
                <View style={styles.progressBar}>
                  <View 
                    style={[
                      styles.progressFill, 
                      { width: `${model.r2Score * 100}%`, backgroundColor: colors.warning }
                    ]} 
                  />
                </View>
                <Text style={styles.modelMetricValue}>{model.r2Score}</Text>
              </View>
            </View>
          </GlassCard>
        ))}

        <GlassCard style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <Ionicons name="information-circle" size={20} color={colors.primary} />
            <Text style={styles.infoTitle}>About Models</Text>
          </View>
          <Text style={styles.infoText}>
            All models are trained on 100,000+ samples from 2010-2024. 
            Random Forest provides the best balance of accuracy and reliability 
            for agricultural price predictions.
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
  },
  bestModelCard: {
    marginBottom: spacing.lg,
  },
  bestModelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  bestModelText: {
    marginLeft: spacing.md,
    flex: 1,
  },
  bestModelLabel: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  bestModelName: {
    fontSize: fontSize.lg,
    fontWeight: 'bold',
    color: colors.text,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: spacing.md,
  },
  metricItem: {
    alignItems: 'center',
  },
  metricValue: {
    fontSize: fontSize.xl,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  metricLabel: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.md,
  },
  modelCard: {
    marginBottom: spacing.md,
  },
  modelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  modelRank: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  rankText: {
    fontSize: fontSize.sm,
    fontWeight: 'bold',
    color: colors.primary,
  },
  modelName: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
  },
  modelMetrics: {
    gap: spacing.sm,
  },
  modelMetricRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  modelMetricLabel: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    width: 70,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: colors.surfaceLight,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
  },
  modelMetricValue: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.text,
    width: 50,
    textAlign: 'right',
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
