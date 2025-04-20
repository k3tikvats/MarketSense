// API service for fetching market regime data

const API_BASE_URL = '/api';  // Updated to use relative path for proxy

export interface RegimeMetrics {
  volatility: number;
  spread: number;
  depth: number;
  volume: number;
  direction_bias: string;
}

export interface Regime {
  id: number;
  name: string;
  size: number;
  volatility: string;
  price_behavior: string;
  liquidity: string;
  volume_type: string;
  strategy_recommendations: string[];
  detailed_metrics?: {
    volatility: number;
    autocorrelation: number;
    spread: number;
    depth: number;
    volume: number;
    avg_features: Record<string, number>;
  };
}

export interface CurrentRegime {
  id: number;
  name: string;
  probability: number;
  duration: string;
  key_metrics: RegimeMetrics;
}

export interface RegimeTransition {
  from: number;
  to: number;
  timestamp: string;
  duration: string;
}

export interface MarketRegimeData {
  regimes: Regime[];
  current_regime: CurrentRegime;
  transitions: RegimeTransition[];
  last_updated: string;
  meta?: {
    model: string;
    silhouette_score: number;
    last_updated: string;
  };
}

export interface HistoricalDataPoint {
  timestamp: string;
  regime: number;
  price: number | null;
}

export interface RecommendationsData {
  regime_id: number;
  regime_name: string;
  recommendations: string[];
  last_updated: string;
}

// API functions
export const fetchMarketRegimeData = async (): Promise<MarketRegimeData> => {
  try {
    const response = await fetch(`${API_BASE_URL}/market-regime`);
    if (!response.ok) {
      throw new Error('Failed to fetch market regime data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching market regime data:', error);
    throw error;
  }
};

export const fetchRegimeHistory = async (): Promise<{history: HistoricalDataPoint[], source: string}> => {
  try {
    const response = await fetch(`${API_BASE_URL}/market-regime/history`);
    if (!response.ok) {
      throw new Error('Failed to fetch regime history');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching regime history:', error);
    throw error;
  }
};

export const fetchRegimeMetrics = async (): Promise<{regime_id: number, regime_name: string, metrics: RegimeMetrics, last_updated: string}> => {
  try {
    const response = await fetch(`${API_BASE_URL}/market-regime/metrics`);
    if (!response.ok) {
      throw new Error('Failed to fetch regime metrics');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching regime metrics:', error);
    throw error;
  }
};

export const fetchRecommendations = async (): Promise<RecommendationsData> => {
  try {
    const response = await fetch(`${API_BASE_URL}/market-regime/recommendations`);
    if (!response.ok) {
      throw new Error('Failed to fetch recommendations');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    throw error;
  }
};

export const predictRegime = async (features: Record<string, number>): Promise<{regime: number, probability: number, timestamp: string}> => {
  try {
    const response = await fetch(`${API_BASE_URL}/market-regime/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(features),
    });
    if (!response.ok) {
      throw new Error('Failed to predict regime');
    }
    return await response.json();
  } catch (error) {
    console.error('Error predicting regime:', error);
    throw error;
  }
};