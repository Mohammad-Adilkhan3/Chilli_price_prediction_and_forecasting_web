import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { MetricCard } from '../components/MetricCard';
import { GlassCard } from '../components/GlassCard';
import { colors, fontSize, spacing, borderRadius } from '../theme';

export default function HomeScreen() {
  const navigation = useNavigation();

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
        {/* Hero Section */}
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>AI-Powered Agricultural</Text>
          <Text style={styles.heroTitle}>Price Intelligence</Text>
          <Text style={styles.heroSubtitle}>
            Predict chilli prices with 98% accuracy using advanced machine learning
          </Text>
        </View>

        {/* Key Metrics */}
        <View style={styles.metricsGrid}>
          <MetricCard
            title="Prediction Accuracy"
            value="98.2%"
            subtitle="Random Forest Model"
            icon="checkmark-circle"
            iconColor={colors.success}
          />
          <MetricCard
            title="Mean Absolute Error"
            value="1.02"
            subtitle="Best in class"
            icon="analytics"
            iconColor={colors.primary}
          />
        </View>

        <View style={styles.metricsGrid}>
          <MetricCard
            title="R² Score"
            value="0.998"
            subtitle="High correlation"
            icon="trending-up"
            iconColor={colors.secondary}
          />
          <MetricCard
            title="Training Samples"
            value="100K+"
            subtitle="2010-2024 data"
            icon="server"
            iconColor={colors.warning}
          />
        </View>

        {/* Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Features</Text>
          
          <GlassCard style={styles.featureCard}>
            <View style={styles.featureHeader}>
              <Ionicons name="analytics" size={32} color={colors.primary} />
              <View style={styles.featureText}>
                <Text style={styles.featureTitle}>AI Price Predictions</Text>
                <Text style={styles.featureDescription}>
                  Get accurate price forecasts using 4 ML models
                </Text>
              </View>
            </View>
          </GlassCard>

          <GlassCard style={styles.featureCard}>
            <View style={styles.featureHeader}>
              <Ionicons name="bulb" size={32} color={colors.secondary} />
              <View style={styles.featureText}>
                <Text style={styles.featureTitle}>Market Insights</Text>
                <Text style={styles.featureDescription}>
                  AI-generated analysis and risk alerts
                </Text>
              </View>
            </View>
          </GlassCard>

          <GlassCard style={styles.featureCard}>
            <View style={styles.featureHeader}>
              <Ionicons name="chatbubbles" size={32} color={colors.success} />
              <View style={styles.featureText}>
                <Text style={styles.featureTitle}>AI Assistant</Text>
                <Text style={styles.featureDescription}>
                  Ask questions about market trends and predictions
                </Text>
              </View>
            </View>
          </GlassCard>

          <GlassCard style={styles.featureCard}>
            <View style={styles.featureHeader}>
              <Ionicons name="bar-chart" size={32} color={colors.warning} />
              <View style={styles.featureText}>
                <Text style={styles.featureTitle}>Advanced Charts</Text>
                <Text style={styles.featureDescription}>
                  Interactive visualizations and trend analysis
                </Text>
              </View>
            </View>
          </GlassCard>
        </View>

        {/* CTA Buttons */}
        <View style={styles.ctaContainer}>
          <TouchableOpacity
            style={[styles.ctaButton, styles.ctaPrimary]}
            onPress={() => navigation.navigate('Dashboard' as never)}
          >
            <LinearGradient
              colors={[colors.primary, colors.secondary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.ctaGradient}
            >
              <Text style={styles.ctaText}>Launch Dashboard</Text>
              <Ionicons name="arrow-forward" size={20} color={colors.text} />
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.ctaButton, styles.ctaSecondary]}
            onPress={() => navigation.navigate('Chat' as never)}
          >
            <Text style={styles.ctaTextSecondary}>Talk to AI Assistant</Text>
            <Ionicons name="chatbubbles" size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Training Data Info */}
        <GlassCard style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <Ionicons name="information-circle" size={24} color={colors.primary} />
            <Text style={styles.infoTitle}>Training Data</Text>
          </View>
          <Text style={styles.infoText}>
            Models trained on 100,000+ samples from 2010-2024 covering 8 markets and 6 chilli varieties
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
  hero: {
    marginBottom: spacing.xl,
    paddingVertical: spacing.lg,
  },
  heroTitle: {
    fontSize: fontSize.xxxl,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  heroSubtitle: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    marginTop: spacing.sm,
    lineHeight: 24,
  },
  metricsGrid: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  section: {
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: fontSize.xl,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.md,
  },
  featureCard: {
    marginBottom: spacing.md,
  },
  featureHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureText: {
    flex: 1,
    marginLeft: spacing.md,
  },
  featureTitle: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  featureDescription: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  ctaContainer: {
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
  },
  ctaButton: {
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    marginBottom: spacing.md,
  },
  ctaPrimary: {
    elevation: 4,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  ctaGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
  },
  ctaText: {
    fontSize: fontSize.md,
    fontWeight: 'bold',
    color: colors.text,
    marginRight: spacing.sm,
  },
  ctaSecondary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  ctaTextSecondary: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.primary,
    marginRight: spacing.sm,
  },
  infoCard: {
    marginTop: spacing.lg,
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
