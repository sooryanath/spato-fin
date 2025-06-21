
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const DemoSetup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const setupDemoUsers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/functions/v1/setup-demo-users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      
      if (result.success) {
        toast({
          title: "Demo Users Setup Complete",
          description: "Demo users have been created successfully. You can now login with the demo credentials.",
        });
      } else {
        toast({
          title: "Setup Failed",
          description: result.error || "Failed to setup demo users",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error setting up demo users:', error);
      toast({
        title: "Setup Error",
        description: "An error occurred while setting up demo users",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Demo Setup</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600">
          Click the button below to set up demo users for testing the application.
        </p>
        <Button 
          onClick={setupDemoUsers} 
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? 'Setting up...' : 'Setup Demo Users'}
        </Button>
        <div className="text-xs text-gray-500 space-y-1">
          <p><strong>Demo Credentials:</strong></p>
          <p>Bank: bank@hdfc.com / demo123</p>
          <p>Company: finance@techcorp.com / demo123</p>
          <p>Vendor: vendor@supplies.com / demo123</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DemoSetup;
