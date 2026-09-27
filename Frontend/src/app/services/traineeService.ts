import { apiClient } from '../lib/api-client';
import type { TraineeFilters, TraineeOption, TraineeSummary, TrainerDashboardStats } from '../types/trainee';
import type { TraineeProfile, UpdateTraineeProfilePayload } from '../types/user';

function toQueryString(filters?: TraineeFilters): string {
  if (!filters) return '';
  const params = new URLSearchParams();
  if (filters.search) params.set('search', filters.search);
  if (filters.level && filters.level !== 'All') params.set('level', filters.level);
  const qs = params.toString();
  return qs ? `?${qs}` : '';
}

export const traineeService = {
  // Trainer-only: Trainee Management page
  list: (filters?: TraineeFilters) => apiClient.get<TraineeSummary[]>(`/trainees${toQueryString(filters)}`),

  get: (id: string) => apiClient.get<TraineeSummary>(`/trainees/${id}`),

  // Lightweight list for pickers, e.g. the Workout Assignment page
  listOptions: () => apiClient.get<TraineeOption[]>('/trainees/options'),

  // Trainee-only: Profile + Dashboard pages
  myProfile: () => apiClient.get<TraineeProfile>('/trainees/me'),

  updateMyProfile: (payload: UpdateTraineeProfilePayload) =>
    apiClient.put<TraineeProfile>('/trainees/me', payload),
};

export const trainerDashboardService = {
  stats: () => apiClient.get<TrainerDashboardStats>('/trainer/dashboard'),
};
