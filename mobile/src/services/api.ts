import axios from 'axios';

// Change this to your backend URL when deploying
const API_BASE_URL = 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface PredictionParams {
  year: number;
  month: number;
  city: string;
  variety: string;
  model: string;
}

export interface PredictionResponse {
  predicted_price: number;
  confidence: number;
  model_used: string;
  accuracy: number;
  mae: number;
  r2_score: number;
}

export const predictPrice = async (params: PredictionParams): Promise<PredictionResponse> => {
  try {
    const response = await apiClient.post('/api/predict', params);
    return response.data;
  } catch (error) {
    console.error('Prediction error:', error);
    throw error;
  }
};

export const getInsights = async (city: string, variety: string, month: number) => {
  try {
    const response = await apiClient.get('/api/insights', {
      params: { city, variety, month }
    });
    return response.data;
  } catch (error) {
    console.error('Insights error:', error);
    throw error;
  }
};

export const getModels = async () => {
  try {
    const response = await apiClient.get('/api/models');
    return response.data;
  } catch (error) {
    console.error('Models error:', error);
    throw error;
  }
};

export const checkHealth = async () => {
  try {
    const response = await apiClient.get('/health');
    return response.data;
  } catch (error) {
    console.error('Health check error:', error);
    throw error;
  }
};

export default {
  predictPrice,
  getInsights,
  getModels,
  checkHealth,
};
