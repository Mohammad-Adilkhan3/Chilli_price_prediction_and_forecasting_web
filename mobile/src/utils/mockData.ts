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

export const cities = ['Bangalore', 'Mumbai', 'Delhi', 'Guntur', 'Warangal'];
export const varieties = ['Guntur', 'Byadgi', 'Teja', 'Sannam', 'Wonder Hot'];
export const models = ['Random Forest', 'XGBoost', 'LSTM', 'Linear Regression'];

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

export const formatCurrency = (value: number): string => {
  return `₹${value.toLocaleString('en-IN')}`;
};

export const formatNumber = (value: number, decimals: number = 0): string => {
  return value.toLocaleString('en-IN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
};
