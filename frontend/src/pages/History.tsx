
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MobileNav } from "@/components/dashboard/MobileNav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PieChart, LineChart, Line, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { CalendarIcon, ChevronDown, ChevronLeft, ChevronRight, Download, ZoomIn, ZoomOut } from "lucide-react";

// Sample data for charts
const timelineData = [
  { date: '2023-01', price: 3400, regime: 'Trending & Liquid' },
  { date: '2023-02', price: 3650, regime: 'Trending & Liquid' },
  { date: '2023-03', price: 3500, regime: 'Choppy & Liquid' },
  { date: '2023-04', price: 3200, regime: 'Choppy & Liquid' },
  { date: '2023-05', price: 3100, regime: 'Volatile & Illiquid' },
  { date: '2023-06', price: 3300, regime: 'Volatile & Illiquid' },
  { date: '2023-07', price: 3800, regime: 'Trending & Liquid' },
  { date: '2023-08', price: 4100, regime: 'Trending & Liquid' },
  { date: '2023-09', price: 3900, regime: 'Choppy & Liquid' },
  { date: '2023-10', price: 3700, regime: 'Volatile & Illiquid' },
  { date: '2023-11', price: 3500, regime: 'Volatile & Illiquid' },
  { date: '2023-12', price: 3900, regime: 'Trending & Liquid' },
];

const regimeDistribution = [
  { name: 'Trending & Liquid', value: 42, color: '#10b981' },
  { name: 'Choppy & Liquid', value: 25, color: '#f59e0b' },
  { name: 'Volatile & Illiquid', value: 33, color: '#ef4444' },
];

const regimePerformance = [
  { regime: 'Trending & Liquid', return: 12.4, volatility: 9.2, sharpe: 1.35 },
  { regime: 'Choppy & Liquid', return: 3.8, volatility: 12.5, sharpe: 0.30 },
  { regime: 'Volatile & Illiquid', return: -8.6, volatility: 28.7, sharpe: -0.30 },
];

const COLORS = ['#10b981', '#f59e0b', '#ef4444'];

const getRegimeColor = (regime: string) => {
  if (regime.includes('Trending')) return '#10b981';
  if (regime.includes('Choppy')) return '#f59e0b';
  if (regime.includes('Volatile')) return '#ef4444';
  return '#9b87f5';
};

const History = () => {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Historical Analysis</h1>
        <MobileNav />
      </div>

      <div className="grid gap-6">
        {/* Time Period Selection */}
        <Card className="overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between p-4">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Button variant="outline" size="sm">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Select defaultValue="1y">
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Time Period</SelectLabel>
                    <SelectItem value="1w">1 Week</SelectItem>
                    <SelectItem value="1m">1 Month</SelectItem>
                    <SelectItem value="3m">3 Months</SelectItem>
                    <SelectItem value="6m">6 Months</SelectItem>
                    <SelectItem value="1y">1 Year</SelectItem>
                    <SelectItem value="ytd">YTD</SelectItem>
                    <SelectItem value="all">All Time</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <CalendarIcon className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Select defaultValue="default">
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Select asset" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="default">S&P 500</SelectItem>
                    <SelectItem value="nasdaq">Nasdaq</SelectItem>
                    <SelectItem value="crypto">Bitcoin</SelectItem>
                    <SelectItem value="gold">Gold</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Interactive Timeline Chart */}
        <Card className="overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle>Asset Performance & Market Regimes</CardTitle>
            <CardDescription>Historical price data with regime overlay</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={timelineData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="date" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#111', border: '1px solid #444' }} 
                    formatter={(value: any, name: any) => [value, name === 'price' ? 'Price' : 'Regime']}
                  />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#9b87f5"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                  {/* We'll simulate regime overlay with colored backgrounds */}
                  {timelineData.map((entry, index) => {
                    if (index < timelineData.length - 1) {
                      return (
                        <rect
                          key={`regime-${index}`}
                          x={`${(index / (timelineData.length - 1)) * 100}%`}
                          y="0%"
                          width={`${(1 / (timelineData.length - 1)) * 100}%`}
                          height="100%"
                          fill={getRegimeColor(entry.regime)}
                          fillOpacity={0.1}
                        />
                      );
                    }
                    return null;
                  })}
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-4">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-[#10b981] mr-2" />
                <span className="text-xs">Trending & Liquid</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-[#f59e0b] mr-2" />
                <span className="text-xs">Choppy & Liquid</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-[#ef4444] mr-2" />
                <span className="text-xs">Volatile & Illiquid</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Regime Analysis Section */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Regime Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Regime Distribution</CardTitle>
              <CardDescription>Time spent in each market regime</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="w-60 h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={regimeDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {regimeDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: any) => `${value}%`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Regime Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Regime Performance</CardTitle>
              <CardDescription>Key metrics across different market regimes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {regimePerformance.map((regime) => (
                  <div 
                    key={regime.regime} 
                    className="flex flex-col p-3 rounded-lg border border-border"
                    style={{ borderLeftColor: getRegimeColor(regime.regime), borderLeftWidth: '4px' }}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{regime.regime}</span>
                      <Badge 
                        variant={regime.return > 0 ? "outline" : "destructive"}
                        className={regime.return > 0 ? "bg-green-500/10 text-green-400 border-green-500/30" : ""}
                      >
                        {regime.return > 0 ? `+${regime.return}%` : `${regime.return}%`}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div>
                        <p className="text-xs text-muted-foreground">Volatility</p>
                        <p className="text-sm">{regime.volatility}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Sharpe Ratio</p>
                        <p className="text-sm">{regime.sharpe}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default History;