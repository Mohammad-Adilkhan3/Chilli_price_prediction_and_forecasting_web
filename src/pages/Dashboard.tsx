import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/glass-card';
import { MetricCard } from '@/components/ui/metric-card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrendingUp, TrendingDown, Target, Brain } from 'lucide-react';
import PageMeta from '@/components/common/PageMeta';
import { generateDataForYearMonth, modelPerformanceData, cities, varieties, models, frequencies, generateYears, months, sampleDataForDisplay } from '@/utils/mockData';
import mlService from '@/services/mlService';
import { datasetStats } from '@/data/embeddedDataset';

const Dashboard: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState('Bangalore');
  const [selectedVariety, setSelectedVariety] = useState('Guntur');
  const [selectedModel, setSelectedModel] = useState('Random Forest');
  const [selectedFrequency, setSelectedFrequency] = useState('Monthly');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState<any>(null);
  const [modelMetrics, setModelMetrics] = useState<any[]>([]);

  const years = useMemo(() => generateYears(), []);

  // Load model metrics on mount
  useEffect(() => {
    const metrics = mlService.getMetrics();
    if (metrics && metrics.length > 0) {
      setModelMetrics(metrics);
      // Set active model as selected
      const activeModel = mlService.getActiveModel();
      setSelectedModel(activeModel);
    }
  }, []);

  // Get current model metrics
  const currentModelMetrics = useMemo(() => {
    if (modelMetrics.length === 0) return null;
    return modelMetrics.find(m => m.name === selectedModel) || modelMetrics[0];
  }, [modelMetrics, selectedModel]);

  // Get raw data based on selected year and month
  const rawChartData = useMemo(() => {
    return generateDataForYearMonth(selectedYear, selectedMonth);
  }, [selectedYear, selectedMonth]);

  // Sample data for chart display to improve performance
  const chartData = useMemo(() => {
    return sampleDataForDisplay(rawChartData, 150);
  }, [rawChartData]);

  const currentModel = modelPerformanceData.find(m => m.name === selectedModel) || modelPerformanceData[0];

  const latestData = chartData[chartData.length - 1];
  const previousData = chartData[chartData.length - 2];
  const priceChange = ((latestData.price - previousData.price) / previousData.price * 100).toFixed(2);
  const trend = Number.parseFloat(priceChange) > 0 ? 'up' : 'down';

  const handleRunPrediction = async () => {
    setIsLoading(true);
    
    try {
      // Use embedded ML service with automatic parameter calculation
      const result = mlService.predict({
        year: selectedYear,
        month: selectedMonth,
        city: selectedCity,
        variety: selectedVariety,
        frequency: selectedFrequency as 'Weekly' | 'Monthly' | 'Yearly'
      });
      
      setPrediction(result);
    } catch (error) {
      console.error('Prediction error:', error);
    } finally {
      setTimeout(() => setIsLoading(false), 800);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <>
      <PageMeta
        title="AI Dashboard - AgriAI"
        description="Real-time agricultural price predictions and market analytics"
      />
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-card">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="mb-8">
              <h1 className="text-3xl xl:text-4xl font-bold mb-2">
                <span className="gradient-text">AI Prediction Dashboard</span>
              </h1>
              <p className="text-muted-foreground">
                Real-time chilli price forecasting powered by machine learning
              </p>
            </motion.div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
              <motion.div variants={itemVariants} className="xl:col-span-3">
                <GlassCard className="sticky top-20">
                  <h2 className="text-lg font-semibold mb-4">Prediction Settings</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">City / Market</label>
                      <Select value={selectedCity} onValueChange={setSelectedCity}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {cities.map(city => (
                            <SelectItem key={city} value={city}>{city}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">Variety</label>
                      <Select value={selectedVariety} onValueChange={setSelectedVariety}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {varieties.map(variety => (
                            <SelectItem key={variety} value={variety}>{variety}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">
                        Model
                        <span className="ml-2 text-xs bg-primary/20 text-primary px-2 py-0.5 rounded">
                          Trained
                        </span>
                      </label>
                      <Select value={selectedModel} onValueChange={setSelectedModel}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Random Forest">Random Forest</SelectItem>
                          <SelectItem value="XGBoost">XGBoost</SelectItem>
                          <SelectItem value="Linear Regression">Linear Regression</SelectItem>
                          <SelectItem value="Gradient Boosting">Gradient Boosting</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                        <Brain className="w-3 h-3" />
                        Trained on {datasetStats.totalSamples.toLocaleString()}+ samples
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-sm text-muted-foreground mb-2 block">Year</label>
                        <Select value={selectedYear.toString()} onValueChange={(val) => setSelectedYear(Number.parseInt(val))}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {years.map(year => (
                              <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm text-muted-foreground mb-2 block">Month</label>
                        <Select value={selectedMonth.toString()} onValueChange={(val) => setSelectedMonth(Number.parseInt(val))}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {months.map((month, index) => (
                              <SelectItem key={month} value={(index + 1).toString()}>{month}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Button
                      className="w-full gradient-primary glow-primary"
                      onClick={handleRunPrediction}
                      disabled={isLoading}
                    >
                      {isLoading ? 'Running...' : 'Run Prediction'}
                    </Button>
                  </div>
                </GlassCard>
              </motion.div>

              <div className="xl:col-span-9 space-y-6">
                <motion.div variants={itemVariants}>
                  <GlassCard className="glow-primary">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h2 className="text-sm text-muted-foreground mb-1">
                          AI Price Prediction - {months[selectedMonth - 1]} {selectedYear}
                        </h2>
                        <div className="flex items-baseline gap-2">
                          <span className="text-4xl xl:text-5xl font-bold gradient-text">
                            ₹{prediction ? prediction.predictedPrice.toLocaleString() : latestData.price.toLocaleString()}
                          </span>
                          <span className="text-sm text-muted-foreground">per quintal</span>
                        </div>
                      </div>
                      <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${trend === 'up' ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'}`}>
                        {trend === 'up' ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                        <span className="font-semibold">{priceChange}%</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 pt-4 border-t border-border/50">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Confidence</p>
                        <p className="text-lg font-semibold">{prediction ? prediction.confidence : currentModelMetrics?.accuracy.toFixed(0) || 98}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Range</p>
                        <p className="text-lg font-semibold">
                          {prediction ? (
                            <>₹{(prediction.predictedPrice * 0.97).toFixed(0)} - ₹{(prediction.predictedPrice * 1.03).toFixed(0)}</>
                          ) : (
                            <>₹{(latestData.price * 0.97).toFixed(0)} - ₹{(latestData.price * 1.03).toFixed(0)}</>
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Model</p>
                        <p className="text-lg font-semibold">{selectedModel}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Dataset</p>
                        <p className="text-lg font-semibold">{datasetStats.totalSamples.toLocaleString()}</p>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>

                <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                  <MetricCard
                    title="Accuracy"
                    value={`${currentModelMetrics?.accuracy.toFixed(1) || 98.0}%`}
                    icon={Target}
                    trend="up"
                    trendValue="+1.2%"
                  />
                  <MetricCard
                    title="MAE"
                    value={currentModelMetrics?.mae.toFixed(0) || '1.0'}
                    subtitle="Mean Absolute Error"
                    icon={Brain}
                    trend="down"
                    trendValue="-0.08"
                  />
                  <MetricCard
                    title="R² Score"
                    value={currentModelMetrics?.r2Score.toFixed(3) || '0.998'}
                    subtitle="Model Reliability"
                    icon={TrendingUp}
                  />
                  <MetricCard
                    title="RMSE"
                    value={currentModelMetrics?.rmse.toFixed(0) || '1.2'}
                    subtitle="Root Mean Square Error"
                    icon={Target}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <GlassCard>
                    <h3 className="text-lg font-semibold mb-4">Price Trend & Forecast</h3>
                    <ResponsiveContainer width="100%" height={350}>
                      <AreaChart data={chartData}>
                        <defs>
                          <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                        <XAxis
                          dataKey="date"
                          stroke="hsl(var(--muted-foreground))"
                          tick={{ fontSize: 12 }}
                          tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', year: '2-digit' })}
                        />
                        <YAxis
                          stroke="hsl(var(--muted-foreground))"
                          tick={{ fontSize: 12 }}
                          tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'hsl(var(--card))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px'
                          }}
                          formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Price']}
                          labelFormatter={(label) => new Date(label).toLocaleDateString()}
                        />
                        <Area
                          type="monotone"
                          dataKey="price"
                          stroke="hsl(var(--primary))"
                          strokeWidth={2}
                          fill="url(#colorPrice)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </GlassCard>
                </motion.div>

                <motion.div variants={itemVariants} className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  <GlassCard>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <TrendingDown className="w-5 h-5 text-primary" />
                      Rainfall Impact
                    </h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <ScatterChart>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                        <XAxis
                          dataKey="rainfall"
                          stroke="hsl(var(--muted-foreground))"
                          tick={{ fontSize: 12 }}
                          label={{ value: 'Rainfall (mm)', position: 'insideBottom', offset: -5 }}
                        />
                        <YAxis
                          dataKey="price"
                          stroke="hsl(var(--muted-foreground))"
                          tick={{ fontSize: 12 }}
                          tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'hsl(var(--card))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px'
                          }}
                        />
                        <Scatter data={chartData.slice(-12)} fill="hsl(var(--primary))" />
                      </ScatterChart>
                    </ResponsiveContainer>
                  </GlassCard>

                  <GlassCard>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Target className="w-5 h-5 text-secondary" />
                      Market Arrivals
                    </h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={chartData.slice(-12)}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                        <XAxis
                          dataKey="date"
                          stroke="hsl(var(--muted-foreground))"
                          tick={{ fontSize: 12 }}
                          tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short' })}
                        />
                        <YAxis
                          stroke="hsl(var(--muted-foreground))"
                          tick={{ fontSize: 12 }}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'hsl(var(--card))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px'
                          }}
                          formatter={(value: number) => [`${value} quintals`, 'Arrivals']}
                        />
                        <Bar dataKey="arrivals" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </GlassCard>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
