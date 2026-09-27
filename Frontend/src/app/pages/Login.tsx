import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Dumbbell } from 'lucide-react';

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [userType, setUserType] = useState<'trainee' | 'trainer'>('trainee');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (userType === 'trainer') {
      navigate('/trainer');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-background">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1762162147822-c5c87cede739?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxneW0lMjBmaXRuZXNzJTIwZXF1aXBtZW50JTIwZGFyayUyMGF0bW9zcGhlcmV8ZW58MXx8fHwxNzc3MTA2ODE2fDA&ixlib=rb-4.1.0&q=80&w=1080)',
          filter: 'blur(3px) brightness(0.7) sepia(0.2)',
        }}
      />

      <div className="relative z-10 w-full max-w-md px-6">
        <div className="bg-card/80 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-border">
          <div className="flex items-center justify-center mb-8">
            <div className="bg-primary/20 p-4 rounded-full">
              <Dumbbell className="w-12 h-12 text-primary" />
            </div>
          </div>

          <h1 className="text-center mb-2 text-foreground">Welcome Back</h1>
          <p className="text-center text-muted-foreground mb-6">
            Sign in to continue your fitness journey
          </p>

          <div className="flex gap-2 mb-8 p-1 bg-muted rounded-lg">
            <button
              type="button"
              onClick={() => setUserType('trainee')}
              className={`flex-1 px-4 py-3 rounded-lg transition-all ${
                userType === 'trainee'
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Trainee
            </button>
            <button
              type="button"
              onClick={() => setUserType('trainer')}
              className={`flex-1 px-4 py-3 rounded-lg transition-all ${
                userType === 'trainer'
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Trainer
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <Input
              type="email"
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              type="password"
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-border bg-input text-primary focus:ring-2 focus:ring-primary"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-muted-foreground">
                Remember me
              </label>
            </div>

            <Button type="submit" variant="primary" className="w-full">
              Login
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <span
              onClick={() => navigate('/register')}
              className="text-primary cursor-pointer hover:underline"
            >
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
