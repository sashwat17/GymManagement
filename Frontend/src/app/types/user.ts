export type UserRole = 'trainee' | 'trainer';

export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  avatarEmoji?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
  role: UserRole;
}

export interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  location: string;
  role: UserRole;
  // Trainer-only fields (matches the extra fields shown on the Register page
  // when the "Trainer" tab is selected)
  specialization?: string;
  certification?: string;
  experience?: string;
}

export interface AuthResponse {
  user: AuthUser;
  token: string;
}

export interface TraineeSubscription {
  status: 'active' | 'expired' | 'cancelled';
  daysRemaining: number;
  totalDays: number;
  renewsOn: string; // ISO date
}

export interface TraineeStats {
  totalWorkouts: number;
  caloriesBurned: number;
  hoursTrained: number;
  attendanceRate: number; // 0-100
}

export interface TraineeProfile {
  id: string;
  fullName: string;
  email: string;
  avatarEmoji?: string;
  membershipTier: 'Free' | 'Premium';
  height: number; // cm
  weight: number; // kg
  age: number;
  fitnessGoal: string;
  subscription: TraineeSubscription;
  stats: TraineeStats;
}

export interface UpdateTraineeProfilePayload {
  height?: number;
  weight?: number;
  age?: number;
  fitnessGoal?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issuedYear: number;
  validUntilYear: number;
  status: 'Active' | 'Expired';
}

export interface TrainerProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  title: string;
  bio: string[];
  specializations: string[];
  yearsExperience: number;
  averageRating: number;
  isVerified: boolean;
  tier: 'Elite' | 'Standard';
  certifications: Certification[];
}

export type UpdateTrainerProfilePayload = Partial<
  Pick<TrainerProfile, 'fullName' | 'phone' | 'location' | 'title' | 'bio' | 'specializations'>
>;
