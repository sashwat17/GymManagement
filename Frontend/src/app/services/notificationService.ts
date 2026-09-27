import { apiClient } from '../lib/api-client';
import type { TraineeNotification, TrainerNotification } from '../types/notification';

export const notificationService = {
  listForTrainee: () => apiClient.get<TraineeNotification[]>('/notifications'),
  listForTrainer: () => apiClient.get<TrainerNotification[]>('/trainer/notifications'),
  markRead: (id: string) => apiClient.patch<void>(`/notifications/${id}`, { isUnread: false }),
  markAllRead: () => apiClient.post<void>('/notifications/mark-all-read'),
};
