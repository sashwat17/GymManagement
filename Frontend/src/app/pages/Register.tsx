import React from 'react';
import { useNavigate } from 'react-router';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Dumbbell, User, Mail, Lock, Phone, MapPin, Award } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [userType, setUserType] = React.useState<'trainee' | 'trainer'>('trainee');
  const [error, setError] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const [formData, setFormData] = React.useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    location: '',
    specialization: '',
    certification: '',
    experience: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    setIsSubmitting(true);
    try {
      const user = await register({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        location: formData.location,
        role: userType,
        ...(userType === 'trainer' && {
          specialization: formData.specialization,
          certification: formData.certification,
          experience: formData.experience,
        }),
      });
      navigate(user.role === 'trainer' ? '/trainer' : '/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to create your account. Please try again.');
    } finally {
      setIsSubmitting(false);
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

      <div className="relative z-10 w-full max-w-2xl px-6 py-8">
        <div className="bg-card/80 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-border">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-primary/20 p-4 rounded-full">
              <Dumbbell className="w-12 h-12 text-primary" />
            </div>
          </div>

          <h1 className="text-center mb-2 text-foreground">Create Your Account</h1>
          <p className="text-center text-muted-foreground mb-6">
            Join GymFlow and start your fitness journey
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

          <form onSubmit={handleRegister} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <User className="absolute left-3 top-[42px] w-5 h-5 text-muted-foreground pointer-events-none" />
                <Input
                  type="text"
                  label="Full Name"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className="pl-10"
                  required
                />
              </div>

              <div className="relative">
                <Mail className="absolute left-3 top-[42px] w-5 h-5 text-muted-foreground pointer-events-none" />
                <Input
                  type="email"
                  label="Email Address"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="pl-10"
                  required
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-[42px] w-5 h-5 text-muted-foreground pointer-events-none" />
                <Input
                  type="password"
                  label="Password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="pl-10"
                  required
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-[42px] w-5 h-5 text-muted-foreground pointer-events-none" />
                <Input
                  type="password"
                  label="Confirm Password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className="pl-10"
                  required
                />
              </div>

              <div className="relative">
                <Phone className="absolute left-3 top-[42px] w-5 h-5 text-muted-foreground pointer-events-none" />
                <Input
                  type="tel"
                  label="Phone Number"
                  placeholder="Enter your phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="pl-10"
                  required
                />
              </div>

              <div className="relative">
                <MapPin className="absolute left-3 top-[42px] w-5 h-5 text-muted-foreground pointer-events-none" />
                <Input
                  type="text"
                  label="Location"
                  placeholder="City, State"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {userType === 'trainer' && (
              <div className="space-y-6 pt-4 border-t border-border">
                <h3 className="text-foreground">Trainer Details</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <Dumbbell className="absolute left-3 top-[42px] w-5 h-5 text-muted-foreground pointer-events-none" />
                    <Input
                      type="text"
                      label="Specialization"
                      placeholder="e.g., Strength Training, HIIT"
                      value={formData.specialization}
                      onChange={(e) => handleInputChange('specialization', e.target.value)}
                      className="pl-10"
                      required={userType === 'trainer'}
                    />
                  </div>

                  <div className="relative">
                    <Award className="absolute left-3 top-[42px] w-5 h-5 text-muted-foreground pointer-events-none" />
                    <Input
                      type="text"
                      label="Certification"
                      placeholder="e.g., CPT, NASM"
                      value={formData.certification}
                      onChange={(e) => handleInputChange('certification', e.target.value)}
                      className="pl-10"
                      required={userType === 'trainer'}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm text-muted-foreground mb-2">
                      Years of Experience
                    </label>
                    <select
                      value={formData.experience}
                      onChange={(e) => handleInputChange('experience', e.target.value)}
                      className="w-full px-4 py-3 bg-input rounded-lg border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      required={userType === 'trainer'}
                    >
                      <option value="">Select experience</option>
                      <option value="0-1">0-1 years</option>
                      <option value="1-3">1-3 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="5-10">5-10 years</option>
                      <option value="10+">10+ years</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-start gap-3 pt-4">
              <input
                type="checkbox"
                id="terms"
                required
                className="w-4 h-4 rounded border-border bg-input text-primary focus:ring-2 focus:ring-primary mt-1"
              />
              <label htmlFor="terms" className="text-sm text-muted-foreground">
                I agree to the{' '}
                <span className="text-primary cursor-pointer hover:underline">Terms of Service</span>
                {' '}and{' '}
                <span className="text-primary cursor-pointer hover:underline">Privacy Policy</span>
              </label>
            </div>

            {error && <p role="alert" className="text-sm text-destructive">{error}</p>}

            <Button type="submit" variant="primary" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <span
              onClick={() => navigate('/login')}
              className="text-primary cursor-pointer hover:underline"
            >
              Sign in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
