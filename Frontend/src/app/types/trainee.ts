export type TraineeLevel = 'Beginner' | 'Intermediate' | 'Advanced';

/** Row shown in the trainer's Trainee Management list. */
export interface TraineeSummary {
  id: string;
  name: string;
  avatarEmoji: string;
  level: TraineeLevel;
  progress: number; // 0-100
  lastActivityLabel: string; // e.g. "2 hours ago" (format on the backend, or derive client-side from an ISO timestamp)
  workoutsCompleted: number;
  totalWorkouts: number;
}

export interface TraineeFilters {
  search?: string;
  level?: TraineeLevel | 'All';
}

/** Lightweight option used in pickers (e.g. the Workout Assignment page). */
export interface TraineeOption {
  id: string;
  name: string;
  level: TraineeLevel;
}

export interface WeeklySessionPoint {
  day: string; // "Mon" .. "Sun"
  sessions: number;
  completionRate: number; // 0-100
}

export type RecentActivityIcon = 'activity' | 'users' | 'calendar';

export interface RecentActivityItem {
  id: string;
  icon: RecentActivityIcon;
  message: string;
  detail: string;
  timeLabel: string; // e.g. "15 mins ago"
}

export interface TrainerDashboardStats {
  totalTrainees: number;
  totalTraineesDeltaThisMonth: number;
  activeTrainees: number;
  activeRate: number; // 0-100
  workoutsAssignedThisWeek: number;
  todaysSessions: number;
  todaysSessionsCompleted: number;
  weeklySessions: WeeklySessionPoint[];
  averageCompletionRate: number; // 0-100
  recentActivity: RecentActivityItem[];
}
