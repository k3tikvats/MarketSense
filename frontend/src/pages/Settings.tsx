import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MobileNav } from "@/components/dashboard/MobileNav";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Bell, Monitor, Database, Key, Copy, Shield, CreditCard } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const Settings = () => {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Settings</h1>
        <MobileNav />
      </div>

      <div className="grid gap-6">
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="w-full md:w-auto justify-start overflow-auto">
            <TabsTrigger value="account" className="flex gap-2 items-center">
              <User className="h-4 w-4" />
              <span className="hidden md:inline">Account</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex gap-2 items-center">
              <Bell className="h-4 w-4" />
              <span className="hidden md:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="display" className="flex gap-2 items-center">
              <Monitor className="h-4 w-4" />
              <span className="hidden md:inline">Display</span>
            </TabsTrigger>
            <TabsTrigger value="data" className="flex gap-2 items-center">
              <Database className="h-4 w-4" />
              <span className="hidden md:inline">Data Sources</span>
            </TabsTrigger>
          </TabsList>

          {/* Account Settings */}
          <TabsContent value="account" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Manage your account details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Your name" defaultValue="Alex Johnson" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" placeholder="Your email" defaultValue="alex@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea id="bio" placeholder="A brief description about yourself" className="resize-none" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button variant="outline" className="mr-2">Cancel</Button>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Subscription Plan</CardTitle>
                <CardDescription>Your current plan and billing information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-accent/30">
                  <div className="flex items-center gap-4">
                    <CreditCard className="h-8 w-8 text-primary" />
                    <div>
                      <p className="font-medium">Pro Plan</p>
                      <p className="text-sm text-muted-foreground">$29/month, billed monthly</p>
                    </div>
                  </div>
                  <Button variant="outline">Manage</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>API Access</CardTitle>
                <CardDescription>Manage your API keys for external access</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="api-key">API Key</Label>
                  <div className="flex">
                    <Input id="api-key" readOnly value="sk_live_x9HfXaQISJaYB2UIot6jTyLz" className="font-mono" />
                    <Button variant="ghost" className="ml-2">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Last used: 2 hours ago</span>
                  </div>
                  <Button variant="outline" size="sm">Regenerate</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>Update your password</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button>Update Password</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Choose how you want to be notified</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <h3 className="font-medium">Email Notifications</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="regime-email" className="flex-1">Regime Changes</Label>
                      <Switch id="regime-email" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="volatility-email" className="flex-1">Volatility Alerts</Label>
                      <Switch id="volatility-email" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="liquidity-email" className="flex-1">Liquidity Warnings</Label>
                      <Switch id="liquidity-email" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="weekly-email" className="flex-1">Weekly Summaries</Label>
                      <Switch id="weekly-email" defaultChecked />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium">Push Notifications</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="regime-push" className="flex-1">Regime Changes</Label>
                      <Switch id="regime-push" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="volatility-push" className="flex-1">Volatility Alerts</Label>
                      <Switch id="volatility-push" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="liquidity-push" className="flex-1">Liquidity Warnings</Label>
                      <Switch id="liquidity-push" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">SMS Notifications</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="sms-enabled" className="flex-1">Enable SMS Alerts</Label>
                      <Switch id="sms-enabled" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" placeholder="+1 (555) 123-4567" />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button>Save Preferences</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Display Settings */}
          <TabsContent value="display" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>Customize how MarketPulse looks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Theme</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="border rounded-md p-2 cursor-pointer bg-card border-primary flex items-center justify-center py-3">
                      <span>Dark</span>
                    </div>
                    <div className="border rounded-md p-2 cursor-pointer flex items-center justify-center py-3">
                      <span>Light</span>
                    </div>
                    <div className="border rounded-md p-2 cursor-pointer flex items-center justify-center py-3">
                      <span>System</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="default-timeframe">Default Chart Timeframe</Label>
                  <Select defaultValue="1m">
                    <SelectTrigger id="default-timeframe">
                      <SelectValue placeholder="Select default timeframe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="1w">1 Week</SelectItem>
                        <SelectItem value="1m">1 Month</SelectItem>
                        <SelectItem value="3m">3 Months</SelectItem>
                        <SelectItem value="6m">6 Months</SelectItem>
                        <SelectItem value="1y">1 Year</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="data-refresh">Data Refresh Rate</Label>
                  <Select defaultValue="5m">
                    <SelectTrigger id="data-refresh">
                      <SelectValue placeholder="Select refresh rate" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="1m">Every minute</SelectItem>
                        <SelectItem value="5m">Every 5 minutes</SelectItem>
                        <SelectItem value="15m">Every 15 minutes</SelectItem>
                        <SelectItem value="30m">Every 30 minutes</SelectItem>
                        <SelectItem value="1h">Every hour</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button>Save Display Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Data Source Settings */}
          <TabsContent value="data" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Market Data Sources</CardTitle>
                <CardDescription>Configure your data provider settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="primary-provider">Primary Data Provider</Label>
                  <Select defaultValue="default">
                    <SelectTrigger id="primary-provider">
                      <SelectValue placeholder="Select data provider" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="default">MarketPulse Standard</SelectItem>
                        <SelectItem value="premium">MarketPulse Premium</SelectItem>
                        <SelectItem value="external">External API (Custom)</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="custom-api-url">Custom API URL</Label>
                  <Input id="custom-api-url" placeholder="https://your-data-provider.com/api" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="custom-api-key">Custom API Key</Label>
                  <Input id="custom-api-key" placeholder="Your API key" />
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium">Asset Classes</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="equities" className="flex-1">Equities</Label>
                      <Switch id="equities" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="crypto" className="flex-1">Cryptocurrencies</Label>
                      <Switch id="crypto" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="forex" className="flex-1">Forex</Label>
                      <Switch id="forex" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="commodities" className="flex-1">Commodities</Label>
                      <Switch id="commodities" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="bonds" className="flex-1">Fixed Income</Label>
                      <Switch id="bonds" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="options" className="flex-1">Options</Label>
                      <Switch id="options" />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button variant="outline" className="mr-2">Test Connection</Button>
                <Button>Save Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Settings;