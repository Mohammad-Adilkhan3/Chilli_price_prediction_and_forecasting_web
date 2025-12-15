import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/glass-card';
import { MetricCard } from '@/components/ui/metric-card';
import { TrendingUp, Brain, Target, Zap, MessageSquare, BarChart3 } from 'lucide-react';
import PageMeta from '@/components/common/PageMeta';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <>
      <PageMeta
        title="AgriAI - AI-Powered Agricultural Price Intelligence"
        description="Advanced AI platform for agricultural price forecasting and market intelligence"
      />
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-card">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 xl:py-20"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Powered by Advanced AI</span>
            </div>
            <h1 className="text-4xl xl:text-6xl font-bold mb-6 leading-tight">
              <span className="gradient-text">AI-Powered Agricultural</span>
              <br />
              <span className="text-foreground">Price Intelligence</span>
            </h1>
            <p className="text-lg xl:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Leverage cutting-edge machine learning models to predict agricultural commodity prices
              with unprecedented accuracy. Make data-driven decisions for your agricultural business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="gradient-primary text-lg px-8 glow-primary"
                onClick={() => navigate('/dashboard')}
              >
                <BarChart3 className="w-5 h-5 mr-2" />
                Launch AI Dashboard
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8"
                onClick={() => navigate('/chat')}
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Talk to AI Assistant
              </Button>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-16">
            <MetricCard
              title="Prediction Accuracy"
              value="98.2%"
              subtitle="Random Forest Model"
              icon={Target}
              trend="up"
              trendValue="+2.3%"
              glow
            />
            <MetricCard
              title="Mean Absolute Error"
              value="1.02"
              subtitle="Best in Class"
              icon={Brain}
              trend="down"
              trendValue="-0.15"
            />
            <MetricCard
              title="R² Score"
              value="0.998"
              subtitle="Model Reliability"
              icon={TrendingUp}
              trend="up"
              trendValue="+0.002"
            />
            <MetricCard
              title="Active Models"
              value="4"
              subtitle="ML Algorithms"
              icon={Zap}
            />
          </motion.div>

          <motion.div variants={itemVariants} className="mb-16">
            <GlassCard className="bg-primary/5 border-primary/20">
              <div className="text-center py-8">
                <h3 className="text-2xl font-bold mb-4 gradient-text">
                  Trained on 100,000+ Historical Samples
                </h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Our AI models are trained on comprehensive agricultural data spanning 15 years (2010-2024),
                  covering 20+ markets and 10+ chilli varieties with multiple environmental factors.
                </p>
                <div className="grid grid-cols-2 xl:grid-cols-4 gap-6 max-w-4xl mx-auto">
                  <div>
                    <p className="text-3xl font-bold text-primary mb-1">100K+</p>
                    <p className="text-sm text-muted-foreground">Training Samples</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-primary mb-1">15 Years</p>
                    <p className="text-sm text-muted-foreground">Historical Data</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-primary mb-1">20+ Markets</p>
                    <p className="text-sm text-muted-foreground">Cities Covered</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-primary mb-1">10+ Varieties</p>
                    <p className="text-sm text-muted-foreground">Chilli Types</p>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-16">
            <GlassCard className="p-8 xl:p-12">
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-4">
                    Real-Time Price Forecasting
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Our advanced AI models analyze historical data, weather patterns, market arrivals,
                    and seasonal trends to provide accurate price predictions for agricultural commodities.
                  </p>
                  <ul className="space-y-3">
                    {[
                      'Multi-model ensemble predictions',
                      'Real-time data integration',
                      'Weather impact analysis',
                      'Market trend visualization'
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-primary" />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative h-64 xl:h-80 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center animate-pulse-glow">
                  <TrendingUp className="w-32 h-32 text-primary/30" />
                </div>
              </div>
            </GlassCard>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h2 className="text-3xl font-bold text-center mb-8">Platform Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[
                {
                  icon: BarChart3,
                  title: 'AI Dashboard',
                  description: 'Interactive dashboard with real-time predictions and comprehensive market analytics',
                  path: '/dashboard'
                },
                {
                  icon: Brain,
                  title: 'AI Insights',
                  description: 'Automated insights generation with risk alerts and trend analysis',
                  path: '/insights'
                },
                {
                  icon: MessageSquare,
                  title: 'AI Assistant',
                  description: 'Conversational AI to answer your market questions and provide recommendations',
                  path: '/chat'
                },
                {
                  icon: TrendingUp,
                  title: 'Advanced Charts',
                  description: 'Scenario simulation and what-if analysis with interactive visualizations',
                  path: '/charts'
                },
                {
                  icon: Target,
                  title: 'Model Intelligence',
                  description: 'Compare ML models and explore feature importance with explainable AI',
                  path: '/models'
                },
                {
                  icon: Zap,
                  title: 'Real-Time Updates',
                  description: 'Live data integration from agricultural markets and weather stations',
                  path: '/dashboard'
                }
              ].map((feature, index) => (
                <GlassCard
                  key={index}
                  className="cursor-pointer hover:scale-105 transition-smooth"
                  onClick={() => navigate(feature.path)}
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4 glow-primary">
                    <feature.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </GlassCard>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default LandingPage;
