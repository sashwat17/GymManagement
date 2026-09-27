export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';
export type WorkoutType = 'Strength' | 'Cardio' | 'Core' | 'Full Body' | 'Flexibility';
export type AssignmentDifficulty = 'Easy' | 'Medium' | 'Hard';

export interface Workout {
  id: string;
  name: string;
  description: string;
  trainer: { id: string; name: string };
  difficulty: DifficultyLevel;
  type: WorkoutType;
  rating: number;
  durationMinutes: number;
  calories: number;
  imageUrl: string;
  assignedToCount: number;
}

export interface CreateWorkoutPayload {
  name: string;
  description: string;
  difficulty: DifficultyLevel;
  type: WorkoutType;
  durationMinutes: number;
  calories: number;
  imageUrl?: string;
}

export type UpdateWorkoutPayload = Partial<CreateWorkoutPayload>;

export interface WorkoutFilters {
  difficulty?: DifficultyLevel | 'All';
  minRating?: number;
  type?: WorkoutType | 'All';
}

export interface WorkoutAssignment {
  id: string;
  traineeId: string;
  workoutId: string;
  difficulty: AssignmentDifficulty;
  scheduledDate?: string; // ISO date, e.g. "2026-04-16"
  scheduledTime?: string; // "HH:mm"
  status: 'pending' | 'scheduled' | 'completed';
}

export interface AssignWorkoutPayload {
  traineeId: string;
  workoutId: string;
  difficulty: AssignmentDifficulty;
  scheduledDate?: string;
  scheduledTime?: string;
}

/** One point in the "workouts per day" activity chart on the trainee Dashboard. */
export interface WorkoutActivityPoint {
  day: string; // "Mon" .. "Sun"
  workouts: number;
}
