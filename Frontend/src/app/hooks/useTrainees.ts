import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { traineeService, trainerDashboardService } from '../services/traineeService';
import type { TraineeFilters } from '../types/trainee';
import type { UpdateTraineeProfilePayload } from '../types/user';

// Trainer: Trainee Management page
export function useTrainees(filters?: TraineeFilters) {
  return useQuery({
    queryKey: ['trainees', filters],
    queryFn: () => traineeService.list(filters),
  });
}

// Trainer: Workout Assignment page picker
export function useTraineeOptions() {
  return useQuery({
    queryKey: ['trainees', 'options'],
    queryFn: traineeService.listOptions,
  });
}

// Trainee: Profile + Dashboard pages
export function useTraineeProfile() {
  return useQuery({
    queryKey: ['trainees', 'me'],
    queryFn: traineeService.myProfile,
  });
}

export function useUpdateTraineeProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateTraineeProfilePayload) => traineeService.updateMyProfile(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['trainees', 'me'] }),
  });
}

// Trainer Dashboard page (stat cards, weekly charts, recent activity)
export function useTrainerDashboard() {
  return useQuery({
    queryKey: ['trainer', 'dashboard'],
    queryFn: trainerDashboardService.stats,
  });
}
