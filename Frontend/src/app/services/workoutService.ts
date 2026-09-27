import { apiClient } from '../lib/api-client';
import type {
  AssignWorkoutPayload,
  CreateWorkoutPayload,
  UpdateWorkoutPayload,
  Workout,
  WorkoutActivityPoint,
  WorkoutAssignment,
  WorkoutFilters,
} from '../types/workout';

function toQueryString(filters?: WorkoutFilters): string {
  if (!filters) return '';
  const params = new URLSearchParams();
  if (filters.difficulty && filters.difficulty !== 'All') params.set('difficulty', filters.difficulty);
  if (filters.type && filters.type !== 'All') params.set('type', filters.type);
  if (filters.minRating) params.set('minRating', String(filters.minRating));
  const qs = params.toString();
  return qs ? `?${qs}` : '';
}

export const workoutService = {
  // Used by the trainee Workouts page and the trainer Workout Management page
  list: (filters?: WorkoutFilters) => apiClient.get<Workout[]>(`/workouts${toQueryString(filters)}`),

  get: (id: string) => apiClient.get<Workout>(`/workouts/${id}`),

  // Trainer-only: Workout Management "Create Workout"
  create: (payload: CreateWorkoutPayload) => apiClient.post<Workout>('/workouts', payload),

  update: (id: string, payload: UpdateWorkoutPayload) => apiClient.put<Workout>(`/workouts/${id}`, payload),

  remove: (id: string) => apiClient.delete<void>(`/workouts/${id}`),

  // Trainer-only: Workout Assignment page
  assign: (payload: AssignWorkoutPayload) => apiClient.post<WorkoutAssignment>('/workout-assignments', payload),

  // Trainee Dashboard's weekly activity line chart
  myActivity: () => apiClient.get<WorkoutActivityPoint[]>('/workouts/activity'),
};
