import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { notificationService } from '../services/notificationService';

export function useTraineeNotifications() {
  return useQuery({
    queryKey: ['notifications', 'trainee'],
    queryFn: notificationService.listForTrainee,
  });
}

export function useTrainerNotifications() {
  return useQuery({
    queryKey: ['notifications', 'trainer'],
    queryFn: notificationService.listForTrainer,
  });
}

export function useMarkNotificationRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => notificationService.markRead(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notifications'] }),
  });
}
