import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { MetricCard } from '../components/MetricCard';
import { GlassCard } from '../components/GlassCard';
import { colors, fontSize, spacing, borderRadius } from '../theme';
import { cities, varieties, models, generateYears, months, formatCurrency } from '../utils/mockData';

export default function DashboardScreen() {
  const [selectedCity, setSelectedCity] = useState(cities[0]);
  const [selectedVariety, setSelectedVariety] = useState(varieties[0]);
  const [selectedModel, setSelectedModel] = useState(models[0]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [prediction, setPrediction] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const years = generateYears();

  const handlePredict = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const basePrice = 28500;
      const seasonalFactor = Math.sin((selectedMonth / 12) * Math.PI * 2) * 0.08;
      const randomFactor = (Math.random() - 0.5) * 0.05;
      const predictedPrice = basePrice * (1 + seasonalFactor + randomFactor);

      const modelAccuracy = {
        'Random Forest': { accuracy: 98.2, mae: 1.02, r2: 0.998 },
        'XGBoost': { accuracy: 97.8, mae: 1.15, r2: 0.996 },
        'LSTM': { accuracy: 96.5, mae: 1.48, r2: 0.992 },
        'Linear Regression': { accuracy: 89.3, mae: 3.21, r2: 0.945 },
      };

      const modelStats = modelAccuracy[selectedModel as keyof typeof modelAccuracy];

      setPrediction({
        price: Math.round(predictedPrice),
        confidence: modelStats.accuracy,
        mae: modelStats.mae,
        r2Score: modelStats.r2,
        trend: Math.random() > 0.5 ? 'up' : 'down',
      });

      setLoading(false);
    }, 1000);
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
        {/* Controls */}
        <GlassCard style={styles.controlsCard}>
          <Text style={styles.sectionTitle}>Prediction Parameters</Text>
          
          <View style={styles.pickerContainer}>
            <Text style={styles.label}>Market / City</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={selectedCity}
                onValueChange={setSelectedCity}
                style={styles.picker}
                dropdownIconColor={colors.primary}
              >
                {cities.map((city) => (
                  <Picker.Item key={city} label={city} value={city} />
                ))}
              </Picker>
            </View>
          </View>

          <View style={styles.pickerContainer}>
            <Text style={styles.label}>Variety</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={selectedVariety}
                onValueChange={setSelectedVariety}
                style={styles.picker}
                dropdownIconColor={colors.primary}
              >
                {varieties.map((variety) => (
                  <Picker.Item key={variety} label={variety} value={variety} />
                ))}
              </Picker>
            </View>
          </View>

          <View style={styles.pickerContainer}>
            <Text style={styles.label}>Model</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={selectedModel}
                onValueChange={setSelectedModel}
                style={styles.picker}
                dropdownIconColor={colors.primary}
              >
                {models.map((model) => (
                  <Picker.Item key={model} label={model} value={model} />
                ))}
              </Picker>
            </View>
          </View>

          <View style={styles.row}>
            <View style={[styles.pickerContainer, styles.halfWidth]}>
              <Text style={styles.label}>Year</Text>
              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={selectedYear}
                  onValueChange={setSelectedYear}
                  style={styles.picker}
                  dropdownIconColor={colors.primary}
                >
                  {years.map((year) => (
                    <Picker.Item key={year} label={year.toString()} value={year} />
                  ))}
                </Picker>
              </View>
            </View>

            <View style={[styles.pickerContainer, styles.halfWidth]}>
              <Text style={styles.label}>Month</Text>
              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={selectedMonth}
                  onValueChange={setSelectedMonth}
                  style={styles.picker}
                  dropdownIconColor={colors.primary}
                >
                  {months.map((month, index) => (
                    <Picker.Item key={month} label={month} value={index + 1} />
                  ))}
                </Picker>
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={styles.predictButton}
            onPress={handlePredict}
            disabled={loading}
          >
            <LinearGradient
              colors={[colors.primary, colors.secondary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.predictGradient}
            >
              {loading ? (
                <Text style={styles.predictText}>Predicting...</Text>
              ) : (
                <>
                  <Ionicons name="analytics" size={20} color={colors.text} />
                  <Text style={styles.predictText}>Run Prediction</Text>
                </>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </GlassCard>

        {/* Prediction Result */}
        {prediction && (
          <>
            <GlassCard style={styles.predictionCard}>
              <View style={styles.predictionHeader}>
                <Ionicons name="cash" size={32} color={colors.primary} />
                <Text style={styles.predictionLabel}>Predicted Price</Text>
              </View>
              <View style={styles.predictionValue}>
                <Text style={styles.priceText}>{formatCurrency(prediction.price)}</Text>
                <Ionicons 
                  name={prediction.trend === 'up' ? 'trending-up' : 'trending-down'} 
                  size={32} 
                  color={prediction.trend === 'up' ? colors.success : colors.error}
                />
              </View>
              <Text style={styles.predictionSubtext}>per quintal</Text>
              <View style={styles.confidenceBar}>
                <View style={styles.confidenceBarFill} />
                <Text style={styles.confidenceText}>{prediction.confidence}% Confidence</Text>
              </View>
            </GlassCard>

            <View style={styles.metricsGrid}>
              <MetricCard
                title="Accuracy"
                value={`${prediction.confidence}%`}
                subtitle={selectedModel}
                icon="checkmark-circle"
                iconColor={colors.success}
              />
              <MetricCard
                title="MAE"
                value={prediction.mae}
                subtitle="Mean Absolute Error"
                icon="analytics"
                iconColor={colors.primary}
              />
            </View>

            <View style={styles.metricsGrid}>
              <MetricCard
                title="R² Score"
                value={prediction.r2Score}
                subtitle="Correlation"
                icon="trending-up"
                iconColor={colors.secondary}
              />
              <MetricCard
                title="Model"
                value={selectedModel.split(' ')[0]}
                subtitle="Algorithm"
                icon="cube"
                iconColor={colors.warning}
              />
            </View>
          </>
        )}

        {/* Info */}
        <GlassCard style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <Ionicons name="information-circle" size={20} color={colors.primary} />
            <Text style={styles.infoTitle}>About Predictions</Text>
          </View>
          <Text style={styles.infoText}>
            Predictions are based on 100,000+ historical samples from 2010-2024. 
            The Random Forest model provides the highest accuracy at 98.2%.
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
  controlsCard: {
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.md,
  },
  pickerContainer: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  pickerWrapper: {
    backgroundColor: colors.surfaceLight,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  picker: {
    color: colors.text,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  halfWidth: {
    flex: 1,
  },
  predictButton: {
    marginTop: spacing.md,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  predictGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
    gap: spacing.sm,
  },
  predictText: {
    fontSize: fontSize.md,
    fontWeight: 'bold',
    color: colors.text,
  },
  predictionCard: {
    marginBottom: spacing.md,
    alignItems: 'center',
  },
  predictionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  predictionLabel: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    marginLeft: spacing.sm,
  },
  predictionValue: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  priceText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: colors.text,
    marginRight: spacing.sm,
  },
  predictionSubtext: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  confidenceBar: {
    width: '100%',
    height: 8,
    backgroundColor: colors.surfaceLight,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
    marginTop: spacing.sm,
  },
  confidenceBarFill: {
    height: '100%',
    width: '98%',
    backgroundColor: colors.primary,
  },
  confidenceText: {
    fontSize: fontSize.xs,
    color: colors.text,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  metricsGrid: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.md,
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
