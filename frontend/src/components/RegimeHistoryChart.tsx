import React, { useEffect, useRef } from 'react';
import { HistoricalDataPoint, MarketRegimeData } from '../services/api';

interface RegimeHistoryChartProps {
  historyData: HistoricalDataPoint[];
  regimeData: MarketRegimeData;
}

const RegimeHistoryChart: React.FC<RegimeHistoryChartProps> = ({ historyData, regimeData }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!chartRef.current || historyData.length === 0) return;
    
    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const devicePixelRatio = window.devicePixelRatio || 1;
    chartRef.current.width = chartRef.current.offsetWidth * devicePixelRatio;
    chartRef.current.height = 300 * devicePixelRatio;
    ctx.scale(devicePixelRatio, devicePixelRatio);
    
    const width = chartRef.current.width / devicePixelRatio;
    const height = chartRef.current.height / devicePixelRatio;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Prepare data
    let timeLabels: Date[] = [];
    let regimeValues: number[] = [];
    let priceValues: (number | null)[] = [];
    
    historyData.forEach(point => {
      timeLabels.push(new Date(point.timestamp));
      regimeValues.push(point.regime);
      priceValues.push(point.price);
    });
    
    // Calculate scales
    const timeRange = timeLabels.length > 1 ? 
      (timeLabels[timeLabels.length - 1].getTime() - timeLabels[0].getTime()) : 1;
    
    const validPrices = priceValues.filter(p => p !== null) as number[];
    const minPrice = validPrices.length ? Math.min(...validPrices) * 0.99 : 0;
    const maxPrice = validPrices.length ? Math.max(...validPrices) * 1.01 : 1;
    const priceRange = maxPrice - minPrice || 1;
    
    // Size calculations
    const padding = { left: 50, right: 20, top: 20, bottom: 30 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;
    
    // Draw time axis
    ctx.beginPath();
    ctx.moveTo(padding.left, height - padding.bottom);
    ctx.lineTo(width - padding.right, height - padding.bottom);
    ctx.strokeStyle = '#ccc';
    ctx.stroke();
    
    // Draw price axis
    ctx.beginPath();
    ctx.moveTo(padding.left, padding.top);
    ctx.lineTo(padding.left, height - padding.bottom);
    ctx.strokeStyle = '#ccc';
    ctx.stroke();
    
    // Helper function to get X position
    const getX = (date: Date) => {
      const timeOffset = date.getTime() - timeLabels[0].getTime();
      return padding.left + (timeOffset / timeRange) * chartWidth;
    };
    
    // Helper function to get Y position for price
    const getPriceY = (price: number) => {
      return height - padding.bottom - ((price - minPrice) / priceRange) * chartHeight;
    };
    
    // Draw regime background regions
    let currentRegime = regimeValues[0];
    let startX = getX(timeLabels[0]);
    
    for (let i = 1; i < timeLabels.length; i++) {
      if (regimeValues[i] !== currentRegime || i === timeLabels.length - 1) {
        const endX = getX(timeLabels[i]);
        
        // Fill regime background
        ctx.fillStyle = getRegimeColor(currentRegime, 0.2);
        ctx.fillRect(startX, padding.top, endX - startX, chartHeight);
        
        // Update for next region
        currentRegime = regimeValues[i];
        startX = endX;
      }
    }
    
    // Draw price line
    if (validPrices.length > 0) {
      ctx.beginPath();
      let firstValidIndex = priceValues.findIndex(p => p !== null);
      
      if (firstValidIndex >= 0) {
        ctx.moveTo(
          getX(timeLabels[firstValidIndex]), 
          getPriceY(priceValues[firstValidIndex] as number)
        );
        
        for (let i = firstValidIndex + 1; i < timeLabels.length; i++) {
          if (priceValues[i] !== null) {
            ctx.lineTo(
              getX(timeLabels[i]), 
              getPriceY(priceValues[i] as number)
            );
          }
        }
      }
      
      ctx.strokeStyle = '#0066cc';
      ctx.lineWidth = 2;
      ctx.stroke();
    }
    
    // Draw time labels
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillStyle = '#666';
    ctx.font = '10px Arial';
    
    // Draw every nth label to avoid overcrowding
    const labelStep = Math.max(1, Math.floor(timeLabels.length / 6));
    for (let i = 0; i < timeLabels.length; i += labelStep) {
      const x = getX(timeLabels[i]);
      ctx.fillText(
        timeLabels[i].toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}),
        x,
        height - padding.bottom + 5
      );
    }
    
    // Draw price labels
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    
    const priceStep = priceRange / 5;
    for (let i = 0; i <= 5; i++) {
      const price = minPrice + i * priceStep;
      const y = getPriceY(price);
      
      ctx.fillText(
        price.toFixed(2),
        padding.left - 5,
        y
      );
    }
    
    // Draw legend
    const legendY = padding.top + 10;
    let legendX = padding.left + 10;
    
    // Price legend
    ctx.beginPath();
    ctx.moveTo(legendX, legendY);
    ctx.lineTo(legendX + 20, legendY);
    ctx.strokeStyle = '#0066cc';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    ctx.textAlign = 'left';
    ctx.fillText('Price', legendX + 25, legendY);
    legendX += 75;
    
    // Regime legends
    regimeData.regimes.forEach(regime => {
      ctx.fillStyle = getRegimeColor(regime.id, 0.2);
      ctx.fillRect(legendX, legendY - 5, 15, 10);
      
      ctx.fillStyle = '#666';
      ctx.fillText(`Regime ${regime.id}`, legendX + 20, legendY);
      legendX += 90;
    });
    
  }, [historyData, regimeData]);
  
  // Helper function to get color for a regime
  const getRegimeColor = (regimeId: number, alpha: number = 1) => {
    const colors = [
      `rgba(72, 145, 255, ${alpha})`,    // Blue
      `rgba(255, 140, 0, ${alpha})`,     // Orange
      `rgba(0, 180, 140, ${alpha})`,     // Teal
      `rgba(220, 0, 115, ${alpha})`,     // Pink
      `rgba(146, 104, 255, ${alpha})`,   // Purple
    ];
    
    return colors[regimeId % colors.length];
  };

  return (
    <div className="w-full">
      {historyData.length > 0 ? (
        <div className="w-full">
          <canvas
            ref={chartRef}
            className="w-full"
            style={{ height: "300px" }}
          ></canvas>
          <div className="mt-2 text-xs text-gray-500 flex justify-between">
            <span>First data point: {
              historyData.length > 0
                ? new Date(historyData[0].timestamp).toLocaleString()
                : 'N/A'
            }</span>
            <span>Last data point: {
              historyData.length > 0 
                ? new Date(historyData[historyData.length - 1].timestamp).toLocaleString()
                : 'N/A'
            }</span>
          </div>
        </div>
      ) : (
        <div className="h-[300px] flex items-center justify-center bg-gray-50 border border-gray-200 rounded">
          <p className="text-gray-500">No historical data available</p>
        </div>
      )}
    </div>
  );
};

export default RegimeHistoryChart;