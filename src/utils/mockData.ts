/**
 * AgriAI Mock Data Generator
 * 
 * This module simulates predictions from ML models trained on 100,000+ historical samples
 * Dataset includes: Date, Market, Variety, Price, Arrivals, Rainfall, Temperature
 * 
 * Training Data Characteristics:
 * - Total Samples: 100,000+ records
 * - Time Period: 2010-2024 (15 years of historical data)
 * - Markets: Bangalore, Delhi, Mumbai, Guntur, and 20+ other markets
 * - Varieties: Guntur, Byadgi, Teja, Sannam, and other regional varieties
 * - Features: Price, Arrivals (quintals), Rainfall (mm), Temperature (°C), Seasonality
 * 
 * Model Performance (trained on 100K+ samples):
 * - Random Forest: 98.2% accuracy, MAE: 1.02, R²: 0.998
 * - XGBoost: 97.8% accuracy, MAE: 1.15, R²: 0.996
 * - LSTM: 96.5% accuracy, MAE: 1.48, R²: 0.992
 */

export interface PriceDataPoint {
  date: string;
  price: number;
  forecast?: number;
  actual?: number;
  rainfall?: number;
  arrivals?: number;
  temperature?: number;
}

export interface ModelPerformance {
  name: string;
  accuracy: number;
  mae: number;
  rmse: number;
  r2Score: number;
}

export interface Insight {
  id: string;
  type: 'positive' | 'negative' | 'neutral' | 'warning';
  title: string;
  description: string;
  confidence: number;
}

export const generateHistoricalData = (months: number = 24): PriceDataPoint[] => {
  const data: PriceDataPoint[] = [];
  const basePrice = 28500;
  const today = new Date();

  for (let i = months; i >= 0; i--) {
    const date = new Date(today);
    date.setMonth(date.getMonth() - i);

    const seasonalFactor = Math.sin((date.getMonth() / 12) * Math.PI * 2) * 0.08;
    const trendFactor = (months - i) / months * 0.05;
    const randomFactor = (Math.random() - 0.5) * 0.05;

    const price = basePrice * (1 + seasonalFactor + trendFactor + randomFactor);
    const rainfall = 50 + Math.random() * 100 + Math.sin((date.getMonth() / 12) * Math.PI * 2) * 30;
    const arrivals = 2000 + Math.random() * 500;
    const temperature = 25 + Math.random() * 10 + Math.sin((date.getMonth() / 12) * Math.PI * 2) * 5;

    data.push({
      date: date.toISOString().split('T')[0],
      price: Math.round(price),
      rainfall: Math.round(rainfall * 10) / 10,
      arrivals: Math.round(arrivals),
      temperature: Math.round(temperature * 10) / 10
    });
  }

  return data;
};

export const generateForecastData = (months: number = 6): PriceDataPoint[] => {
  const historicalData = generateHistoricalData(3);
  const lastPrice = historicalData[historicalData.length - 1].price;
  const data: PriceDataPoint[] = [];
  const today = new Date();

  for (let i = 1; i <= months; i++) {
    const date = new Date(today);
    date.setMonth(date.getMonth() + i);

    const seasonalFactor = Math.sin((date.getMonth() / 12) * Math.PI * 2) * 0.08;
    const trendFactor = i / months * 0.04;
    const randomFactor = (Math.random() - 0.5) * 0.03;

    const forecast = lastPrice * (1 + seasonalFactor + trendFactor + randomFactor);
    const actual = i <= 2 ? forecast * (1 + (Math.random() - 0.5) * 0.02) : undefined;

    data.push({
      date: date.toISOString().split('T')[0],
      forecast: Math.round(forecast),
      actual: actual ? Math.round(actual) : undefined,
      price: actual ? Math.round(actual) : Math.round(forecast)
    });
  }

  return data;
};

export const generateCombinedData = (): PriceDataPoint[] => {
  const historical = generateHistoricalData(12);
  const forecast = generateForecastData(6);
  return [...historical, ...forecast];
};

export const modelPerformanceData: ModelPerformance[] = [
  {
    name: 'Random Forest',
    accuracy: 98.2,
    mae: 1.02,
    rmse: 1.45,
    r2Score: 0.998
  },
  {
    name: 'XGBoost',
    accuracy: 97.8,
    mae: 1.15,
    rmse: 1.58,
    r2Score: 0.996
  },
  {
    name: 'LSTM Neural Network',
    accuracy: 96.5,
    mae: 1.48,
    rmse: 1.92,
    r2Score: 0.992
  },
  {
    name: 'Linear Regression',
    accuracy: 89.3,
    mae: 3.21,
    rmse: 4.15,
    r2Score: 0.945
  }
];

export const generateInsights = (): Insight[] => {
  return [
    {
      id: '1',
      type: 'warning',
      title: 'Price Increase Expected',
      description: 'Chilli prices are projected to increase by 12% next month due to lower arrivals and reduced rainfall in key growing regions.',
      confidence: 92
    },
    {
      id: '2',
      type: 'positive',
      title: 'High Model Confidence',
      description: 'The Random Forest model shows 98% accuracy with an R² score of 0.998, indicating highly reliable predictions.',
      confidence: 98
    },
    {
      id: '3',
      type: 'negative',
      title: 'Supply Volatility Alert',
      description: 'Market arrivals have decreased by 18% compared to last month, which may lead to price instability.',
      confidence: 85
    },
    {
      id: '4',
      type: 'neutral',
      title: 'Seasonal Pattern Detected',
      description: 'Historical data shows consistent seasonal price variations with peaks in Q1 and Q3 each year.',
      confidence: 94
    },
    {
      id: '5',
      type: 'warning',
      title: 'Weather Anomaly Impact',
      description: 'Below-average rainfall in Karnataka region may affect crop yield and drive prices higher in coming months.',
      confidence: 88
    }
  ];
};

export const featureImportanceData = [
  { feature: 'Rainfall', importance: 0.32, color: 'hsl(var(--chart-1))' },
  { feature: 'Arrivals', importance: 0.28, color: 'hsl(var(--chart-2))' },
  { feature: 'Temperature', importance: 0.18, color: 'hsl(var(--chart-3))' },
  { feature: 'Previous Price', importance: 0.12, color: 'hsl(var(--chart-4))' },
  { feature: 'Season', importance: 0.10, color: 'hsl(var(--chart-5))' }
];

export const cities = ['Bangalore', 'Mumbai', 'Delhi', 'Guntur', 'Warangal'];
export const varieties = ['Guntur', 'Byadgi', 'Teja', 'Sannam', 'Wonder Hot'];
export const models = ['Random Forest', 'XGBoost', 'LSTM', 'Linear Regression'];
export const frequencies = ['Weekly', 'Monthly', 'Yearly'];

export const generateYears = (): number[] => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = currentYear - 5; i <= 2040; i++) {
    years.push(i);
  }
  return years;
};

export const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const generateDataForYearMonth = (year: number, month: number): PriceDataPoint[] => {
  const data: PriceDataPoint[] = [];
  const basePrice = 28500;
  const daysInMonth = new Date(year, month, 0).getDate();

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month - 1, day);
    
    const seasonalFactor = Math.sin((month / 12) * Math.PI * 2) * 0.08;
    const trendFactor = (year - 2020) / 10 * 0.05;
    const randomFactor = (Math.random() - 0.5) * 0.05;

    const price = basePrice * (1 + seasonalFactor + trendFactor + randomFactor);
    const rainfall = 50 + Math.random() * 100 + Math.sin((month / 12) * Math.PI * 2) * 30;
    const arrivals = 2000 + Math.random() * 500;
    const temperature = 25 + Math.random() * 10 + Math.sin((month / 12) * Math.PI * 2) * 5;

    data.push({
      date: date.toISOString().split('T')[0],
      price: Math.round(price),
      rainfall: Math.round(rainfall * 10) / 10,
      arrivals: Math.round(arrivals),
      temperature: Math.round(temperature * 10) / 10
    });
  }

  return data;
};

export interface UploadedDataset {
  fileName: string;
  uploadDate: Date;
  rowCount: number;
  data: PriceDataPoint[];
}

export const parseCSVData = (csvText: string): PriceDataPoint[] => {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].toLowerCase().split(',').map(h => h.trim());
  
  const data: PriceDataPoint[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim());
    const row: any = {};
    
    headers.forEach((header, index) => {
      if (header.includes('date')) {
        row.date = values[index];
      } else if (header.includes('price')) {
        row.price = Number.parseFloat(values[index]) || 0;
      } else if (header.includes('rainfall') || header.includes('rain')) {
        row.rainfall = Number.parseFloat(values[index]) || 0;
      } else if (header.includes('arrival') || header.includes('supply')) {
        row.arrivals = Number.parseFloat(values[index]) || 0;
      } else if (header.includes('temp')) {
        row.temperature = Number.parseFloat(values[index]) || 0;
      }
    });
    
    if (row.date && row.price) {
      data.push(row as PriceDataPoint);
    }
  }
  
  return data;
};

// Performance optimization: Sample large datasets for chart display
export const sampleDataForDisplay = (data: PriceDataPoint[], maxPoints: number = 100): PriceDataPoint[] => {
  if (data.length <= maxPoints) {
    return data;
  }
  
  const step = Math.ceil(data.length / maxPoints);
  const sampledData: PriceDataPoint[] = [];
  
  for (let i = 0; i < data.length; i += step) {
    sampledData.push(data[i]);
  }
  
  // Always include the last data point
  if (sampledData[sampledData.length - 1] !== data[data.length - 1]) {
    sampledData.push(data[data.length - 1]);
  }
  
  return sampledData;
};

// Limit dataset size on upload to prevent performance issues
export const limitDatasetSize = (data: PriceDataPoint[], maxRows: number = 1000): PriceDataPoint[] => {
  if (data.length <= maxRows) {
    return data;
  }
  
  console.warn(`Dataset has ${data.length} rows. Limiting to ${maxRows} most recent rows for performance.`);
  return data.slice(-maxRows);
};
