import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from '@/hooks/use-toast';
import { Banknote, Settings, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const Login = () => {
  const { login, signup, user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [isSettingUpUsers, setIsSettingUpUsers] = useState(false);
  const [setupResults, setSetupResults] = useState<any>(null);
  
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

  const [signupForm, setSignupForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '' as UserRole | '',
    organizationName: ''
  });

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      switch (user.role) {
        case 'bank':
          navigate('/bank');
          break;
        case 'company':
          navigate('/company');
          break;
        case 'vendor':
          navigate('/vendor');
          break;
        default:
          navigate('/');
      }
    }
  }, [user, navigate]);

  const setupDemoUsers = async () => {
    setIsSettingUpUsers(true);
    setSetupResults(null);
    
    try {
      console.log('Invoking setup-demo-users function...');
      const { data, error } = await supabase.functions.invoke('setup-demo-users', {
        body: {}
      });
      
      console.log('Setup function response:', { data, error });
      
      if (error) {
        console.error('Error setting up demo users:', error);
        toast({
          title: "Setup Failed",
          description: error.message || "Failed to setup demo users",
          variant: "destructive",
        });
        setSetupResults({ success: false, error: error.message });
        return;
      }

      setSetupResults(data);

      if (data?.success) {
        toast({
          title: "Demo Users Created",
          description: `Successfully created ${data.results?.filter((r: any) => r.success).length || 0} demo accounts.`,
        });
      } else {
        toast({
          title: "Setup Issues",
          description: data?.message || "Some users may not have been created properly",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Setup Error",
        description: "An unexpected error occurred while setting up demo users",
        variant: "destructive",
      });
      setSetupResults({ success: false, error: 'Unexpected error' });
    } finally {
      setIsSettingUpUsers(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginForm.email || !loginForm.password) {
      toast({
        title: "Missing Information",
        description: "Please enter both email and password",
        variant: "destructive",
      });
      return;
    }

    console.log('Attempting login with:', { email: loginForm.email, password: '***' });
    const result = await login(loginForm.email, loginForm.password);
    
    if (!result.success) {
      console.error('Login failed:', result.error);
      toast({
        title: "Login Failed",
        description: result.error || "Invalid credentials. Try setting up demo users first.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Login Successful",
        description: "Welcome back!",
      });
    }
  };

  const fillDemoCredentials = (email: string) => {
    setLoginForm({
      email: email,
      password: 'demo123'
    });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!signupForm.name || !signupForm.email || !signupForm.password || !signupForm.role || !signupForm.organizationName) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    if (signupForm.password !== signupForm.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    if (signupForm.password.length < 6) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 6 characters long",
        variant: "destructive",
      });
      return;
    }

    const result = await signup(
      signupForm.email,
      signupForm.password,
      signupForm.name,
      signupForm.role as UserRole,
      signupForm.organizationName
    );
    
    if (!result.success) {
      toast({
        title: "Signup Failed",
        description: result.error || "Failed to create account",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Account Created",
        description: "Please check your email to verify your account",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Banknote className="h-12 w-12 text-blue-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Spato Finance
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Corporate Asset Tokenization Platform
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card>
          <CardContent className="p-6">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <CardHeader className="px-0">
                  <CardTitle>Welcome Back</CardTitle>
                  <CardDescription>
                    Sign in to your account to continue
                  </CardDescription>
                </CardHeader>
                
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="Enter your email"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="Enter your password"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </form>

                <div className="mt-4 p-4 bg-blue-50 rounded-lg border">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm text-blue-700 font-medium">Demo Accounts Setup:</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={setupDemoUsers}
                      disabled={isSettingUpUsers}
                      className="text-xs h-7 px-2"
                    >
                      <Settings className="h-3 w-3 mr-1" />
                      {isSettingUpUsers ? 'Setting up...' : 'Setup Demo Users'}
                    </Button>
                  </div>
                  
                  {setupResults && (
                    <div className="mb-3 p-2 rounded border bg-white">
                      <div className="flex items-center gap-2 mb-1">
                        {setupResults.success ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-red-500" />
                        )}
                        <span className="text-xs font-medium">
                          {setupResults.success ? 'Setup Successful' : 'Setup Failed'}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600">{setupResults.message}</p>
                    </div>
                  )}

                  <div className="space-y-2">
                    <p className="text-xs text-blue-700 font-medium">Quick Fill Credentials:</p>
                    <div className="space-y-1">
                      <button
                        type="button"
                        onClick={() => fillDemoCredentials('bank@hdfc.com')}
                        className="block w-full text-left text-xs text-blue-600 hover:text-blue-800 hover:bg-blue-100 p-1 rounded"
                      >
                        🏦 Bank: bank@hdfc.com / demo123
                      </button>
                      <button
                        type="button"
                        onClick={() => fillDemoCredentials('finance@techcorp.com')}
                        className="block w-full text-left text-xs text-blue-600 hover:text-blue-800 hover:bg-blue-100 p-1 rounded"
                      >
                        🏢 Company: finance@techcorp.com / demo123
                      </button>
                      <button
                        type="button"
                        onClick={() => fillDemoCredentials('vendor@supplies.com')}
                        className="block w-full text-left text-xs text-blue-600 hover:text-blue-800 hover:bg-blue-100 p-1 rounded"
                      >
                        📦 Vendor: vendor@supplies.com / demo123
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-xs text-blue-500 mt-2">
                    Click "Setup Demo Users" first, then click any credential above to auto-fill the form.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="signup">
                <CardHeader className="px-0">
                  <CardTitle>Create Account</CardTitle>
                  <CardDescription>
                    Join the Spato Finance platform
                  </CardDescription>
                </CardHeader>
                
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="Enter your full name"
                      value={signupForm.name}
                      onChange={(e) => setSignupForm(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="Enter your email"
                      value={signupForm.email}
                      onChange={(e) => setSignupForm(prev => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-role">Role</Label>
                    <Select value={signupForm.role} onValueChange={(value: UserRole) => setSignupForm(prev => ({ ...prev, role: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bank">Bank</SelectItem>
                        <SelectItem value="company">Company</SelectItem>
                        <SelectItem value="vendor">Vendor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-organization">Organization Name</Label>
                    <Input
                      id="signup-organization"
                      type="text"
                      placeholder="Enter your organization name"
                      value={signupForm.organizationName}
                      onChange={(e) => setSignupForm(prev => ({ ...prev, organizationName: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="Enter a strong password"
                      value={signupForm.password}
                      onChange={(e) => setSignupForm(prev => ({ ...prev, password: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-confirm-password">Confirm Password</Label>
                    <Input
                      id="signup-confirm-password"
                      type="password"
                      placeholder="Confirm your password"
                      value={signupForm.confirmPassword}
                      onChange={(e) => setSignupForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <Button variant="ghost" onClick={() => navigate('/')}>
            ← Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
