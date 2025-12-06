import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';
import { AlertTriangle, TrendingUp, Info, CheckCircle, Brain, Sparkles } from 'lucide-react';
import PageMeta from '@/components/common/PageMeta';
import { generateInsights, generateCombinedData } from '@/utils/mockData';
import { Progress } from '@/components/ui/progress';

const AIInsights: React.FC = () => {
  const insights = generateInsights();
  const forecastData = generateCombinedData().slice(-6);

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return AlertTriangle;
      case 'positive':
        return CheckCircle;
      case 'negative':
        return AlertTriangle;
      default:
        return Info;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'warning':
        return 'border-yellow-500/50 bg-yellow-500/5';
      case 'positive':
        return 'border-success/50 bg-success/5';
      case 'negative':
        return 'border-destructive/50 bg-destructive/5';
      default:
        return 'border-primary/50 bg-primary/5';
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'warning':
        return 'text-yellow-500';
      case 'positive':
        return 'text-success';
      case 'negative':
        return 'text-destructive';
      default:
        return 'text-primary';
    }
  };

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
        title="AI Insights - AgriAI"
        description="Automated insights and market intelligence powered by AI"
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
                  AI Insights Engine
                </h1>
              </div>
              <p className="text-muted-foreground">
                Automated analysis and intelligent recommendations based on market data
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-8">
              <GlassCard className="glow-primary">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold mb-2">AI-Generated Market Summary</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      Based on comprehensive analysis of historical data, weather patterns, and market dynamics,
                      our AI predicts a <span className="text-primary font-semibold">12% price increase</span> in
                      the next month. This forecast is driven by <span className="text-primary font-semibold">reduced
                      rainfall</span> in key growing regions and <span className="text-primary font-semibold">18%
                      decrease in market arrivals</span>. The Random Forest model shows high confidence with 98.2%
                      accuracy and R² score of 0.998.
                    </p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Key Insights & Alerts</h2>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {insights.map((insight) => {
                  const Icon = getInsightIcon(insight.type);
                  return (
                    <GlassCard
                      key={insight.id}
                      className={`border ${getInsightColor(insight.type)}`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-lg bg-card flex items-center justify-center flex-shrink-0 ${getIconColor(insight.type)}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold mb-2">{insight.title}</h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            {insight.description}
                          </p>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-muted-foreground">AI Confidence</span>
                              <span className="font-semibold">{insight.confidence}%</span>
                            </div>
                            <Progress value={insight.confidence} className="h-2" />
                          </div>
                        </div>
                      </div>
                    </GlassCard>
                  );
                })}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Future Trend Highlights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {forecastData.map((data, index) => {
                  const change = index > 0 ? ((data.price - forecastData[index - 1].price) / forecastData[index - 1].price * 100) : 0;
                  const isPositive = change > 0;
                  return (
                    <GlassCard key={data.date}>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-muted-foreground">
                          {new Date(data.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                        </span>
                        {index > 0 && (
                          <div className={`flex items-center gap-1 text-sm font-medium ${isPositive ? 'text-success' : 'text-destructive'}`}>
                            <TrendingUp className={`w-4 h-4 ${isPositive ? '' : 'rotate-180'}`} />
                            <span>{Math.abs(change).toFixed(1)}%</span>
                          </div>
                        )}
                      </div>
                      <div className="text-2xl font-bold mb-1">
                        ₹{data.price.toLocaleString()}
                      </div>
                      <p className="text-xs text-muted-foreground">per quintal</p>
                    </GlassCard>
                  );
                })}
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <GlassCard>
                <h2 className="text-xl font-semibold mb-4">Risk Assessment</h2>
                <div className="space-y-4">
                  {[
                    { factor: 'Supply Risk', level: 72, description: 'Market arrivals below seasonal average' },
                    { factor: 'Weather Risk', level: 65, description: 'Rainfall deficit in growing regions' },
                    { factor: 'Demand Volatility', level: 45, description: 'Stable demand patterns observed' },
                    { factor: 'Price Volatility', level: 58, description: 'Moderate price fluctuations expected' }
                  ].map((risk) => (
                    <div key={risk.factor}>
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className="font-medium">{risk.factor}</h3>
                          <p className="text-xs text-muted-foreground">{risk.description}</p>
                        </div>
                        <span className={`text-sm font-semibold ${risk.level > 60 ? 'text-yellow-500' : 'text-success'}`}>
                          {risk.level}%
                        </span>
                      </div>
                      <Progress
                        value={risk.level}
                        className={`h-2 ${risk.level > 60 ? '[&>div]:bg-yellow-500' : '[&>div]:bg-success'}`}
                      />
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

export default AIInsights;
