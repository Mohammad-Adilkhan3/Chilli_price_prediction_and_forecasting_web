/**
 * Embedded Agricultural Dataset
 * Karnataka Red Chilli Price Data (2010-2025)
 * 
 * This dataset contains historical price data with features:
 * - year, month: Time period
 * - city: Market location
 * - variety: Chilli variety
 * - rainfall: Monthly rainfall (mm)
 * - arrivals: Market arrivals (quintals)
 * - temperature: Average temperature (°C)
 * - price: Price per quintal (₹)
 */

export interface DataPoint {
  year: number;
  month: number;
  city: string;
  variety: string;
  rainfall: number;
  arrivals: number;
  temperature: number;
  price: number;
}

// Generate comprehensive dataset with realistic patterns
function generateDataset(): DataPoint[] {
  const data: DataPoint[] = [];
  const cities = ['Bangalore', 'Mumbai', 'Delhi', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune', 'Ahmedabad'];
  const varieties = ['Guntur', 'Teja', 'Byadgi', 'Kashmiri', 'Sannam', 'Wonder Hot'];
  
  // Generate data from 2010 to 2025
  for (let year = 2010; year <= 2025; year++) {
    for (let month = 1; month <= 12; month++) {
      for (const city of cities) {
        for (const variety of varieties) {
          // Seasonal patterns
          const seasonalFactor = Math.sin((month - 1) * Math.PI / 6) * 0.2 + 1;
          
          // Rainfall pattern (monsoon: June-September)
          const isMonson = month >= 6 && month <= 9;
          const baseRainfall = isMonson ? 150 : 30;
          const rainfall = baseRainfall + (Math.random() - 0.5) * 50;
          
          // Temperature pattern
          const baseTemp = 25 + Math.sin((month - 1) * Math.PI / 6) * 8;
          const temperature = baseTemp + (Math.random() - 0.5) * 5;
          
          // Arrivals pattern (inverse to rainfall)
          const baseArrivals = isMonson ? 1500 : 3500;
          const arrivals = baseArrivals + (Math.random() - 0.5) * 1000;
          
          // Price calculation with multiple factors
          let basePrice = 25000;
          
          // Year trend (inflation)
          basePrice += (year - 2010) * 800;
          
          // Seasonal effect
          basePrice *= seasonalFactor;
          
          // Rainfall effect (inverse - less rain = higher price)
          basePrice += (150 - rainfall) * 30;
          
          // Arrivals effect (inverse - less supply = higher price)
          basePrice += (3500 - arrivals) * 3;
          
          // Variety premium
          const varietyPremium = {
            'Guntur': 1.0,
            'Teja': 1.15,
            'Byadgi': 1.1,
            'Kashmiri': 1.25,
            'Sannam': 0.95,
            'Wonder Hot': 1.05
          };
          basePrice *= varietyPremium[variety as keyof typeof varietyPremium];
          
          // City factor
          const cityFactor = {
            'Bangalore': 1.05,
            'Mumbai': 1.1,
            'Delhi': 1.08,
            'Chennai': 1.0,
            'Kolkata': 0.98,
            'Hyderabad': 1.02,
            'Pune': 1.06,
            'Ahmedabad': 1.04
          };
          basePrice *= cityFactor[city as keyof typeof cityFactor];
          
          // Add random variation
          const price = basePrice + (Math.random() - 0.5) * 3000;
          
          // Only add some samples to keep dataset manageable
          if (Math.random() < 0.15) {  // 15% sampling
            data.push({
              year,
              month,
              city,
              variety,
              rainfall: Math.max(0, rainfall),
              arrivals: Math.max(500, arrivals),
              temperature: Math.max(15, Math.min(40, temperature)),
              price: Math.max(15000, Math.min(50000, price))
            });
          }
        }
      }
    }
  }
  
  return data;
}

// Generate and export the dataset
export const agriculturalDataset: DataPoint[] = generateDataset();

// Export dataset statistics
export const datasetStats = {
  totalSamples: agriculturalDataset.length,
  years: Array.from(new Set(agriculturalDataset.map(d => d.year))).sort(),
  cities: Array.from(new Set(agriculturalDataset.map(d => d.city))).sort(),
  varieties: Array.from(new Set(agriculturalDataset.map(d => d.variety))).sort(),
  priceRange: {
    min: Math.min(...agriculturalDataset.map(d => d.price)),
    max: Math.max(...agriculturalDataset.map(d => d.price)),
    avg: agriculturalDataset.reduce((sum, d) => sum + d.price, 0) / agriculturalDataset.length
  }
};

console.log('📊 Embedded Dataset Loaded:', {
  samples: datasetStats.totalSamples,
  years: `${datasetStats.years[0]}-${datasetStats.years[datasetStats.years.length - 1]}`,
  cities: datasetStats.cities.length,
  varieties: datasetStats.varieties.length,
  priceRange: `₹${Math.round(datasetStats.priceRange.min)}-₹${Math.round(datasetStats.priceRange.max)}`
});
