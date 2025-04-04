
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

const SettingsManagement = () => {
  const [isLoading, setIsLoading] = useState(false);

  // Store settings states
  const [storeSettings, setStoreSettings] = useState({
    storeName: "Lovable Store",
    storeEmail: "contact@lovablestore.com",
    storePhone: "(555) 123-4567",
    storeAddress: "123 Ecommerce St, Online City, 90210",
    storeCurrency: "USD",
    storeLanguage: "en",
    storeTimeZone: "America/New_York",
    storeDescription: "Premium clothing and accessories for everyone."
  });

  // Payment settings states
  const [paymentSettings, setPaymentSettings] = useState({
    enablePaypal: true,
    paypalEmail: "payments@lovablestore.com",
    enableStripe: false,
    stripeKey: "",
    enableCashOnDelivery: true,
    enableBankTransfer: false,
    bankDetails: ""
  });

  // Shipping settings states
  const [shippingSettings, setShippingSettings] = useState({
    enableFreeShipping: true,
    freeShippingThreshold: 100,
    enableFlatRate: true,
    flatRateAmount: 5,
    enableLocalPickup: false,
    localPickupAddress: "",
    enableInternationalShipping: false,
    internationalShippingRate: 25
  });

  // Email settings states
  const [emailSettings, setEmailSettings] = useState({
    orderConfirmation: true,
    shippingUpdates: true,
    abandonedCart: true,
    marketingEmails: false,
    emailHeader: "<h1>Lovable Store</h1>",
    emailFooter: "<p>Thank you for shopping with us!</p>"
  });

  const handleSaveStoreSettings = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Store settings saved successfully!");
    }, 1000);
  };

  const handleSavePaymentSettings = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Payment settings saved successfully!");
    }, 1000);
  };

  const handleSaveShippingSettings = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Shipping settings saved successfully!");
    }, 1000);
  };

  const handleSaveEmailSettings = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Email settings saved successfully!");
    }, 1000);
  };

  return (
    <>
      <Helmet>
        <title>Settings | E-Commerce Admin</title>
      </Helmet>

      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your store settings and configurations.
          </p>
        </div>

        <Tabs defaultValue="store" className="w-full">
          <TabsList className="w-full md:w-auto grid grid-cols-2 md:grid-cols-4 h-auto gap-2 md:gap-0">
            <TabsTrigger value="store">Store</TabsTrigger>
            <TabsTrigger value="payment">Payment</TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
            <TabsTrigger value="email">Email</TabsTrigger>
          </TabsList>
          
          {/* Store Settings */}
          <TabsContent value="store">
            <Card>
              <CardHeader>
                <CardTitle>Store Information</CardTitle>
                <CardDescription>
                  Configure general store information and settings.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <FormLabel htmlFor="storeName">Store Name</FormLabel>
                    <Input 
                      id="storeName"
                      value={storeSettings.storeName}
                      onChange={(e) => setStoreSettings({...storeSettings, storeName: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <FormLabel htmlFor="storeEmail">Store Email</FormLabel>
                    <Input 
                      id="storeEmail"
                      type="email"
                      value={storeSettings.storeEmail}
                      onChange={(e) => setStoreSettings({...storeSettings, storeEmail: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <FormLabel htmlFor="storePhone">Phone Number</FormLabel>
                    <Input 
                      id="storePhone"
                      value={storeSettings.storePhone}
                      onChange={(e) => setStoreSettings({...storeSettings, storePhone: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <FormLabel htmlFor="storeAddress">Address</FormLabel>
                    <Input 
                      id="storeAddress"
                      value={storeSettings.storeAddress}
                      onChange={(e) => setStoreSettings({...storeSettings, storeAddress: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <FormLabel htmlFor="storeCurrency">Default Currency</FormLabel>
                    <select 
                      id="storeCurrency"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      value={storeSettings.storeCurrency}
                      onChange={(e) => setStoreSettings({...storeSettings, storeCurrency: e.target.value})}
                    >
                      <option value="USD">USD - US Dollar</option>
                      <option value="EUR">EUR - Euro</option>
                      <option value="GBP">GBP - British Pound</option>
                      <option value="JPY">JPY - Japanese Yen</option>
                      <option value="CAD">CAD - Canadian Dollar</option>
                      <option value="AUD">AUD - Australian Dollar</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <FormLabel htmlFor="storeLanguage">Default Language</FormLabel>
                    <select 
                      id="storeLanguage"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      value={storeSettings.storeLanguage}
                      onChange={(e) => setStoreSettings({...storeSettings, storeLanguage: e.target.value})}
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                      <option value="ja">Japanese</option>
                      <option value="zh">Chinese</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <FormLabel htmlFor="storeTimeZone">Timezone</FormLabel>
                    <select 
                      id="storeTimeZone"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      value={storeSettings.storeTimeZone}
                      onChange={(e) => setStoreSettings({...storeSettings, storeTimeZone: e.target.value})}
                    >
                      <option value="America/New_York">Eastern Time (ET)</option>
                      <option value="America/Chicago">Central Time (CT)</option>
                      <option value="America/Denver">Mountain Time (MT)</option>
                      <option value="America/Los_Angeles">Pacific Time (PT)</option>
                      <option value="Europe/London">Greenwich Mean Time (GMT)</option>
                      <option value="Europe/Paris">Central European Time (CET)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <FormLabel htmlFor="storeDescription">Store Description</FormLabel>
                  <Textarea 
                    id="storeDescription"
                    rows={4}
                    value={storeSettings.storeDescription}
                    onChange={(e) => setStoreSettings({...storeSettings, storeDescription: e.target.value})}
                  />
                  <FormDescription>
                    This description will be displayed on your store's homepage and SEO metadata.
                  </FormDescription>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end border-t pt-4">
                <Button onClick={handleSaveStoreSettings} disabled={isLoading}>
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="mr-1 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      <span>Saving...</span>
                    </div>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Payment Settings */}
          <TabsContent value="payment">
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>
                  Configure payment gateways and methods for your store.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="h-10 w-10 rounded-md bg-blue-100 flex items-center justify-center">
                        <img 
                          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/paypal/paypal-original.svg" 
                          alt="PayPal" 
                          className="h-6 w-6"
                        />
                      </div>
                      <div>
                        <h3 className="text-base font-medium">PayPal</h3>
                        <p className="text-sm text-muted-foreground">
                          Accept payments via PayPal
                        </p>
                      </div>
                    </div>
                    <Switch 
                      checked={paymentSettings.enablePaypal}
                      onCheckedChange={(checked) => setPaymentSettings({...paymentSettings, enablePaypal: checked})}
                    />
                  </div>
                  
                  {paymentSettings.enablePaypal && (
                    <div className="mt-4 space-y-3 border-t pt-3">
                      <div className="space-y-2">
                        <FormLabel htmlFor="paypalEmail">PayPal Email</FormLabel>
                        <Input 
                          id="paypalEmail"
                          value={paymentSettings.paypalEmail}
                          onChange={(e) => setPaymentSettings({...paymentSettings, paypalEmail: e.target.value})}
                        />
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="h-10 w-10 rounded-md bg-purple-100 flex items-center justify-center">
                        <span className="text-purple-600 font-bold text-lg">S</span>
                      </div>
                      <div>
                        <h3 className="text-base font-medium">Stripe</h3>
                        <p className="text-sm text-muted-foreground">
                          Accept credit card payments via Stripe
                        </p>
                      </div>
                    </div>
                    <Switch 
                      checked={paymentSettings.enableStripe}
                      onCheckedChange={(checked) => setPaymentSettings({...paymentSettings, enableStripe: checked})}
                    />
                  </div>
                  
                  {paymentSettings.enableStripe && (
                    <div className="mt-4 space-y-3 border-t pt-3">
                      <div className="space-y-2">
                        <FormLabel htmlFor="stripeKey">Stripe API Key</FormLabel>
                        <Input 
                          id="stripeKey"
                          value={paymentSettings.stripeKey}
                          onChange={(e) => setPaymentSettings({...paymentSettings, stripeKey: e.target.value})}
                        />
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="h-10 w-10 rounded-md bg-green-100 flex items-center justify-center text-green-600">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect width="16" height="9" x="4" y="5" rx="2" />
                          <path d="M8 10h8" />
                          <path d="M12 14v4" />
                          <path d="M9 18h6" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-base font-medium">Cash on Delivery</h3>
                        <p className="text-sm text-muted-foreground">
                          Accept cash payments upon delivery
                        </p>
                      </div>
                    </div>
                    <Switch 
                      checked={paymentSettings.enableCashOnDelivery}
                      onCheckedChange={(checked) => setPaymentSettings({...paymentSettings, enableCashOnDelivery: checked})}
                    />
                  </div>
                </div>
                
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="h-10 w-10 rounded-md bg-blue-100 flex items-center justify-center text-blue-600">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect width="20" height="14" x="2" y="5" rx="2" />
                          <line x1="2" x2="22" y1="10" y2="10" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-base font-medium">Bank Transfer</h3>
                        <p className="text-sm text-muted-foreground">
                          Accept payments via bank transfer
                        </p>
                      </div>
                    </div>
                    <Switch 
                      checked={paymentSettings.enableBankTransfer}
                      onCheckedChange={(checked) => setPaymentSettings({...paymentSettings, enableBankTransfer: checked})}
                    />
                  </div>
                  
                  {paymentSettings.enableBankTransfer && (
                    <div className="mt-4 space-y-3 border-t pt-3">
                      <div className="space-y-2">
                        <FormLabel htmlFor="bankDetails">Bank Account Details</FormLabel>
                        <Textarea 
                          id="bankDetails"
                          rows={4}
                          value={paymentSettings.bankDetails}
                          onChange={(e) => setPaymentSettings({...paymentSettings, bankDetails: e.target.value})}
                          placeholder="Account number, bank name, routing number, etc."
                        />
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-end border-t pt-4">
                <Button onClick={handleSavePaymentSettings} disabled={isLoading}>
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="mr-1 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      <span>Saving...</span>
                    </div>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Shipping Settings */}
          <TabsContent value="shipping">
            <Card>
              <CardHeader>
                <CardTitle>Shipping Options</CardTitle>
                <CardDescription>
                  Configure shipping methods and rates for your store.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-medium">Free Shipping</h3>
                      <p className="text-sm text-muted-foreground">
                        Offer free shipping to customers
                      </p>
                    </div>
                    <Switch 
                      checked={shippingSettings.enableFreeShipping}
                      onCheckedChange={(checked) => setShippingSettings({...shippingSettings, enableFreeShipping: checked})}
                    />
                  </div>
                  
                  {shippingSettings.enableFreeShipping && (
                    <div className="mt-4 space-y-3 border-t pt-3">
                      <div className="space-y-2">
                        <FormLabel htmlFor="freeShippingThreshold">Minimum Order Amount ($)</FormLabel>
                        <Input 
                          id="freeShippingThreshold"
                          type="number"
                          value={shippingSettings.freeShippingThreshold}
                          onChange={(e) => setShippingSettings({...shippingSettings, freeShippingThreshold: Number(e.target.value)})}
                        />
                        <FormDescription>
                          Orders above this amount qualify for free shipping. Set to 0 for all orders.
                        </FormDescription>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-medium">Flat Rate Shipping</h3>
                      <p className="text-sm text-muted-foreground">
                        Charge a fixed rate for shipping
                      </p>
                    </div>
                    <Switch 
                      checked={shippingSettings.enableFlatRate}
                      onCheckedChange={(checked) => setShippingSettings({...shippingSettings, enableFlatRate: checked})}
                    />
                  </div>
                  
                  {shippingSettings.enableFlatRate && (
                    <div className="mt-4 space-y-3 border-t pt-3">
                      <div className="space-y-2">
                        <FormLabel htmlFor="flatRateAmount">Flat Rate Amount ($)</FormLabel>
                        <Input 
                          id="flatRateAmount"
                          type="number"
                          value={shippingSettings.flatRateAmount}
                          onChange={(e) => setShippingSettings({...shippingSettings, flatRateAmount: Number(e.target.value)})}
                        />
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-medium">Local Pickup</h3>
                      <p className="text-sm text-muted-foreground">
                        Allow customers to pick up orders locally
                      </p>
                    </div>
                    <Switch 
                      checked={shippingSettings.enableLocalPickup}
                      onCheckedChange={(checked) => setShippingSettings({...shippingSettings, enableLocalPickup: checked})}
                    />
                  </div>
                  
                  {shippingSettings.enableLocalPickup && (
                    <div className="mt-4 space-y-3 border-t pt-3">
                      <div className="space-y-2">
                        <FormLabel htmlFor="localPickupAddress">Pickup Address</FormLabel>
                        <Textarea 
                          id="localPickupAddress"
                          rows={3}
                          value={shippingSettings.localPickupAddress}
                          onChange={(e) => setShippingSettings({...shippingSettings, localPickupAddress: e.target.value})}
                        />
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-medium">International Shipping</h3>
                      <p className="text-sm text-muted-foreground">
                        Ship products internationally
                      </p>
                    </div>
                    <Switch 
                      checked={shippingSettings.enableInternationalShipping}
                      onCheckedChange={(checked) => setShippingSettings({...shippingSettings, enableInternationalShipping: checked})}
                    />
                  </div>
                  
                  {shippingSettings.enableInternationalShipping && (
                    <div className="mt-4 space-y-3 border-t pt-3">
                      <div className="space-y-2">
                        <FormLabel htmlFor="internationalRate">International Rate ($)</FormLabel>
                        <Input 
                          id="internationalRate"
                          type="number"
                          value={shippingSettings.internationalShippingRate}
                          onChange={(e) => setShippingSettings({...shippingSettings, internationalShippingRate: Number(e.target.value)})}
                        />
                        <FormDescription>
                          Base rate for international shipping. Actual costs may vary by country.
                        </FormDescription>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-end border-t pt-4">
                <Button onClick={handleSaveShippingSettings} disabled={isLoading}>
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="mr-1 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      <span>Saving...</span>
                    </div>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Email Settings */}
          <TabsContent value="email">
            <Card>
              <CardHeader>
                <CardTitle>Email Notifications</CardTitle>
                <CardDescription>
                  Configure email notifications for your store.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-base font-medium">Notification Types</h3>
                  
                  <div className="flex items-center justify-between border-b pb-3">
                    <div>
                      <p className="font-medium">Order Confirmation</p>
                      <p className="text-sm text-muted-foreground">
                        Send confirmation emails when customers place orders
                      </p>
                    </div>
                    <Switch 
                      checked={emailSettings.orderConfirmation}
                      onCheckedChange={(checked) => setEmailSettings({...emailSettings, orderConfirmation: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between border-b pb-3">
                    <div>
                      <p className="font-medium">Shipping Updates</p>
                      <p className="text-sm text-muted-foreground">
                        Send emails when order status or tracking updates
                      </p>
                    </div>
                    <Switch 
                      checked={emailSettings.shippingUpdates}
                      onCheckedChange={(checked) => setEmailSettings({...emailSettings, shippingUpdates: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between border-b pb-3">
                    <div>
                      <p className="font-medium">Abandoned Cart Reminders</p>
                      <p className="text-sm text-muted-foreground">
                        Send emails to customers who abandon their shopping carts
                      </p>
                    </div>
                    <Switch 
                      checked={emailSettings.abandonedCart}
                      onCheckedChange={(checked) => setEmailSettings({...emailSettings, abandonedCart: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between pb-3">
                    <div>
                      <p className="font-medium">Marketing Emails</p>
                      <p className="text-sm text-muted-foreground">
                        Send promotional emails and newsletters
                      </p>
                    </div>
                    <Switch 
                      checked={emailSettings.marketingEmails}
                      onCheckedChange={(checked) => setEmailSettings({...emailSettings, marketingEmails: checked})}
                    />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-base font-medium">Email Templates</h3>
                  
                  <div className="space-y-2">
                    <FormLabel htmlFor="emailHeader">Email Header HTML</FormLabel>
                    <Textarea 
                      id="emailHeader"
                      rows={4}
                      value={emailSettings.emailHeader}
                      onChange={(e) => setEmailSettings({...emailSettings, emailHeader: e.target.value})}
                    />
                    <FormDescription>
                      HTML content that appears at the top of all emails
                    </FormDescription>
                  </div>
                  
                  <div className="space-y-2">
                    <FormLabel htmlFor="emailFooter">Email Footer HTML</FormLabel>
                    <Textarea 
                      id="emailFooter"
                      rows={4}
                      value={emailSettings.emailFooter}
                      onChange={(e) => setEmailSettings({...emailSettings, emailFooter: e.target.value})}
                    />
                    <FormDescription>
                      HTML content that appears at the bottom of all emails
                    </FormDescription>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end border-t pt-4">
                <Button onClick={handleSaveEmailSettings} disabled={isLoading}>
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="mr-1 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      <span>Saving...</span>
                    </div>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default SettingsManagement;
