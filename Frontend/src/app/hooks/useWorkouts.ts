import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { workoutService } from '../services/workoutService';
import type { AssignWorkoutPayload, CreateWorkoutPayload, UpdateWorkoutPayload, WorkoutFilters } from '../types/workout';

// Trainee Workouts page + trainer Workout Management page (pass filters as needed)
export function useWorkouts(filters?: WorkoutFilters) {
  return useQuery({
    queryKey: ['workouts', filters],
    queryFn: () => workoutService.list(filters),
  });
}

export function useWorkout(id: string) {
  return useQuery({
    queryKey: ['workouts', id],
    queryFn: () => workoutService.get(id),
    enabled: Boolean(id),
  });
}

// Workout Management "Create Workout" button
export function useCreateWorkout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateWorkoutPayload) => workoutService.create(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['workouts'] }),
  });
}

export function useUpdateWorkout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateWorkoutPayload }) => workoutService.update(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['workouts'] }),
  });
}

export function useDeleteWorkout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => workoutService.remove(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['workouts'] }),
  });
}

// Trainer Workout Assignment page "Assign Workout" button
export function useAssignWorkout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: AssignWorkoutPayload) => workoutService.assign(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trainees'] });
      queryClient.invalidateQueries({ queryKey: ['trainer', 'dashboard'] });
    },
  });
}

// Trainee Dashboard weekly activity chart
export function useWorkoutActivity() {
  return useQuery({
    queryKey: ['workouts', 'activity'],
    queryFn: workoutService.myActivity,
  });
}
