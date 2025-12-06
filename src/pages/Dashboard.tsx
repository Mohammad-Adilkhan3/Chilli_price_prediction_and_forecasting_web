import React, { useState, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/glass-card';
import { MetricCard } from '@/components/ui/metric-card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrendingUp, TrendingDown, Target, Brain, Droplets, Package, Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import PageMeta from '@/components/common/PageMeta';
import { generateCombinedData, generateDataForYearMonth, modelPerformanceData, cities, varieties, models, frequencies, generateYears, months, parseCSVData, type UploadedDataset } from '@/utils/mockData';
import { toast } from '@/hooks/use-toast';
import { useDataset } from '@/contexts/DatasetContext';

const Dashboard: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState('Bangalore');
  const [selectedVariety, setSelectedVariety] = useState('Guntur');
  const [selectedModel, setSelectedModel] = useState('Random Forest');
  const [selectedFrequency, setSelectedFrequency] = useState('Monthly');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { uploadedDataset, setUploadedDataset } = useDataset();

  const years = useMemo(() => generateYears(), []);

  const chartData = useMemo(() => {
    if (uploadedDataset) {
      return uploadedDataset.data;
    }
    return generateDataForYearMonth(selectedYear, selectedMonth);
  }, [selectedYear, selectedMonth, uploadedDataset]);

  const currentModel = modelPerformanceData.find(m => m.name === selectedModel) || modelPerformanceData[0];

  const latestData = chartData[chartData.length - 1];
  const previousData = chartData[chartData.length - 2];
  const priceChange = ((latestData.price - previousData.price) / previousData.price * 100).toFixed(2);
  const trend = Number.parseFloat(priceChange) > 0 ? 'up' : 'down';

  const handleRunPrediction = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.csv')) {
      toast({
        title: 'Invalid File Format',
        description: 'Please upload a CSV file',
        variant: 'destructive'
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const parsedData = parseCSVData(text);

        if (parsedData.length === 0) {
          toast({
            title: 'No Data Found',
            description: 'The CSV file does not contain valid data',
            variant: 'destructive'
          });
          return;
        }

        const dataset: UploadedDataset = {
          fileName: file.name,
          uploadDate: new Date(),
          rowCount: parsedData.length,
          data: parsedData
        };

        setUploadedDataset(dataset);
        toast({
          title: 'Dataset Uploaded Successfully',
          description: `Loaded ${parsedData.length} records from ${file.name}`
        });
      } catch (error) {
        toast({
          title: 'Upload Failed',
          description: 'Error parsing CSV file. Please check the format.',
          variant: 'destructive'
        });
      }
    };
    reader.readAsText(file);
  };

  const handleClearDataset = () => {
    setUploadedDataset(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    toast({
      title: 'Dataset Cleared',
      description: 'Using default prediction data'
    });
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
                          AI Recommended
                        </span>
                      </label>
                      <Select value={selectedModel} onValueChange={setSelectedModel}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {models.map(model => (
                            <SelectItem key={model} value={model}>{model}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">Frequency</label>
                      <div className="grid grid-cols-3 gap-2">
                        {frequencies.map(freq => (
                          <Button
                            key={freq}
                            variant={selectedFrequency === freq ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setSelectedFrequency(freq)}
                            className="text-xs"
                          >
                            {freq}
                          </Button>
                        ))}
                      </div>
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

                    <div className="pt-4 border-t border-border/50">
                      <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                        <Upload className="w-4 h-4" />
                        Upload Dataset
                      </label>
                      
                      {uploadedDataset ? (
                        <div className="space-y-2">
                          <div className="p-3 rounded-lg bg-success/10 border border-success/20">
                            <div className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-success truncate">{uploadedDataset.fileName}</p>
                                <p className="text-xs text-muted-foreground">{uploadedDataset.rowCount} records</p>
                              </div>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleClearDataset}
                            className="w-full"
                          >
                            Clear Dataset
                          </Button>
                        </div>
                      ) : (
                        <>
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept=".csv"
                            onChange={handleFileUpload}
                            className="hidden"
                            id="dataset-upload"
                          />
                          <label htmlFor="dataset-upload">
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full"
                              asChild
                            >
                              <span className="flex items-center gap-2 cursor-pointer">
                                <FileText className="w-4 h-4" />
                                Choose CSV File
                              </span>
                            </Button>
                          </label>
                          <p className="text-xs text-muted-foreground mt-2">
                            Upload CSV with columns: date, price, rainfall, arrivals
                          </p>
                        </>
                      )}
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
                            ₹{latestData.price.toLocaleString()}
                          </span>
                          <span className="text-sm text-muted-foreground">per quintal</span>
                        </div>
                      </div>
                      <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${trend === 'up' ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'}`}>
                        {trend === 'up' ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                        <span className="font-semibold">{priceChange}%</span>
                      </div>
                    </div>
                    {uploadedDataset && (
                      <div className="mb-4 p-2 rounded bg-primary/10 border border-primary/20">
                        <p className="text-xs text-primary flex items-center gap-2">
                          <FileText className="w-3 h-3" />
                          Using uploaded dataset: {uploadedDataset.fileName}
                        </p>
                      </div>
                    )}
                    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 pt-4 border-t border-border/50">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Confidence</p>
                        <p className="text-lg font-semibold">{currentModel.accuracy}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Range</p>
                        <p className="text-lg font-semibold">
                          ₹{(latestData.price * 0.97).toFixed(0)} - ₹{(latestData.price * 1.03).toFixed(0)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Model</p>
                        <p className="text-lg font-semibold">{selectedModel}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Data Points</p>
                        <p className="text-lg font-semibold">{chartData.length}</p>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>

                <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                  <MetricCard
                    title="Accuracy"
                    value={`${currentModel.accuracy}%`}
                    icon={Target}
                    trend="up"
                    trendValue="+1.2%"
                  />
                  <MetricCard
                    title="MAE"
                    value={currentModel.mae}
                    subtitle="Mean Absolute Error"
                    icon={Brain}
                    trend="down"
                    trendValue="-0.08"
                  />
                  <MetricCard
                    title="R² Score"
                    value={currentModel.r2Score}
                    subtitle="Model Reliability"
                    icon={TrendingUp}
                  />
                  <MetricCard
                    title="RMSE"
                    value={currentModel.rmse}
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
                      <Droplets className="w-5 h-5 text-primary" />
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
                      <Package className="w-5 h-5 text-secondary" />
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
