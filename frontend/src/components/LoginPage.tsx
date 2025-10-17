import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Mail, Phone, Shield } from 'lucide-react';
import { api } from '../lib/api';

interface LoginPageProps {
  onNavigate: (page: string) => void;
}

export function LoginPage({ onNavigate }: LoginPageProps) {
  const [loginData, setLoginData] = useState({ email: '', phone: '' });

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      console.log('Attempting login with:', loginData);
      
      // Call the API to authenticate
      const response = await api.authLogin(loginData.email, loginData.phone);
      
      console.log('Login response:', response);
      
      // Store member info from the response
      if (response && response.member) {
        localStorage.setItem('memberToken', response.token);
        localStorage.setItem('memberId', response.member._id);
        localStorage.setItem('memberName', response.member.name);
        localStorage.setItem('memberEmail', response.member.email);
        localStorage.setItem('memberPhone', response.member.phone);
        
        console.log('Login successful, navigating to dashboard');
        
        // Navigate to member dashboard
        onNavigate('member-dashboard');
      } else {
        setError('Invalid login response');
      }
    } catch (error) {
      console.error('Login failed:', error);
      const message = (error instanceof Error && error.message) ? error.message : 'Login failed. Please check your email and phone number.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdminLogin = () => {
    // Mock admin login - navigate to admin dashboard
    onNavigate('admin-dashboard');
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl opacity-5">ॐ</div>
      </div>

      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full mb-4">
            <span className="text-2xl text-white">ॐ</span>
          </div>
          <h2 className="text-primary mb-2">Welcome Back</h2>
          <p className="text-muted-foreground">
            Sign in to your account
          </p>
        </div>

        {/* Login Form */}
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle>Member Login</CardTitle>
            <CardDescription className="mt-2">
              Enter your email and phone number to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="your.email@example.com"
                    className="pl-10"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="login-phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="login-phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    className="pl-10"
                    value={loginData.phone}
                    onChange={(e) => setLoginData({ ...loginData, phone: e.target.value })}
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="p-3 text-sm text-white bg-red-500 rounded-md">
                  {error}
                </div>
              )}
              
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-border" />
                  <span className="text-muted-foreground">Remember me</span>
                </label>
                <a href="#" className="text-primary hover:underline">
                  Need help?
                </a>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Admin Login Link */}
        <div className="mt-6 text-center">
          <Button
            variant="ghost"
            onClick={handleAdminLogin}
            className="gap-2 text-muted-foreground hover:text-primary"
          >
            <Shield className="w-4 h-4" />
            Admin Login
          </Button>
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <button
            onClick={() => onNavigate('home')}
            className="text-sm text-muted-foreground hover:text-primary"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
