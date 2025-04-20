import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MobileNav } from "@/components/dashboard/MobileNav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Filter, TrendingUp, Gauge, ArrowRightLeft, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Sample strategy data
const strategies = [
  {
    id: 1,
    name: "Momentum Breakout",
    description: "Captures price breakouts in trending regimes",
    regimes: ["Trending", "Liquid"],
    risk: "Medium",
    performance: "+12.3%",
    type: "momentum",
    level: "intermediate"
  },
  {
    id: 2,
    name: "Volatility Counter-Trend",
    description: "Fades extreme moves during volatile periods",
    regimes: ["Volatile", "Illiquid"],
    risk: "High",
    performance: "+18.7%",
    type: "mean-reversion",
    level: "advanced"
  },
  {
    id: 3,
    name: "Range-Bound Oscillator",
    description: "Trades within defined ranges in choppy markets",
    regimes: ["Choppy", "Liquid"],
    risk: "Low",
    performance: "+7.5%",
    type: "mean-reversion",
    level: "beginner"
  },
  {
    id: 4,
    name: "Regime-Adaptive ETF Rotation",
    description: "Rotates between asset classes based on market regime",
    regimes: ["All"],
    risk: "Medium",
    performance: "+15.1%",
    type: "rotation",
    level: "beginner"
  },
  {
    id: 5,
    name: "Volatility Risk Premium",
    description: "Harvests volatility premium during stable markets",
    regimes: ["Trending", "Choppy"],
    risk: "Medium",
    performance: "+9.8%",
    type: "volatility",
    level: "intermediate"
  },
  {
    id: 6,
    name: "ML Regime Classifier",
    description: "Uses machine learning to adapt to changing market conditions",
    regimes: ["All"],
    risk: "Medium",
    performance: "+21.3%",
    type: "ml",
    level: "advanced"
  }
];

const Strategies = () => {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Strategy Hub</h1>
        <MobileNav />
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        {/* Strategy Filter Panel - Desktop */}
        <Card className="hidden md:block h-fit">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter size={18} />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Market Regime</label>
              <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                <option value="all">All Regimes</option>
                <option value="trending">Trending</option>
                <option value="volatile">Volatile</option>
                <option value="choppy">Choppy</option>
                <option value="liquid">Liquid</option>
                <option value="illiquid">Illiquid</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Risk Tolerance</label>
              <Slider defaultValue={[50]} max={100} step={1} />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Low</span>
                <span>High</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Strategy Type</label>
              <div className="space-y-1">
                {["Momentum", "Mean-Reversion", "Rotation", "Volatility", "ML"].map(type => (
                  <div key={type} className="flex items-center">
                    <input type="checkbox" id={type} className="mr-2" />
                    <label htmlFor={type} className="text-sm">{type}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Experience Level</label>
              <ToggleGroup type="multiple" className="justify-start">
                <ToggleGroupItem value="beginner" aria-label="Toggle beginner">
                  Beginner
                </ToggleGroupItem>
                <ToggleGroupItem value="intermediate" aria-label="Toggle intermediate">
                  Intermediate
                </ToggleGroupItem>
                <ToggleGroupItem value="advanced" aria-label="Toggle advanced">
                  Advanced
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </CardContent>
        </Card>

        {/* Strategy Content */}
        <div className="md:col-span-3 space-y-6">
          {/* Mobile Filters */}
          <Card className="md:hidden">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Input placeholder="Search strategies..." className="flex-1" />
                <Button variant="outline" size="icon">
                  <Filter size={18} />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Featured Strategy Banner */}
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4 items-start">
                <div className="flex-1">
                  <Badge variant="outline" className="mb-2 bg-primary/20 text-primary border-primary/30">Featured for Current Regime</Badge>
                  <h3 className="text-xl font-medium mb-1">Momentum Breakout Strategy</h3>
                  <p className="text-muted-foreground mb-4">Optimal for the current trending market condition with strong directional bias.</p>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Win Rate</p>
                      <p className="text-lg font-medium">68%</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Avg. Return</p>
                      <p className="text-lg font-medium">3.2%</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Risk Score</p>
                      <p className="text-lg font-medium">Medium</p>
                    </div>
                  </div>
                </div>
                <Button className="whitespace-nowrap">View Details</Button>
              </div>
            </CardContent>
          </Card>

          {/* Strategy Type Tabs */}
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="w-full justify-start overflow-x-auto">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="momentum">Momentum</TabsTrigger>
              <TabsTrigger value="mean-reversion">Mean-Reversion</TabsTrigger>
              <TabsTrigger value="rotation">Rotation</TabsTrigger>
              <TabsTrigger value="volatility">Volatility</TabsTrigger>
              <TabsTrigger value="ml">ML-Based</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <div className="grid gap-4 md:grid-cols-2">
                {strategies.map((strategy) => (
                  <Card key={strategy.id} className="overflow-hidden transition-all hover:border-primary/50">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="flex items-center gap-2 text-lg">
                            {strategy.type === 'momentum' && <TrendingUp size={18} />}
                            {strategy.type === 'mean-reversion' && <ArrowRightLeft size={18} />}
                            {strategy.type === 'rotation' || strategy.type === 'volatility' || strategy.type === 'ml' && <Gauge size={18} />}
                            {strategy.name}
                          </CardTitle>
                          <CardDescription>{strategy.description}</CardDescription>
                        </div>
                        <Badge variant={strategy.risk === 'Low' ? 'outline' : 
                               strategy.risk === 'Medium' ? 'secondary' : 
                               'destructive'} className="ml-auto">
                          {strategy.risk}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {strategy.regimes.map((regime) => (
                          <Badge key={regime} variant="outline" className="bg-accent/50">
                            {regime}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex justify-between">
                        <Badge variant="outline" className="capitalize">
                          {strategy.level}
                        </Badge>
                        <span className="font-medium text-green-400">
                          {strategy.performance}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="momentum" className="mt-6">
              <div className="grid gap-4 md:grid-cols-2">
                {strategies.filter(s => s.type === 'momentum').map((strategy) => (
                  <Card key={strategy.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="flex items-center gap-2 text-lg">
                            <TrendingUp size={18} />
                            {strategy.name}
                          </CardTitle>
                          <CardDescription>{strategy.description}</CardDescription>
                        </div>
                        <Badge variant={strategy.risk === 'Low' ? 'outline' : 
                               strategy.risk === 'Medium' ? 'secondary' : 
                               'destructive'} className="ml-auto">
                          {strategy.risk}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {strategy.regimes.map((regime) => (
                          <Badge key={regime} variant="outline" className="bg-accent/50">
                            {regime}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex justify-between">
                        <Badge variant="outline" className="capitalize">
                          {strategy.level}
                        </Badge>
                        <span className="font-medium text-green-400">
                          {strategy.performance}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            {/* Similar TabsContent for other strategy types */}
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Strategies;
