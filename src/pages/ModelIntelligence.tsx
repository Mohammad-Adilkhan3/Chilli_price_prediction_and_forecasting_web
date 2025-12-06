import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from 'recharts';
import { GlassCard } from '@/components/ui/glass-card';
import { MetricCard } from '@/components/ui/metric-card';
import { Brain, Target, TrendingUp, Award, CheckCircle } from 'lucide-react';
import PageMeta from '@/components/common/PageMeta';
import { modelPerformanceData, featureImportanceData } from '@/utils/mockData';
import { Progress } from '@/components/ui/progress';

const ModelIntelligence: React.FC = () => {
  const bestModel = modelPerformanceData[0];

  const radarData = modelPerformanceData.map(model => ({
    model: model.name.split(' ')[0],
    accuracy: model.accuracy,
    reliability: model.r2Score * 100,
    precision: 100 - (model.mae * 10)
  }));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
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
        title="Model Intelligence - AgriAI"
        description="ML model performance analysis and explainable AI"
      />
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center glow-primary">
                  <Brain className="w-6 h-6 text-primary-foreground" />
                </div>
                <h1 className="text-3xl xl:text-4xl font-bold gradient-text">
                  Model Intelligence
                </h1>
              </div>
              <p className="text-muted-foreground">
                Compare ML models and explore explainable AI insights
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-8">
              <GlassCard className="glow-primary">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold mb-2">Best Performing Model</h2>
                    <p className="text-3xl font-bold gradient-text mb-2">{bestModel.name}</p>
                    <p className="text-muted-foreground">
                      Achieves {bestModel.accuracy}% accuracy with exceptional reliability metrics
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                  <div className="p-4 rounded-lg bg-muted/30">
                    <p className="text-sm text-muted-foreground mb-1">Accuracy</p>
                    <p className="text-2xl font-bold text-success">{bestModel.accuracy}%</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/30">
                    <p className="text-sm text-muted-foreground mb-1">MAE</p>
                    <p className="text-2xl font-bold text-primary">{bestModel.mae}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/30">
                    <p className="text-sm text-muted-foreground mb-1">RMSE</p>
                    <p className="text-2xl font-bold text-secondary">{bestModel.rmse}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/30">
                    <p className="text-sm text-muted-foreground mb-1">R² Score</p>
                    <p className="text-2xl font-bold text-success">{bestModel.r2Score}</p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
              <MetricCard
                title="Models Deployed"
                value="4"
                subtitle="Active ML Algorithms"
                icon={Brain}
              />
              <MetricCard
                title="Best Accuracy"
                value="98.2%"
                subtitle="Random Forest"
                icon={Target}
                trend="up"
                trendValue="+1.2%"
              />
              <MetricCard
                title="Avg R² Score"
                value="0.983"
                subtitle="Across All Models"
                icon={TrendingUp}
              />
              <MetricCard
                title="Training Data"
                value="24M"
                subtitle="Data Points"
                icon={CheckCircle}
              />
            </motion.div>

            <motion.div variants={itemVariants} className="mb-8">
              <GlassCard>
                <h3 className="text-lg font-semibold mb-4">Model Performance Comparison</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-semibold">Model</th>
                        <th className="text-center py-3 px-4 font-semibold">Accuracy</th>
                        <th className="text-center py-3 px-4 font-semibold">MAE</th>
                        <th className="text-center py-3 px-4 font-semibold">RMSE</th>
                        <th className="text-center py-3 px-4 font-semibold">R² Score</th>
                        <th className="text-center py-3 px-4 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {modelPerformanceData.map((model, index) => (
                        <tr key={model.name} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              {index === 0 && (
                                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                                  <Award className="w-4 h-4 text-primary" />
                                </div>
                              )}
                              <span className="font-medium">{model.name}</span>
                            </div>
                          </td>
                          <td className="text-center py-4 px-4">
                            <span className="font-semibold text-success">{model.accuracy}%</span>
                          </td>
                          <td className="text-center py-4 px-4">{model.mae}</td>
                          <td className="text-center py-4 px-4">{model.rmse}</td>
                          <td className="text-center py-4 px-4">
                            <span className="font-semibold">{model.r2Score}</span>
                          </td>
                          <td className="text-center py-4 px-4">
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-success/10 text-success text-xs font-medium">
                              <CheckCircle className="w-3 h-3" />
                              Active
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </GlassCard>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
              <GlassCard>
                <h3 className="text-lg font-semibold mb-4">Model Performance Radar</h3>
                <ResponsiveContainer width="100%" height={350}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="hsl(var(--border))" />
                    <PolarAngleAxis
                      dataKey="model"
                      stroke="hsl(var(--muted-foreground))"
                      tick={{ fontSize: 12 }}
                    />
                    <PolarRadiusAxis
                      angle={90}
                      domain={[0, 100]}
                      stroke="hsl(var(--muted-foreground))"
                      tick={{ fontSize: 10 }}
                    />
                    <Radar
                      name="Accuracy"
                      dataKey="accuracy"
                      stroke="hsl(var(--primary))"
                      fill="hsl(var(--primary))"
                      fillOpacity={0.3}
                    />
                    <Radar
                      name="Reliability"
                      dataKey="reliability"
                      stroke="hsl(var(--secondary))"
                      fill="hsl(var(--secondary))"
                      fillOpacity={0.3}
                    />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </GlassCard>

              <GlassCard>
                <h3 className="text-lg font-semibold mb-4">Feature Importance (SHAP Values)</h3>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={featureImportanceData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                    <XAxis type="number" stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 12 }} />
                    <YAxis
                      type="category"
                      dataKey="feature"
                      stroke="hsl(var(--muted-foreground))"
                      tick={{ fontSize: 12 }}
                      width={120}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                      formatter={(value: number) => [`${(value * 100).toFixed(1)}%`, 'Importance']}
                    />
                    <Bar dataKey="importance" radius={[0, 4, 4, 0]}>
                      {featureImportanceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </GlassCard>
            </motion.div>

            <motion.div variants={itemVariants}>
              <GlassCard>
                <h3 className="text-lg font-semibold mb-4">Explainable AI Insights</h3>
                <div className="space-y-6">
                  {featureImportanceData.map((feature) => (
                    <div key={feature.feature}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-4 h-4 rounded"
                            style={{ backgroundColor: feature.color }}
                          />
                          <span className="font-medium">{feature.feature}</span>
                        </div>
                        <span className="text-sm font-semibold">
                          {(feature.importance * 100).toFixed(1)}%
                        </span>
                      </div>
                      <Progress value={feature.importance * 100} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">
                        {feature.feature === 'Rainfall' && 'Precipitation levels directly impact crop yield and market supply'}
                        {feature.feature === 'Arrivals' && 'Market supply quantity is a key driver of price fluctuations'}
                        {feature.feature === 'Temperature' && 'Temperature affects crop quality and storage conditions'}
                        {feature.feature === 'Previous Price' && 'Historical price trends provide momentum indicators'}
                        {feature.feature === 'Season' && 'Seasonal patterns influence both demand and supply dynamics'}
                      </p>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ModelIntelligence;
