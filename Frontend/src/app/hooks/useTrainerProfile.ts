import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { trainerProfileService } from '../services/trainerProfileService';
import type { UpdateTrainerProfilePayload } from '../types/user';

export function useTrainerProfile() {
  return useQuery({
    queryKey: ['trainer', 'profile'],
    queryFn: trainerProfileService.me,
  });
}

export function useUpdateTrainerProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateTrainerProfilePayload) => trainerProfileService.update(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['trainer', 'profile'] }),
  });
}
