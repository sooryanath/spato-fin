
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';
import { Upload } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useForm } from 'react-hook-form';

const BankProfile = () => {
  const { user } = useAuth();
  
  const form = useForm({
    defaultValues: {
      username: user?.username || '',
      name: user?.name || '',
      email: user?.email || '',
      password: '',
      rbiLicenseNumber: '',
      swiftCode: '',
      bankCode: '',
      headOfficeAddress: ''
    }
  });

  const handleFileUpload = (documentType: string) => {
    toast({
      title: "Document Upload",
      description: `${documentType} uploaded successfully`,
    });
  };

  const onSubmit = (data: any) => {
    toast({
      title: "Profile Updated",
      description: "Your bank profile information has been updated",
    });
    console.log(data);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Bank Profile</h1>
        <p className="text-gray-600">Manage your bank details and settings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Update your bank account details</CardDescription>
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
                      <FormLabel>Bank Name</FormLabel>
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
                
                <FormField
                  control={form.control}
                  name="rbiLicenseNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>RBI License Number</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter RBI license number" />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div>
                  <Label htmlFor="logo">Bank Logo</Label>
                  <div className="mt-1 flex items-center">
                    <div className="h-12 w-12 rounded-md bg-gray-200 flex items-center justify-center text-gray-400">
                      {user?.organizationName?.[0] || 'B'}
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

        {/* Banking Documents */}
        <Card>
          <CardHeader>
            <CardTitle>Legal Documents</CardTitle>
            <CardDescription>Upload your bank's legal documents</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border rounded-md p-3">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">Banking License</h4>
                  <p className="text-sm text-gray-500">PDF, max 10MB</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => handleFileUpload('Banking License')}>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload
                </Button>
              </div>
            </div>

            <div className="border rounded-md p-3">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">KYC Compliance Certificate</h4>
                  <p className="text-sm text-gray-500">PDF, max 10MB</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => handleFileUpload('KYC Compliance Certificate')}>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload
                </Button>
              </div>
            </div>

            <div className="border rounded-md p-3">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">AML Policy Document</h4>
                  <p className="text-sm text-gray-500">PDF, max 5MB</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => handleFileUpload('AML Policy Document')}>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Bank API Information */}
        <Card>
          <CardHeader>
            <CardTitle>API Information</CardTitle>
            <CardDescription>Configure banking API connections</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="swift-code">SWIFT Code</Label>
              <Input
                id="swift-code"
                placeholder="Enter SWIFT code"
                {...form.register("swiftCode")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bank-code">Bank Code</Label>
              <Input
                id="bank-code"
                placeholder="Enter bank code"
                {...form.register("bankCode")}
              />
            </div>
            
            <Button className="w-full">
              Connect Banking APIs
            </Button>
          </CardContent>
        </Card>
        
        {/* Head Office Information */}
        <Card>
          <CardHeader>
            <CardTitle>Head Office Information</CardTitle>
            <CardDescription>Your bank's main branch details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="head-office-address">Address</Label>
                <Input
                  id="head-office-address"
                  placeholder="Enter head office address"
                  {...form.register("headOfficeAddress")}
                />
              </div>
              
              <Button className="w-full">
                Update Head Office Information
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BankProfile;
