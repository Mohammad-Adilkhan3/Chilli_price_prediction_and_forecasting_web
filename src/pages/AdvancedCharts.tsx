import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, AreaChart, Area, ComposedChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { GlassCard } from '@/components/ui/glass-card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { RotateCcw, TrendingUp, Droplets, Package } from 'lucide-react';
import PageMeta from '@/components/common/PageMeta';
import { generateCombinedData } from '@/utils/mockData';

const AdvancedCharts: React.FC = () => {
  const baseData = useMemo(() => generateCombinedData(), []);
  const [rainfallAdjustment, setRainfallAdjustment] = useState(0);
  const [arrivalsAdjustment, setArrivalsAdjustment] = useState(0);

  const adjustedData = useMemo(() => {
    return baseData.map(point => {
      const rainfallFactor = 1 + (rainfallAdjustment / 100);
      const arrivalsFactor = 1 + (arrivalsAdjustment / 100);

      const adjustedRainfall = (point.rainfall || 0) * rainfallFactor;
      const adjustedArrivals = (point.arrivals || 0) * arrivalsFactor;

      const rainfallImpact = (rainfallAdjustment / 100) * -0.3;
      const arrivalsImpact = (arrivalsAdjustment / 100) * -0.25;

      const adjustedPrice = point.price * (1 + rainfallImpact + arrivalsImpact);

      return {
        ...point,
        rainfall: adjustedRainfall,
        arrivals: adjustedArrivals,
        adjustedPrice: Math.round(adjustedPrice),
        basePrice: point.price
      };
    });
  }, [baseData, rainfallAdjustment, arrivalsAdjustment]);

  const handleReset = () => {
    setRainfallAdjustment(0);
    setArrivalsAdjustment(0);
  };

  const priceImpact = useMemo(() => {
    const lastPoint = adjustedData[adjustedData.length - 1];
    const change = ((lastPoint.adjustedPrice - lastPoint.basePrice) / lastPoint.basePrice * 100).toFixed(2);
    return Number.parseFloat(change);
  }, [adjustedData]);

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
        title="Advanced Charts - AgriAI"
        description="Interactive scenario analysis and what-if simulations"
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
                  <TrendingUp className="w-6 h-6 text-primary-foreground" />
                </div>
                <h1 className="text-3xl xl:text-4xl font-bold gradient-text">
                  Advanced Analytics
                </h1>
              </div>
              <p className="text-muted-foreground">
                Interactive scenario simulation and what-if analysis
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-8">
              <GlassCard className="glow-primary">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Scenario Simulation</h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleReset}
                    className="gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset
                  </Button>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-6">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Droplets className="w-5 h-5 text-primary" />
                        <label className="font-medium">Rainfall Adjustment</label>
                      </div>
                      <span className={`text-lg font-bold ${rainfallAdjustment > 0 ? 'text-success' : rainfallAdjustment < 0 ? 'text-destructive' : 'text-muted-foreground'}`}>
                        {rainfallAdjustment > 0 ? '+' : ''}{rainfallAdjustment}%
                      </span>
                    </div>
                    <Slider
                      value={[rainfallAdjustment]}
                      onValueChange={(value) => setRainfallAdjustment(value[0])}
                      min={-50}
                      max={50}
                      step={5}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>-50% (Drought)</span>
                      <span>Normal</span>
                      <span>+50% (Excess)</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Package className="w-5 h-5 text-secondary" />
                        <label className="font-medium">Market Arrivals Adjustment</label>
                      </div>
                      <span className={`text-lg font-bold ${arrivalsAdjustment > 0 ? 'text-success' : arrivalsAdjustment < 0 ? 'text-destructive' : 'text-muted-foreground'}`}>
                        {arrivalsAdjustment > 0 ? '+' : ''}{arrivalsAdjustment}%
                      </span>
                    </div>
                    <Slider
                      value={[arrivalsAdjustment]}
                      onValueChange={(value) => setArrivalsAdjustment(value[0])}
                      min={-50}
                      max={50}
                      step={5}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>-50% (Low Supply)</span>
                      <span>Normal</span>
                      <span>+50% (High Supply)</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-lg bg-muted/30">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Projected Price Impact</p>
                    <p className={`text-2xl font-bold ${priceImpact > 0 ? 'text-success' : priceImpact < 0 ? 'text-destructive' : 'text-foreground'}`}>
                      {priceImpact > 0 ? '+' : ''}{priceImpact}%
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Simulated Price</p>
                    <p className="text-2xl font-bold">
                      ₹{adjustedData[adjustedData.length - 1].adjustedPrice.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Base Price</p>
                    <p className="text-2xl font-bold text-muted-foreground">
                      ₹{adjustedData[adjustedData.length - 1].basePrice.toLocaleString()}
                    </p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-8">
              <GlassCard>
                <h3 className="text-lg font-semibold mb-4">Price Impact Analysis</h3>
                <ResponsiveContainer width="100%" height={400}>
                  <ComposedChart data={adjustedData}>
                    <defs>
                      <linearGradient id="colorBase" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorAdjusted" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
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
                      tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                      formatter={(value: number) => `₹${value.toLocaleString()}`}
                      labelFormatter={(label) => new Date(label).toLocaleDateString()}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="basePrice"
                      stroke="hsl(var(--muted-foreground))"
                      strokeWidth={2}
                      fill="url(#colorBase)"
                      name="Base Price"
                    />
                    <Area
                      type="monotone"
                      dataKey="adjustedPrice"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      fill="url(#colorAdjusted)"
                      name="Simulated Price"
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </GlassCard>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <GlassCard>
                <h3 className="text-lg font-semibold mb-4">Rainfall Scenario Impact</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={adjustedData.slice(-12)}>
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
                      formatter={(value: number) => [`${value.toFixed(1)} mm`, 'Rainfall']}
                    />
                    <Line
                      type="monotone"
                      dataKey="rainfall"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={{ fill: 'hsl(var(--primary))', r: 4 }}
                    />
                    <ReferenceLine y={80} stroke="hsl(var(--success))" strokeDasharray="3 3" label="Optimal" />
                  </LineChart>
                </ResponsiveContainer>
              </GlassCard>

              <GlassCard>
                <h3 className="text-lg font-semibold mb-4">Market Arrivals Scenario</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={adjustedData.slice(-12)}>
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
                      formatter={(value: number) => [`${value.toFixed(0)} quintals`, 'Arrivals']}
                    />
                    <Line
                      type="monotone"
                      dataKey="arrivals"
                      stroke="hsl(var(--secondary))"
                      strokeWidth={2}
                      dot={{ fill: 'hsl(var(--secondary))', r: 4 }}
                    />
                    <ReferenceLine y={2200} stroke="hsl(var(--success))" strokeDasharray="3 3" label="Average" />
                  </LineChart>
                </ResponsiveContainer>
              </GlassCard>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default AdvancedCharts;
