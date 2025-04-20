
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MobileNav } from "@/components/dashboard/MobileNav";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Bell, Plus, Clock, AlertTriangle, Info, Trash2, Edit } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

// Sample alert data
const activeAlerts = [
  {
    id: 1,
    type: "Regime Change",
    description: "Alert when market switches to Volatile regime",
    status: "active",
    lastTriggered: "2023-04-15T10:30:00",
  },
  {
    id: 2,
    type: "Volatility Threshold",
    description: "Alert when volatility exceeds 25%",
    status: "active",
    lastTriggered: "2023-04-10T14:45:00",
  },
  {
    id: 3,
    type: "Liquidity Warning",
    description: "Alert when market liquidity drops below normal levels",
    status: "paused",
    lastTriggered: "2023-03-22T09:15:00",
  }
];

const alertHistory = [
  {
    id: 101,
    date: "2023-04-15T10:30:00",
    type: "Regime Change",
    message: "Market regime changed to Volatile & Illiquid"
  },
  {
    id: 102,
    date: "2023-04-10T14:45:00", 
    type: "Volatility Threshold",
    message: "Volatility exceeded threshold (25%)"
  },
  {
    id: 103,
    date: "2023-03-22T09:15:00",
    type: "Liquidity Warning",
    message: "Market liquidity dropped below normal levels"
  },
  {
    id: 104,
    date: "2023-03-18T11:20:00",
    type: "Regime Change",
    message: "Market regime changed to Choppy & Liquid"
  },
  {
    id: 105,
    date: "2023-03-05T16:10:00",
    type: "Regime Change",
    message: "Market regime changed to Trending & Liquid"
  }
];

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  }).format(date);
};

const Alerts = () => {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Alert Configuration</h1>
        <MobileNav />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Active Alerts Section */}
        <Card className="md:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-xl">Active Alerts</CardTitle>
              <CardDescription>Manage your current alert settings</CardDescription>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="icon">
                  <Plus size={16} />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Alert</DialogTitle>
                  <DialogDescription>
                    Configure a new market alert based on conditions you specify
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="alert-type">Alert Type</Label>
                    <Select>
                      <SelectTrigger id="alert-type">
                        <SelectValue placeholder="Select alert type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Alert Types</SelectLabel>
                          <SelectItem value="regime-change">Regime Change</SelectItem>
                          <SelectItem value="volatility">Volatility Threshold</SelectItem>
                          <SelectItem value="liquidity">Liquidity Warning</SelectItem>
                          <SelectItem value="direction">Directional Shift</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="condition">Condition</Label>
                    <Select>
                      <SelectTrigger id="condition">
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="equals">Equals</SelectItem>
                        <SelectItem value="not-equals">Does not equal</SelectItem>
                        <SelectItem value="greater-than">Greater than</SelectItem>
                        <SelectItem value="less-than">Less than</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="value">Value</Label>
                    <Input id="value" placeholder="Enter threshold value" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notification">Notification Method</Label>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Email</span>
                      <Switch id="email-notifications" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">App Notification</span>
                      <Switch id="app-notifications" defaultChecked />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button>Create Alert</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeAlerts.map((alert) => (
                <div 
                  key={alert.id} 
                  className="flex flex-col space-y-3 p-4 rounded-lg border border-border bg-background/30"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      {alert.type === "Regime Change" && <Bell className="h-4 w-4 text-primary" />}
                      {alert.type === "Volatility Threshold" && <AlertTriangle className="h-4 w-4 text-yellow-500" />}
                      {alert.type === "Liquidity Warning" && <Info className="h-4 w-4 text-blue-500" />}
                      <span className="font-medium">{alert.type}</span>
                    </div>
                    <Badge variant={alert.status === "active" ? "default" : "outline"}>
                      {alert.status === "active" ? "Active" : "Paused"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{alert.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      Last triggered: {formatDate(alert.lastTriggered)}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Switch checked={alert.status === "active"} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alert History Section */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="text-xl">Alert History</CardTitle>
            <CardDescription>Recent alert notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alertHistory.map((event) => (
                <div 
                  key={event.id} 
                  className="flex flex-col space-y-1 p-4 rounded-lg border border-border bg-background/30"
                >
                  <div className="flex items-center gap-2">
                    {event.type === "Regime Change" && <Bell className="h-4 w-4 text-primary" />}
                    {event.type === "Volatility Threshold" && <AlertTriangle className="h-4 w-4 text-yellow-500" />}
                    {event.type === "Liquidity Warning" && <Info className="h-4 w-4 text-blue-500" />}
                    <span className="text-sm font-medium">{event.type}</span>
                  </div>
                  <p className="text-sm">{event.message}</p>
                  <div className="flex text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    {formatDate(event.date)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="border-t p-4 flex justify-center">
            <Button variant="outline" className="w-full">View All History</Button>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Alerts;
