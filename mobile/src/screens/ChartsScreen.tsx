import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { GlassCard } from '../components/GlassCard';
import { colors, fontSize, spacing } from '../theme';
import { generateHistoricalData, generateForecastData } from '../utils/mockData';

const screenWidth = Dimensions.get('window').width;

export default function ChartsScreen() {
  const historicalData = generateHistoricalData(12);
  const forecastData = generateForecastData(6);

  const chartConfig = {
    backgroundColor: colors.surface,
    backgroundGradientFrom: colors.surface,
    backgroundGradientTo: colors.surfaceLight,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 217, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(156, 163, 175, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '4',
      strokeWidth: '2',
      stroke: colors.primary,
    },
  };

  const priceData = {
    labels: historicalData.slice(-6).map(d => {
      const date = new Date(d.date);
      return date.toLocaleDateString('en-US', { month: 'short' });
    }),
    datasets: [{
      data: historicalData.slice(-6).map(d => d.price),
    }],
  };

  const rainfallData = {
    labels: historicalData.slice(-6).map(d => {
      const date = new Date(d.date);
      return date.toLocaleDateString('en-US', { month: 'short' });
    }),
    datasets: [{
      data: historicalData.slice(-6).map(d => d.rainfall || 0),
    }],
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
        <Text style={styles.title}>Price Analytics</Text>
        <Text style={styles.subtitle}>
          Interactive charts and trend analysis
        </Text>

        <GlassCard style={styles.chartCard}>
          <Text style={styles.chartTitle}>Price Trend (Last 6 Months)</Text>
          <LineChart
            data={priceData}
            width={screenWidth - 64}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
        </GlassCard>

        <GlassCard style={styles.chartCard}>
          <Text style={styles.chartTitle}>Rainfall Pattern (mm)</Text>
          <BarChart
            data={rainfallData}
            width={screenWidth - 64}
            height={220}
            chartConfig={{
              ...chartConfig,
              color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`,
            }}
            style={styles.chart}
            yAxisLabel=""
            yAxisSuffix="mm"
          />
        </GlassCard>

        <GlassCard style={styles.statsCard}>
          <Text style={styles.statsTitle}>Key Statistics</Text>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Average Price:</Text>
            <Text style={styles.statValue}>
              ₹{Math.round(historicalData.reduce((sum, d) => sum + d.price, 0) / historicalData.length).toLocaleString()}
            </Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Highest Price:</Text>
            <Text style={styles.statValue}>
              ₹{Math.max(...historicalData.map(d => d.price)).toLocaleString()}
            </Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Lowest Price:</Text>
            <Text style={styles.statValue}>
              ₹{Math.min(...historicalData.map(d => d.price)).toLocaleString()}
            </Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Price Volatility:</Text>
            <Text style={styles.statValue}>±8.5%</Text>
          </View>
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
  chartCard: {
    marginBottom: spacing.md,
  },
  chartTitle: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.md,
  },
  chart: {
    marginVertical: spacing.sm,
    borderRadius: 16,
  },
  statsCard: {
    marginTop: spacing.md,
  },
  statsTitle: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.md,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  statLabel: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  statValue: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.text,
  },
});
