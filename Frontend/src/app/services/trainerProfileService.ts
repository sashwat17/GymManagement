import { apiClient } from '../lib/api-client';
import type { TrainerProfile, UpdateTrainerProfilePayload } from '../types/user';

export const trainerProfileService = {
  me: () => apiClient.get<TrainerProfile>('/trainer/me'),
  update: (payload: UpdateTrainerProfilePayload) => apiClient.put<TrainerProfile>('/trainer/me', payload),
};
