import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { Banknote, Upload, AlertTriangle } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import { useForm } from 'react-hook-form';

const Profile = () => {
  const { user } = useAuth();
  const [isConnectingGstn, setIsConnectingGstn] = useState(false);
  const [isUpdatingBankAccount, setIsUpdatingBankAccount] = useState(false);

  const form = useForm({
    defaultValues: {
      username: user?.username || '',
      name: user?.name || '',
      email: user?.email || '',
      password: '',
      gstnNumber: '',
      accountNumber: '',
      ifscCode: '',
      bankName: ''
    }
  });

  const handleFileUpload = (documentType: string) => {
    toast({
      title: "Document Upload",
      description: `${documentType} uploaded successfully`,
    });
  };

  const connectGstn = () => {
    setIsConnectingGstn(true);
    setTimeout(() => {
      setIsConnectingGstn(false);
      toast({
        title: "GSTN Connection Error",
        description: "Unable to connect to GSTN API. Please try again later.",
        variant: "destructive",
      });
    }, 2000);
  };

  const updateBankAccount = () => {
    setIsUpdatingBankAccount(true);
    setTimeout(() => {
      setIsUpdatingBankAccount(false);
      toast({
        title: "Bank Account Updated",
        description: "Your bank account information has been updated",
      });
    }, 1500);
  };

  const onSubmit = (data: any) => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated",
    });
    console.log(data);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Company Profile</h1>
          <p className="text-gray-600">{user?.name}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Update your company and account details</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <div>
                    <Label htmlFor="logo">Company Logo</Label>
                    <div className="mt-1 flex items-center">
                      <div className="h-12 w-12 rounded-md bg-gray-200 flex items-center justify-center text-gray-400">
                        {user?.organizationName?.[0] || 'C'}
                      </div>
                      <Button type="button" variant="outline" size="sm" className="ml-5">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Logo
                      </Button>
                    </div>
                  </div>
                  
                  <Button type="submit">Update Profile</Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Company Documents */}
          <Card>
            <CardHeader>
              <CardTitle>Legal Documents</CardTitle>
              <CardDescription>Upload your company's legal documents</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-md p-3">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Memorandum Of Association</h4>
                    <p className="text-sm text-gray-500">PDF, max 10MB</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => handleFileUpload('Memorandum Of Association')}>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </Button>
                </div>
              </div>

              <div className="border rounded-md p-3">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Articles Of Association</h4>
                    <p className="text-sm text-gray-500">PDF, max 10MB</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => handleFileUpload('Articles Of Association')}>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </Button>
                </div>
              </div>

              <div className="border rounded-md p-3">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Certificate Of Incorporation</h4>
                    <p className="text-sm text-gray-500">PDF, max 5MB</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => handleFileUpload('Certificate Of Incorporation')}>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* GSTN Information */}
          <Card>
            <CardHeader>
              <CardTitle>GSTN Information</CardTitle>
              <CardDescription>Connect your GST registration details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="gstn-number">GSTN Number</Label>
                <Input
                  id="gstn-number"
                  placeholder="Enter your GSTN number"
                  {...form.register("gstnNumber")}
                />
              </div>

              <div className="p-3 bg-red-50 rounded-md border border-red-100 flex items-start">
                <AlertTriangle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-red-600">GSTN API connection error. Please check credentials or try again later.</p>
              </div>

              <Button 
                onClick={connectGstn} 
                className="w-full"
                disabled={isConnectingGstn}
              >
                {isConnectingGstn ? "Connecting..." : "Connect GSTN API"}
              </Button>
            </CardContent>
          </Card>

          {/* Bank Account Information */}
          <Card>
            <CardHeader>
              <CardTitle>Bank Account Information</CardTitle>
              <CardDescription>Connect your company's bank account</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="bank-name">Bank Name</Label>
                  <Input
                    id="bank-name"
                    placeholder="Enter bank name"
                    {...form.register("bankName")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="account-number">Account Number</Label>
                  <Input
                    id="account-number"
                    placeholder="Enter account number"
                    {...form.register("accountNumber")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ifsc-code">IFSC Code</Label>
                  <Input
                    id="ifsc-code"
                    placeholder="Enter IFSC code"
                    {...form.register("ifscCode")}
                  />
                </div>

                <Button
                  type="button" 
                  onClick={updateBankAccount}
                  disabled={isUpdatingBankAccount}
                  className="w-full"
                >
                  {isUpdatingBankAccount ? "Updating..." : "Update Bank Information"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
